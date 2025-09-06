const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./User');
const { Project } = require('./Project');

const Task = sequelize.define('Task', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  status: { 
    type: DataTypes.ENUM('To-Do', 'In Progress', 'Done'),
    defaultValue: 'To-Do'
  },
  dueDate: { type: DataTypes.DATE }
}, { timestamps: true });

// Relations
Task.belongsTo(Project);
Project.hasMany(Task);

Task.belongsTo(User, { as: 'assignee' });
User.hasMany(Task, { foreignKey: 'assigneeId' });

module.exports = Task;
