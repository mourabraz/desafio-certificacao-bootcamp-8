/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
import '../../database';

import { resolve } from 'path';
import fs from 'fs';

import { Op } from 'sequelize';
import { startOfDay, endOfDay, subHours } from 'date-fns';

import Banner from '../models/Banner';
import Meetup from '../models/Meetup';

import { HOURS_UTIL_VANISH_IMAGES } from '../../config/constants';

class VanishUnusedImages {
  get key() {
    return 'VanishUnusedImages';
  }

  async handle() {
    const dateSearch = subHours(new Date(), HOURS_UTIL_VANISH_IMAGES);

    /*
     * get all banners ids that have been created during one day before HOURS_UNTIL_VANISH_IMAGES
     */
    const banners_id_updated_in_interval = await Banner.findAll({
      where: {
        createdAt: {
          [Op.between]: [startOfDay(dateSearch), endOfDay(dateSearch)],
        },
      },
      attributes: ['id'],
    }).map(b => b.id);

    /*
     * Loop array to ids that is not being used by meetups table
     */
    const banners_not_being_used_by_meetups = [];

    for (
      let index = 0;
      index < banners_id_updated_in_interval.length;
      index++
    ) {
      const meetupWithBanner = await Meetup.findOne({
        where: { banner_id: banners_id_updated_in_interval[index] },
      });
      if (!meetupWithBanner) {
        banners_not_being_used_by_meetups.push(
          banners_id_updated_in_interval[index]
        );
      }
    }

    /*
     * Get banner path by id and try to remove from disk, if success remove data from table
     */
    for (
      let index = 0;
      index < banners_not_being_used_by_meetups.length;
      index++
    ) {
      const banner = await Banner.findByPk(
        banners_not_being_used_by_meetups[index]
      );

      if (banner) {
        const bannerPath = resolve(
          __dirname,
          '..',
          '..',
          '..',
          'tmp',
          'uploads',
          banner.path
        );

        fs.unlink(bannerPath, async err => {
          if (!err) {
            await banner.destroy();
          }
        });
      }
    }
  }
}

export default new VanishUnusedImages();
