module.exports = function(sequelize, DataTypes) {
    var food_trucks_menu = sequelize.define('food_trucks_menu', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      feature_image: {
        type: DataTypes.TEXT('long')
      },
      name:{
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.STRING
      },
      price: {
        type: DataTypes.STRING
      }
    },{underscored: true,
      classMethods: {
        associate: function(models) {
            food_trucks_menu.belongsTo(models.food_trucks);
            food_trucks_menu.belongsTo(models.food_trucks_menu_category);
        }
      }
    });
  
    return food_trucks_menu;
  };