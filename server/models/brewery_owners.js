module.exports = function (sequelize, DataTypes) {
    var brewery_owners = sequelize.define('brewery_owners', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      email: {
        type: DataTypes.STRING,
        unique: true
      },
      isverify: {
        type: DataTypes.INTEGER,
        defaultValue: 1
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      phone:{
        type: DataTypes.STRING,
        allowNull:true
      },
      confirmation_key: {
        type: DataTypes.STRING,
        allowNull: true
      }
    }, {
        underscored: true,
        classMethods: {
          associate: function (models) {
            brewery_owners.hasOne(models.locations);
         
          }
        }
      });
  
    return brewery_owners;
  };