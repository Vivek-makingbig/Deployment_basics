const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const User = require("./models/Users");

const app = express();

// Middleware


const cors = require("cors");

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log("MongoDB Error:", err);
  });

// Test Route
app.get("/", (req, res) => {
  res.send("Backend running");
});

// Create User
app.post("/api/users", async (req, res) => {
  try {
    const { name } = req.body;
   

    const user = await User.create({
      name,
    });

    res.status(201).json(user);
  } catch (error) {
    console.log(error.message);

    res.status(500).json({
      message: "Error saving user",
    });
  }
});


//Get all the users
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json(users);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error fetching users",
    });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});