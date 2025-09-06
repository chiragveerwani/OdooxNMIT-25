require('dotenv').config();


const express = require('express');
const cors = require('cors');
const { connectDB, sequelize } = require('./config/db');

// Models
require('./models/User');
require('./models/Project');
require('./models/Task');
require('./models/Message');

// Routes
const authRoutes = require('./routes/auth');
const projectRoutes = require('./routes/projects');
const taskRoutes = require('./routes/tasks');
const messageRoutes = require('./routes/messages');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/messages', messageRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'SynergySphere API is running!', version: '1.0.0' });
});

const PORT = process.env.PORT || 5000;

(async () => {
  await connectDB();
  await sequelize.sync({ alter: true });
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
})();
