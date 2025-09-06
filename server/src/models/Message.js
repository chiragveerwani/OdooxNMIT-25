const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./User');
const { Project } = require('./Project');

const Message = sequelize.define('Message', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  content: { type: DataTypes.TEXT, allowNull: false }
}, { timestamps: true });

// Relations
Message.belongsTo(User);
User.hasMany(Message);

Message.belongsTo(Project);
Project.hasMany(Message);

module.exports = Message;
