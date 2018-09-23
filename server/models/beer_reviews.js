module.exports = function (sequelize, DataTypes) {
    var beer_reviews = sequelize.define('beer_reviews', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
       username: {
        type: DataTypes.STRING
      },
      message: {
        type: DataTypes.TEXT
      },
      rating: {
        type: DataTypes.STRING
      }
    }, {
        underscored: true,
        classMethods: {
          associate: function (models) {
            beer_reviews.belongsTo(models.beer);
          }
        }
      });
  
    return beer_reviews;
  };