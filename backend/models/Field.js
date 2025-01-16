const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/mysql');

const Field = sequelize.define('Field', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    createdBy: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
},{
    timestamps: true,
});

module.exports = Field;
