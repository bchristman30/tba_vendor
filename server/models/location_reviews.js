module.exports = function(sequelize, DataTypes) {
    var location_reviews = sequelize.define('location_reviews', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      username: {
        type: DataTypes.STRING
      },
      message: {
        type: DataTypes.TEXT('long')
      },
      rating: {
        type: DataTypes.STRING
      }
    },{underscored: true,
      classMethods: {
        associate: function(models) {
          location_reviews.belongsTo(models.locations);

        }
      }
    });
  
    return location_reviews;
  };