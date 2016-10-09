'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('Leo', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    leoName: DataTypes.STRING,
    leoInfo: DataTypes.STRING,
    leoActive: DataTypes.BOOLEAN
  });
}
