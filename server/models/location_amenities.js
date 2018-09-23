module.exports = function (sequelize, DataTypes) {
    var location_amenities = sequelize.define('location_amenities', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      }
    }, {
      underscored: true,
        classMethods: {
          associate: function (models) {
            location_amenities.belongsTo(models.locations);
            location_amenities.belongsTo(models.amenities);
          }
        }
      });
  
    return location_amenities;
  };