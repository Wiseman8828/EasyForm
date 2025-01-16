const { Sequelize } = require('sequelize');
const { dbCredentials } = require('../config')
const sequelize = new Sequelize(
    dbCredentials().database,
    dbCredentials().user,
    dbCredentials().password,
    {
        host: dbCredentials().host,
        dialect: "mysql",
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000,
        },
        logging: false,
    }
)

const connectSqlDB = async () => {
    try {
        await sequelize.sync();
        await sequelize.authenticate();
        console.log('MySQL Connected');
    } catch (err) {
        console.error('Unable to connect to the database:', err.message);
        process.exit(1);
    }
};

module.exports = { sequelize, connectSqlDB };
