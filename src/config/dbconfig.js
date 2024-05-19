const DBString = process.env.MONGO_URL


const mongoose = require('mongoose');

async function connectToMongo() {
    try {
      await mongoose.connect(DBString, {
      });
      console.log('MongoDB connected successfully!');
    } catch (err) {
      console.error('MongoDB connection error:', err);
    }
  }
  
  connectToMongo();
  