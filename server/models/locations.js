module.exports = function(sequelize, DataTypes) {
  var locations = sequelize.define('locations', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      unique: true
    },
    logo_string:{
      type: DataTypes.TEXT('long'),
    },
    address: {
      type: DataTypes.STRING
    },
    city:{
      type: DataTypes.STRING
    },
    state:{
      type: DataTypes.STRING
    },
    latitude:{
      type: DataTypes.STRING
    },
    longitude:{
      type: DataTypes.STRING
    },
    zipcode:{
      type: DataTypes.STRING
    },
    phone: {
      type: DataTypes.STRING
    },
    website_url:{
      type: DataTypes.STRING
    },
    instagram:{
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.TEXT('long')
    },
    total_redeemed_stamp:{
      type: DataTypes.INTEGER,
      defaultValue:0
    }
  },{
    underscored: true,
    classMethods: {
      associate: function(models) {
        locations.hasMany(models.location_hours);
        locations.hasMany(models.location_reviews);
        locations.hasMany(models.location_amenities);
        locations.hasMany(models.location_calendar);
        locations.hasMany(models.location_beer);
        locations.hasMany(models.user_stamps_entries);
        locations.belongsTo(models.brewery_owners);
      }
    }
  });

  return locations;
};