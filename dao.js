require('dotenv').config();
const { Sequelize, Model, DataTypes } = require('sequelize');

let init = () => {
    return new Sequelize(process.env.DATABASE, process.env.USERNAME, process.env.PASSWORD, {
        host: process.env.HOST,
        dialect: 'mysql'
    });
}

let sequelize = init();

sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

let Nyhet = sequelize.define('nyhet', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    overskrift: {
        type: DataTypes.STRING(64),
        allowNull: false
    },
    tekst: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    forfatter: {
        type: DataTypes.STRING(64),
        allowNull: false
    }
}, {
    tableName: 'nyheter'
})

class DAO {
    constructor() { }

    getNyheter() {
        return Nyhet.findAll();
    }

    getNyhet(id) {
        return Nyhet.findByPk(id);
    }

    addNyhet(overskrift, tekst, forfatter) {
        return Nyhet.create({ overskrift: overskrift, tekst: tekst, forfatter: forfatter });
    }
}

module.exports = { DAO };