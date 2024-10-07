// db.js
const mongoose = require('mongoose');

// Replace 'your_database' with your actual database name
const uri = 'mongodb+srv://vignesh_2:WYpGNGTBuHrSs9eN@MyFirstProject.q3oqh.mongodb.net/?retryWrites=true&w=majority&authSource=admin';

const connectDB = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit process with failure
  }
};

// Export the connectDB function
module.exports = connectDB;
