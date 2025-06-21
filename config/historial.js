const { DataTypes } = require('sequelize');
const sequelize = require('./database');

const Historial = sequelize.define('historial_operaciones', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  usuario_id: {
    type: DataTypes.UUID,
    allowNull: false
  },
  expresion: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  resultado: {
    type: DataTypes.TEXT
  },
  tipo_operacion: {
    type: DataTypes.STRING,
    allowNull: false
  },
  operaciones_restantes_al_momento: {
    type: DataTypes.INTEGER
  },
  fecha: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  timestamps: false
});

module.exports = Historial;
