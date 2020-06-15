"use strict";
module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define(
    "Transaction",
    {
      startDate: DataTypes.DATEONLY,
      dueDate: DataTypes.DATEONLY,
      userId: DataTypes.INTEGER,
      attache: DataTypes.STRING,
      status: DataTypes.ENUM,
    },
    {}
  );
  Transaction.associate = function (models) {
    // associations can be defined here
    Transaction.belongsTo(models.User, {
      foreignKey: {
        name: "userId",
      },
    });
  };
  return Transaction;
};
