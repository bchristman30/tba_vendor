module.exports = function (sequelize, DataTypes) {
  var location_calendar = sequelize.define('location_calendar', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    start_date:{
      type: DataTypes.DATE
    },
    end_date:{
      type: DataTypes.DATE
    },
    type: {
      type: DataTypes.ENUM('events', 'food_trucks')
    },
    referring_id: {
      type: DataTypes.INTEGER
    }
  }, {
      underscored: true,
      classMethods: {
        associate: function (models) {
          location_calendar.belongsTo(models.locations);
        }
      }
    });

  return location_calendar;
};