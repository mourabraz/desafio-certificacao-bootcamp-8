import Meetup from '../models/Meetup';
import User from '../models/User';
import Banner from '../models/Banner';

class MeetupUserController {
  async index(req, res) {
    const meetups = await Meetup.findAll({
      where: { user_id: req.userId },
      attributes: [
        'id',
        'title',
        'description',
        'localization',
        'date',
        'past',
        'banner_id',
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
    });

    return res.json(meetups);
  }
}

export default new MeetupUserController();
