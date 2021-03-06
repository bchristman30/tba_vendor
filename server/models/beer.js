module.exports = function (sequelize, DataTypes) {
  var beer = sequelize.define('beer', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name:{
      type: DataTypes.STRING,
      unique: true 
    },
    Alchohol_content: {
      type: DataTypes.STRING
    },
    beer_description:{
      type:DataTypes.TEXT('medium')
    },
    beer_logo: {
      type: DataTypes.TEXT('long')
    },
    price:{
      type: DataTypes.FLOAT
    }
  }, {
      underscored: true,
      classMethods: {
        associate: function (models) {
          beer.hasMany(models.beer_category);
          beer.hasMany(models.beer_reviews);
        }
      }
    });

  return beer;
};