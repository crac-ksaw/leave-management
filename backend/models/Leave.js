const mongoose = require("mongoose");

const LeaveSchema = new mongoose.Schema({
  username: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  reason: { type: String, required: true },
  status: { type: String, default: "pending" }, // Add this field
  createdAt: { type: Date, default: Date.now }, // Only adds `createdAt`
});

module.exports = mongoose.model("Leave", LeaveSchema);