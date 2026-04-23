const mongoose = require('mongoose');
const dns = require('dns');

const connectDB = async () => {
  try {
    // Force a reliable public DNS resolver for Atlas SRV lookups when the local resolver is unavailable.
    dns.setServers(['8.8.8.8', '1.1.1.1']);

    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
