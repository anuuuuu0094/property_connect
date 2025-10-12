const mongoose = require("mongoose");
const redis = require("redis");

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Connection error:", err);
  }
}

module.exports = connectDB
