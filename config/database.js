// database.js
const { Sequelize } = require('sequelize');
require('dotenv').config();

// parametros de conexion a mi docker
const sequelize = new Sequelize(
  'galileo',          // Nombre de la BD 
  process.env.DB_USER, 
  process.env.DB_PASSWORD, 
  {
    host: process.env.DB_HOST, 
    port: process.env.DB_PORT, 
    dialect: 'postgres',
    logging: false,    
  }
);

module.exports = sequelize;