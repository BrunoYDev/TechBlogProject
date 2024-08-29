const Sequelize = require('sequelize');


const connection = new Sequelize('ykpress', 'root', '-',{
    host: 'localhost',
    dialect: 'mysql',
    timezone: '-03:00' // brazilian timezone
})

module.exports = connection;