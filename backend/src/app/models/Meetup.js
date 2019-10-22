import Sequelize, { Model } from 'sequelize';
import { isBefore } from 'date-fns';

class Meetup extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        description: Sequelize.TEXT,
        localization: Sequelize.STRING,
        date: Sequelize.DATE,

        past: {
          type: Sequelize.VIRTUAL,
          get() {
            return isBefore(this.date, new Date());
          },
        },
      },
      { sequelize }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'owner' });
    this.belongsTo(models.Banner, { foreignKey: 'banner_id', as: 'banner' });
    this.belongsToMany(models.User, {
      through: models.Subscription,
      foreignKey: 'meetup_id',
      as: 'subscribers',
    });
  }
}

export default Meetup;
