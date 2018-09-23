module.exports = function (sequelize, DataTypes) {
  var user_beer_type = sequelize.define('user_beer_type', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    }
  }, {
    underscored: true,
      classMethods: {
        associate: function (models) {
          user_beer_type.belongsTo(models.users);
          user_beer_type.belongsTo(models.beer_style);
        }
      }
    });

  return user_beer_type;
};