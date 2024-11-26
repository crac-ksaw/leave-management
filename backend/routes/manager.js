// routes/manager.js
const express = require('express');
const router = express.Router();
const LeaveRequest = require('../models/LeaveRequest');

// Get all pending leave requests
router.get('/leave-requests', async (req, res) => {
  try {
    // Fetch only pending leave requests
    const leaveRequests = await LeaveRequest.find({ status: 'pending' });

    res.status(200).json({
      success: true,
      leaveRequests,
    });
  } catch (error) {
    console.error('Error fetching leave requests:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch leave requests' });
  }
});

// Handle approve/reject leave requests
router.post('/leave-action', async (req, res) => {
  const { leaveId, status } = req.body;

  try {
    // Update the status of the leave request
    const updatedRequest = await LeaveRequest.findByIdAndUpdate(
      leaveId,
      { status }, // Update to either 'approved' or 'rejected'
      { new: true }
    );

    if (!updatedRequest) {
      return res.status(404).json({ success: false, message: 'Leave request not found' });
    }

    res.status(200).json({
      success: true,
      message: `Leave request ${status} successfully`,
    });
  } catch (error) {
    console.error('Error updating leave request status:', error);
    res.status(500).json({ success: false, message: 'Failed to update leave request status' });
  }
});

module.exports = router;