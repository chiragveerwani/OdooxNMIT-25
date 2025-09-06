const express = require('express');
const { body, validationResult } = require('express-validator');
const Message = require('../models/Message');
const { Project } = require('../models/Project');
const auth = require('../middleware/auth');

const router = express.Router();

// Post message
router.post('/', auth, [
  body('content').notEmpty(),
  body('projectId').isInt()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ error: 'Validation failed', details: errors.array() });

  try {
    const { content, projectId } = req.body;
    const project = await Project.findByPk(projectId);
    if (!project) return res.status(404).json({ error: 'Project not found' });

    const message = await Message.create({ content, UserId: req.user.userId, ProjectId: projectId });
    res.status(201).json(message);
  } catch (err) {
    res.status(500).json({ error: 'Could not post message' });
  }
});

// Get messages for a project
router.get('/project/:id', auth, async (req, res) => {
  try {
    const messages = await Message.findAll({ where: { ProjectId: req.params.id }, include: ['User'] });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: 'Could not fetch messages' });
  }
});

module.exports = router;
