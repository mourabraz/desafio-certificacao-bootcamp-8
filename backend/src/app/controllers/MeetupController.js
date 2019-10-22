import { Op } from 'sequelize';
import { parseISO, startOfDay, endOfDay } from 'date-fns';

import Meetup from '../models/Meetup';
import Banner from '../models/Banner';
import User from '../models/User';

import CreateMeetupService from '../services/CreateMeetupService';
import UpdateMeetupService from '../services/UpdateMeetupService';
import DeleteMeetupService from '../services/DeleteMeetupService';

class MeetupController {
  async index(req, res) {
    const { page = 1 } = req.query;
    const { date } = req.query;

    const dateSearch = date ? parseISO(`${date}T12:00:00`) : new Date();

    const meetups = await Meetup.findAll({
      where: {
        date: { [Op.between]: [startOfDay(dateSearch), endOfDay(dateSearch)] },
      },
      attributes: [
        'id',
        'title',
        'description',
        'localization',
        'date',
        'past',
        'banner_id',
        'user_id',
      ],
      include: [
        {
          model: Banner,
          as: 'banner',
          attributes: ['name', 'path', 'url'],
        },
        {
          model: User,
          as: 'owner',
          attributes: ['name', 'email'],
        },
        {
          model: User,
          as: 'subscribers',
          attributes: ['name', 'email'],
          through: { attributes: [] },
        },
      ],
      order: [['date', 'desc']],
      limit: 10,
      offset: (page - 1) * 10,
    });

    return res.json(meetups);
  }

  /**
   * Ainda nao foi implementado a validação de um mesmo
   * user cadastrar meetups para a mesma data/hora
   */
  async store(req, res) {
    const { title, description, localization, date, banner_id } = req.body;

    const meetup = await CreateMeetupService.run({
      user_id: req.userId,
      title,
      description,
      localization,
      date,
      banner_id,
    });

    return res.json(meetup);
  }

  async update(req, res) {
    const { title, description, localization, date, banner_id } = req.body;

    const updatedMeetup = await UpdateMeetupService.run({
      user_id: req.userId,
      meetup_id: req.params.id,
      title,
      description,
      localization,
      date,
      banner_id,
    });

    return res.json(updatedMeetup);
  }

  async delete(req, res) {
    const deletedRows = await DeleteMeetupService.run({
      user_id: req.userId,
      meetup_id: req.params.id,
    });

    return res.status(200).json({ deletedRows });
  }
}

export default new MeetupController();
