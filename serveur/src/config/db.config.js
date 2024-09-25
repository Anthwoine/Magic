require('dotenv').config();
const { Sequelize } = require('sequelize');


dbConfig = {
    HOST: 'localhost',
    USER: 'root',
    PASSWORD: '%root%14',
    DB: 'magicDB',
    dialect: "mysql" || "mariadb",
};

module.exports = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    define: {
        timestamps: true,
        createdAt: false,
        updatedAt: false,
    }
});