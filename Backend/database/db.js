const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      console.error('❌ MONGO_URI environment variable is not defined.');
      console.error('Please set it in your environment variables.');
      console.error('App will continue to run but database features will not work.');
      return false;
    }
    
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB Connected...');
    return true;
  } catch (err) {
    console.error('❌ Database connection error:', err.message);
    console.error('App will continue to run but database features will not work.');
    return false;
  }
};

module.exports = connectDB;
