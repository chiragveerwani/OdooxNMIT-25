const express = require('express');
const { body, validationResult } = require('express-validator');
const { Project } = require('../models/Project');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// Create project
router.post('/', auth, [
  body('name').notEmpty().withMessage('Project name is required')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ error: 'Validation failed', details: errors.array() });

  try {
    const project = await Project.create({ name: req.body.name, description: req.body.description });
    await project.addUser(req.user.userId, { through: { role: 'owner' } });
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ error: 'Could not create project' });
  }
});

// List projects of current user
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.userId);
    const projects = await user.getProjects();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: 'Could not fetch projects' });
  }
});

// Add member
router.post('/:id/members', auth, [
  body('userId').isInt().withMessage('userId is required')
], async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (!project) return res.status(404).json({ error: 'Project not found' });

    const user = await User.findByPk(req.body.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    await project.addUser(user, { through: { role: 'member' } });
    res.json({ message: 'User added to project' });
  } catch (err) {
    res.status(500).json({ error: 'Could not add member' });
  }
});

module.exports = router;
