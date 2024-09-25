const sequelizeConfig = require('../config/db.config');
const { Sequelize } = require('sequelize');

const Carte = sequelizeConfig.define('carte', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    rarity: {
        type: Sequelize.STRING,
        allowNull: false
    },
    set_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    set_uri: {
        type: Sequelize.STRING,
        allowNull: false
    },
    price_eur: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true
    },
    mana_cost: {
        type: Sequelize.STRING,
        allowNull: true
    },
    power: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    toughness: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    loyalty: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    type: {
        type: Sequelize.STRING,
        allowNull: false
    },
    oracle_text: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    image_uri: {
        type: Sequelize.STRING,
        allowNull: false
    },

    colors: {
        type: Sequelize.STRING,
        allowNull: true,
    }
});

sequelizeConfig.sync();

module.exports = sequelizeConfig.model('carte', Carte);
