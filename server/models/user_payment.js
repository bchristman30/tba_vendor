module.exports = function(sequelize, DataTypes) {
    var user_payment = sequelize.define('user_payment', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      charge_id: {
        type: DataTypes.TEXT('medium')
      },
      amount: {
        type: DataTypes.STRING
      },
      payment_status: {
        type: DataTypes.STRING
      },
      expiry_date:{
        type: DataTypes.DATE
      }
    },{underscored: true,
      classMethods: {
        associate: function(models) {
            user_payment.belongsTo(models.users);

        }
      }
    });
  
    return user_payment;
  };