const mongoose = require('mongoose');
require('dotenv').config();

// Define the MongoDB connection URL
//  const mongoURL = process.env.MONGODB_URL_LOCAL;
const mongoURL = process.env.MONGODB_URI; // Use this for production environment (MongoDB Atlas)

// Setup MongoDB connection
mongoose.connect(mongoURL)
.then(() => {
    console.log("MongoDB connected");
})
.catch((err) => {
    console.error("MongoDB connection error...", err);
});

// Get the default connection
const db = mongoose.connection;

// Event listeners
db.on('connected', () => {
    console.log('Connected to MongoDB server...');
});

db.on('error', (err) => {
    console.log('MongoDB connection error...', err);
});

db.on('disconnected', () => {
    console.log('MongoDB server disconnected...');
});

// Export the database connection
module.exports = db;