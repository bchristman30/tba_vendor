module.exports = function (sequelize, DataTypes) {
  var events = sequelize.define('events', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
    },
    featured_image: {
      type: DataTypes.TEXT('long')
    },
    featured_image_id:{
      type:DataTypes.STRING,
      allowNull:true
    }
  }, {
    underscored: true,
      classMethods: {
        associate: function (models) {
        
        }
      }
    });

  return events;
};