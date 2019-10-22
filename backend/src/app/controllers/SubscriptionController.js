import { Op } from 'sequelize';

import Meetup from '../models/Meetup';
import User from '../models/User';
import Banner from '../models/Banner';
import Subscription from '../models/Subscription';

import CreateSubscriptionService from '../services/CreateSubscriptionService';
import DeleteSubscriptionService from '../services/DeleteSubscriptionService';

class SubscriptionController {
  async index(req, res) {
    const subscriptions = await Subscription.findAll({
      where: { user_id: req.userId },
      attributes: ['id', 'meetup_id', 'user_id'],
      include: [
        {
          model: Meetup,
          where: {
            date: { [Op.gt]: new Date() },
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
          ],
        },
      ],
      order: [[Meetup, 'date']],
    });

    return res.json(subscriptions);
  }

  async store(req, res) {
    const subscription = await CreateSubscriptionService.run({
      user_id: req.userId,
      meetup_id: req.body.meetup_id,
    });

    return res.json(subscription);
  }

  async delete(req, res) {
    const deletedRows = await DeleteSubscriptionService.run({
      user_id: req.userId,
      subscription_id: req.params.id,
    });

    return res.status(200).json({ deletedRows });
  }
}

export default new SubscriptionController();
