const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/mysql');

const FormData = sequelize.define("FormData", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    formId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    fieldData: {
        type: DataTypes.JSON,
        allowNull: false,
    },
});

module.exports = FormData;
