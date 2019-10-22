import { parseISO, isBefore } from 'date-fns';

import Meetup from '../models/Meetup';
import Banner from '../models/Banner';

class CreateMeetupService {
  async run({ user_id, date, banner_id, title, description, localization }) {
    /**
     * Check if date is in the past
     */
    const dateParsed = parseISO(date);
    if (isBefore(dateParsed, new Date())) {
      throw new Error('Past dates are not permitted');
    }

    /**
     * Check if banner id exists and is not being used by another meetup
     */
    const banner = await Banner.findByPk(banner_id);
    if (!banner) {
      throw new Error('Banner id is not found');
    }
    const meetupWithBanner = await Meetup.findOne({
      where: { banner_id },
    });
    if (meetupWithBanner) {
      throw new Error('Banner is already in use');
    }

    const meetup = await Meetup.create({
      user_id,
      title,
      description,
      localization,
      date,
      banner_id,
    });

    return meetup;
  }
}

export default new CreateMeetupService();
