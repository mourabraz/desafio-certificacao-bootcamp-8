import { Op } from 'sequelize';

import Meetup from '../models/Meetup';
import Banner from '../models/Banner';

class UpdateMeetupService {
  async run({
    meetup_id,
    user_id,
    banner_id,
    title,
    description,
    localization,
    date,
  }) {
    /**
     * Check if meetup id exists and belongs to authenticated user
     */
    const meetup = await Meetup.findByPk(meetup_id);
    if (!meetup) {
      throw new Error('Meetup not found');
    }
    if (meetup.user_id !== user_id) {
      throw new Error('Request not permitted');
    }

    /**
     * Check if date is in the past
     */
    if (meetup.past) {
      throw new Error('Update past meetups is not allowed');
    }

    /**
     * If banner id change and is present check if it exists
     * and is not being used by another meetup
     */
    if (banner_id && Number(banner_id) !== meetup.banner_id) {
      const banner = await Banner.findByPk(banner_id);
      if (!banner) {
        throw new Error('Banner is not found');
      }

      const meetupWithBanner = await Meetup.findOne({
        where: { banner_id },
        id: {
          [Op.ne]: meetup_id,
        },
      });
      if (meetupWithBanner) {
        throw new Error('Banner is already in use');
      }
    }

    await meetup.update({
      title,
      description,
      localization,
      date,
      banner_id,
    });

    const updatedMeetup = await Meetup.findByPk(meetup.id, {
      include: [
        {
          model: Banner,
          as: 'banner',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });

    return updatedMeetup;
  }
}

export default new UpdateMeetupService();
