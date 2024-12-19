const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Models
const User = require("./models/User"); // User model for authentication
const Leave = require("./models/Leave"); // Leave model for leave requests

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
const MONGO_URI = "mongodb://localhost:27017/leave-management"; // Database name is 'leave-management'

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// ---------- Endpoints ---------- //

// 1. **Signup Endpoint**
app.post("/api/signup", async (req, res) => {
  const { username, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword, role });
    await newUser.save();

    res
      .status(201)
      .json({ success: true, message: "User registered successfully" });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ success: false, message: "Signup failed" });
  }
});

// 2. **Login Endpoint**
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    res.status(200).json({ success: true, role: user.role });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ success: false, message: "Login failed" });
  }
});

// 3. **Submit Leave Request**
app.post("/api/leave-request", async (req, res) => {
  const { username, startDate, endDate, reason } = req.body;

  try {
    const newLeave = new Leave({
      username,
      startDate,
      endDate,
      reason,
      status: "pending", // Default status is "pending"
    });

    await newLeave.save();
    res
      .status(201)
      .json({ success: true, message: "Leave request submitted successfully" });
  } catch (error) {
    console.error("Error submitting leave request:", error);
    res.status(500).json({ success: false, message: "Failed to submit leave request" });
  }
});

// 4. **Fetch Leave Requests for Employee**
app.get("/api/leave-requests/:username", async (req, res) => {
  const { username } = req.params;

  try {
    const leaveRequests = await Leave.find({ username }); // Fetch leave requests for a specific employee
    res.status(200).json({ success: true, leaveRequests });
  } catch (error) {
    console.error("Error fetching leave requests:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch leave requests" });
  }
});

// 5. **Fetch All Pending Leave Requests for Manager**
app.get("/api/manager/leave-requests", async (req, res) => {
  try {
    const pendingRequests = await Leave.find({ status: "pending" }); // Fetch only "pending" requests
    res.status(200).json({ success: true, leaveRequests: pendingRequests });
  } catch (error) {
    console.error("Error fetching leave requests:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch leave requests" });
  }
});

// 6. **Approve/Reject Leave Requests**
app.post("/api/manager/leave-action", async (req, res) => {
  const { leaveId, status } = req.body; // `status` can be "approved" or "rejected"

  try {
    // Validate input
    if (!leaveId || !status) {
      return res
        .status(400)
        .json({ success: false, message: "Leave ID and status are required" });
    }

    // Update the leave request's status
    const updatedLeave = await Leave.findByIdAndUpdate(
      leaveId,
      { status }, // Update the status field
      { new: true } // Return the updated document
    );

    if (!updatedLeave) {
      return res
        .status(404)
        .json({ success: false, message: "Leave request not found" });
    }

    res
      .status(200)
      .json({
        success: true,
        message: "Leave request updated successfully",
        leave: updatedLeave,
      });
  } catch (error) {
    console.error("Error updating leave request:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to update leave request" });
  }
});

// ---------- Start Server ---------- //
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
}); 