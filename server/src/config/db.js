const { Sequelize } = require('sequelize');

// Update these with your Postgres credentials
const sequelize = new Sequelize(
  process.env.DB_NAME || 'hackathon_db',
  process.env.DB_USER || 'postgres',
  process.env.DB_PASS || 'W@hegurug1',
  {
    host: process.env.DB_HOST || '127.0.0.1',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    logging: false,
  }
);


async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected successfully');
  } catch (error) {
    console.error('❌ Unable to connect to DB:', error);
    process.exit(1);
  }
}

module.exports = { sequelize, connectDB };
