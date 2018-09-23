module.exports = function (sequelize, DataTypes) {
  var location_hours = sequelize.define('location_hours', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    day: {
      type: DataTypes.STRING
    },
    opening_hour: {
      type: DataTypes.STRING
    },
    closing_hour: {
      type: DataTypes.STRING
    },
    isclose: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, { underscored: true,
        classMethods: {
        associate: function (models) {
          location_hours.belongsTo(models.locations);

        }
      }
    });

  return location_hours;
};