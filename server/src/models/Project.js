const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./User');

const Project = sequelize.define('Project', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
}, { timestamps: true });

// Many-to-many: Users <-> Projects
const ProjectMember = sequelize.define('ProjectMember', {
  role: { type: DataTypes.STRING, defaultValue: 'member' }
});

User.belongsToMany(Project, { through: ProjectMember });
Project.belongsToMany(User, { through: ProjectMember });

module.exports = { Project, ProjectMember };
