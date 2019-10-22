import { Op } from 'sequelize';

import Meetup from '../models/Meetup';
import User from '../models/User';
import Subscription from '../models/Subscription';

import Notification from '../schemas/Notification';

import Queue from '../../lib/Queue';

import NewSubscriberMail from '../jobs/NewSubscriberMail';

class CreateSubscriptionService {
  async run({ meetup_id, user_id }) {
    const meetup = await Meetup.findOne({
      where: { id: meetup_id },
      include: [
        {
          model: User,
          as: 'owner',
          attributes: ['id', 'name', 'email'],
        },
      ],
    });

    /**
     * Check if meetup exists in database
     * and if logged user is not his owner
     */
    if (!meetup) {
      throw new Error('Meetup not found');
    }
    if (meetup.user_id === user_id) {
      throw new Error('User can not subscribe his own meetup');
    }

    /**
     * Check if meetup is already gonne
     */
    if (meetup.past) {
      throw new Error('Subscribe a past meetup is not allowed');
    }

    /**
     * Check if user already subscribe the meetup
     */
    const pastSubscription = await Subscription.findOne({
      where: {
        user_id,
        meetup_id: meetup.id,
      },
    });
    if (pastSubscription) {
      throw new Error('User already subscribe the meetup');
    }

    /**
     * Check if user already subscribe a meetup with the same date/time
     */
    const othersSubscriptions = await Subscription.count({
      where: { user_id },
      include: [
        {
          model: Meetup,
          where: { date: { [Op.eq]: meetup.date } },
        },
      ],
    });
    if (othersSubscriptions) {
      throw new Error(
        'User already subscribe a meetup with the same date/time'
      );
    }

    const subscription = await Subscription.create({
      user_id,
      meetup_id: meetup.id,
    });

    /**
     * Notify user subscription to meet up owner
     */
    const user = await User.findByPk(user_id);

    await Notification.create({
      content: `O meetup ${meetup.title} foi inscrito
      pelo usuário: ${user.name}`,
      owner: meetup.owner.id,
      subscriber: user.id,
    });

    await Queue.add(NewSubscriberMail.key, { meetup, user });

    return subscription;
  }
}

export default new CreateSubscriptionService();
