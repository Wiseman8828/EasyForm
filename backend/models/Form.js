const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/mysql');

const Form = sequelize.define("Form", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    fields: {
        type: DataTypes.JSON,
        allowNull: false,
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
}, {
    timestamps: true,
});

module.exports = Form;
