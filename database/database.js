const Sequelize = require('sequelize');


const connection = new Sequelize('ykpress', 'root', '-',{
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = connection;