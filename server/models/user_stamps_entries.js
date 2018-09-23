module.exports = function(sequelize, DataTypes) {
    var user_stamps_entries = sequelize.define('user_stamps_entries', {
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
    },{
    underscored: true,
      classMethods: {
        associate: function(models) {
            user_stamps_entries.belongsTo(models.users);
            user_stamps_entries.belongsTo(models.locations);

        }
      }
    });
  
    return user_stamps_entries;
  };