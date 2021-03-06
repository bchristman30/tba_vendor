module.exports = function (sequelize, DataTypes) {
    var location_beer = sequelize.define('location_beer', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      }
    }, {
      underscored: true,
        classMethods: {
          associate: function (models) {
            location_beer.belongsTo(models.locations);
            location_beer.belongsTo(models.beer);
          }
        }
      });
  
    return location_beer;
  };