module.exports = function(sequelize, DataTypes) {
    var amenities = sequelize.define('amenities', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        unique: true
      },
      help_text:{
        type: DataTypes.TEXT('medium'),
      },
      icon:{
        type: DataTypes.TEXT('long')
      }
    },{underscored: true,
      classMethods: {
        associate: function(models) {
         
        }
      }
    });
  
    return amenities;
  };