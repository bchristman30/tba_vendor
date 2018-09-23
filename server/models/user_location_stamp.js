module.exports = function(sequelize, DataTypes) {
    var user_location_stamp = sequelize.define('user_location_stamp', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      stamp: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    },{underscored: true,
      classMethods: {
        associate: function(models) {
            user_location_stamp.belongsTo(models.locations);
            user_location_stamp.belongsTo(models.users);
        }
      }
    });
  
    return user_location_stamp;
  };