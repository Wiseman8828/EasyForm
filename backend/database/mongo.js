const mongoose = require("mongoose");
const { mongoDbCredentials } = require('../config');

const connectMongoDB = async () => {
  try {
    await mongoose.connect(mongoDbCredentials().hostURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
    });
    console.log("Successfully connected to MongoDB with Mongoose!");

    const db = mongoose.connection;
    db.on("error", (err) => {
      console.error("MongoDB connection error:", err);
    });
    db.once("open", () => {
      console.log("MongoDB connection established successfully.");
    });
  } catch (error) {
    console.error("Error while connecting to MongoDB:", error);
  }
};

module.exports = connectMongoDB;
