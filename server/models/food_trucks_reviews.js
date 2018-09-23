module.exports = function(sequelize, DataTypes) {
    var food_trucks_reviews = sequelize.define('food_trucks_reviews', {
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
            food_trucks_reviews.belongsTo(models.food_trucks);

        }
      }
    });
  
    return food_trucks_reviews;
  };