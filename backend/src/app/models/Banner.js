import Sequelize, { Model } from 'sequelize';

class Banner extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        path: Sequelize.STRING,
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `${process.env.APP_URL}/banners/${this.path}`;
          },
        },
      },
      { sequelize }
    );

    return this;
  }

  static associate(models) {
    this.hasOne(models.Meetup, { foreignKey: 'banner_id', as: 'meetup' });
  }
}

export default Banner;
