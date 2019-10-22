import Sequelize, { Model } from 'sequelize';

class Subscription extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        user_id: Sequelize.INTEGER,
        meetup_id: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: 'user_id',
      // targetKey: 'id',
    });
    this.belongsTo(models.Meetup, {
      foreignKey: 'meetup_id',
      // targetKey: 'id',
    });
  }
}

export default Subscription;
