const { DataTypes } = require('sequelize');
const sequelize = require('./database');

const User = sequelize.define('users', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  tipo: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [['admin', 'estandar', 'invitado']]
    }
  },
  operaciones_restantes: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  timestamps: false
});

module.exports = User;
