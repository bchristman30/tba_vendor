module.exports = function(sequelize, DataTypes) {
    var food_trucks_menu_category = sequelize.define('food_trucks_menu_category', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      category_name:{
        type: DataTypes.STRING,
        unique:true
      }
    },{underscored: true,
      classMethods: {
        associate: function(models){}
      }
    });
  
    return food_trucks_menu_category;
  };