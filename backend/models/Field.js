const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/mysql');

const Field = sequelize.define('Field', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    type: {
        type: DataTypes.ENUM("String", "Number", "File", "Text"),
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    createdBy: {
        type:  DataTypes.UUID,
        allowNull: false,
    }
},{
    timestamps: true,
});

module.exports = Field;
