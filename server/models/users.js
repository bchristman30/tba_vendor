module.exports = function (sequelize, DataTypes) {
  var users = sequelize.define('users', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    dob: {
      type: DataTypes.DATE,
      allowNull: true
    },
    isverify: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    profilepicture: {
      type: DataTypes.TEXT('long'),
      allowNull: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    latitude: {
      type: DataTypes.STRING,
      allowNull: true
    },
    longitude: {
      type: DataTypes.STRING,
      allowNull: true
    },
    subscription_type:{
      type: DataTypes.STRING,
      defaultValue:'Free'
    },
    subscription_expiry_date:{
      type: DataTypes.DATE,
      allowNull: true
    },
    confirmation_key: {
      type: DataTypes.STRING,
      allowNull: true
    },
    forgettoken: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
      underscored: true,
      classMethods: {
        associate: function (models) {
          users.hasMany(models.user_beer_type);
          users.hasMany(models.user_payment);
          users.hasMany(models.user_stamps_entries);
          users.hasMany(models.user_location_stamp);
        }
      }
    });

  return users;
};