module.exports = function (sequelize, DataTypes) {
    var food_trucks = sequelize.define('food_trucks', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            unique: true
        },
        featured_image: {
            type: DataTypes.TEXT('long')
        },
        featured_image_id: {
            type:DataTypes.TEXT('long'),
            allowNull: true
        },
        description: {
            type: DataTypes.TEXT('medium'),
        },
        address: {
            type: DataTypes.STRING
        },
        city: {
            type: DataTypes.STRING
        },
        state: {
            type: DataTypes.STRING
        },
        zipcode: {
            type: DataTypes.STRING
        },
        phone: {
            type: DataTypes.STRING
        }
    }, {
            underscored: true,
            classMethods: {
                associate: function (models) {
                    food_trucks.hasMany(models.food_trucks_menu);
                    food_trucks.hasMany(models.food_trucks_reviews);
                }
            }
        });

    return food_trucks;
};