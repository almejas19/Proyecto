//  este test lo hice solo para probar conexion fuera de mi index y poder conectarme a la base de datos manteninendo mi codigo limpio.
const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
  }
);

sequelize.authenticate()
  .then(() => console.log('✅ Conexión exitosa a PostgreSQL'))
  .catch(err => console.error('❌ Error de conexión:', err));