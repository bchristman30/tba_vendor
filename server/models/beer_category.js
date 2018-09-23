module.exports = function (sequelize, DataTypes) {
  var beer_category = sequelize.define('beer_category', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    }
  }, {
    underscored: true,
      classMethods: {
        associate: function (models) {
          beer_category.belongsTo(models.beer_style);
        }
      }
    });

  return beer_category;
};