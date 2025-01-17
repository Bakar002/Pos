const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDb = require("./config/config");
const Users = require("./models/userModel");
require("colors");

// Load environment variables
dotenv.config();

// Connect to the database
connectDb();

// Function to add an admin user
const addAdmin = async () => {
  try {
    // Define the admin user
    const adminUser = {
      name: "Admin User",
      userId: "admin",
      password: "admin123", // Ideally, hash the password before saving
      verified: true,
    };

    // Check if an admin user already exists
    const existingAdmin = await Users.findOne({ userId: adminUser.userId });
    if (existingAdmin) {
      console.log("Admin user already exists".yellow);
    } else {
      // Add the admin user to the database
      await Users.create(adminUser);
      console.log("Admin user added successfully!".bgGreen);
    }

    // Exit the process
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`.bgRed.inverse);
    process.exit(1);
  }
};

// Run the seeder function
addAdmin();
