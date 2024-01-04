const connection = require('../config/connection');
const {User, Thought }= require('../models/');
const { users, thoughts } = require('./data');



connection.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

connection.once('open', async () => {
  console.log('Connected to MongoDB!');

  let usersCheck = await connection.db.listCollections({ name: 'users' }).toArray();
  if (usersCheck.length) {
    await connection.dropCollection('users');
  }

  let thoughtsCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
  if (thoughtsCheck.length) {
    await connection.dropCollection('thoughts');
  }
  
  try {
    // Insert users
    await User.insertMany(users);

    // Insert thoughts
    await Thought.insertMany(thoughts);

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await connection.close(); // Disconnect from the database after seeding
  }
});