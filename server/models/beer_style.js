module.exports = function(sequelize, DataTypes) {
  var beer_style = sequelize.define('beer_style', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    type: {
      type: DataTypes.STRING,
      unique: true
    }
  },{underscored: true,
    classMethods: {
      associate: function(models) {
        
      }
    }
  });

  return beer_style;
};