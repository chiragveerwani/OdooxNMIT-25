const express = require('express');
const { body, validationResult } = require('express-validator');
const Task = require('../models/Task');
const { Project } = require('../models/Project');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// Create task
router.post('/', auth, [
  body('title').notEmpty(),
  body('projectId').isInt()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ error: 'Validation failed', details: errors.array() });

  try {
    const { title, description, projectId, dueDate, assigneeId } = req.body;
    const project = await Project.findByPk(projectId);
    if (!project) return res.status(404).json({ error: 'Project not found' });

    const task = await Task.create({ title, description, ProjectId: projectId, dueDate, assigneeId });
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: 'Could not create task' });
  }
});

// Update status
router.patch('/:id/status', auth, [
  body('status').isIn(['To-Do', 'In Progress', 'Done'])
], async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) return res.status(404).json({ error: 'Task not found' });

    task.status = req.body.status;
    await task.save();

    res.json(task);
  } catch (err) {
    res.status(500).json({ error: 'Could not update task status' });
  }
});

// Get tasks of a project
router.get('/project/:id', auth, async (req, res) => {
  try {
    const tasks = await Task.findAll({ where: { ProjectId: req.params.id }, include: [{ model: User, as: 'assignee' }] });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Could not fetch tasks' });
  }
});

module.exports = router;
