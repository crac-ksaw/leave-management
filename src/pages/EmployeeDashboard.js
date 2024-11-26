import React, { useState, useEffect } from "react";
import axios from "axios";

const EmployeeDashboard = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");
  const [leaveRequests, setLeaveRequests] = useState([]);

  const username = localStorage.getItem("username"); // Get the logged-in user's username

  // Function to fetch leave requests for the logged-in user
  const fetchLeaveRequests = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/leave-requests/${username}`);
      if (response.data.success) {
        setLeaveRequests(response.data.leaveRequests);
      }
    } catch (error) {
      console.error("Error fetching leave requests:", error);
      alert("Failed to fetch leave requests. Please try again.");
    }
  };

  // Function to handle leave request submission
  const handleSubmit = async () => {
    if (!startDate || !endDate || !reason) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/leave-request", {
        username,
        startDate,
        endDate,
        reason,
      });

      if (response.data.success) {
        alert("Leave request submitted successfully");
        setStartDate("");
        setEndDate("");
        setReason("");
        fetchLeaveRequests(); // Refresh the leave requests table
      }
    } catch (error) {
      console.error("Error submitting leave request:", error);
      alert("Failed to submit leave request. Please try again.");
    }
  };

  // Fetch leave requests when the component loads
  useEffect(() => {
    fetchLeaveRequests();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Employee Dashboard</h1>
      <p>Welcome, <b>{username}</b>!</p>

      {/* Leave Request Form */}
      <div style={{ marginBottom: "30px", border: "1px solid #ccc", padding: "20px", borderRadius: "5px" }}>
        <h2>Submit a Leave Request</h2>
        <div style={{ marginBottom: "10px" }}>
          <label>Start Date:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            style={{ marginLeft: "10px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>End Date:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            style={{ marginLeft: "10px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Reason:</label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            rows="4"
            style={{ display: "block", width: "100%", marginTop: "5px" }}
          />
        </div>
        <button onClick={handleSubmit} style={{ padding: "10px 20px", backgroundColor: "blue", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>
          Submit Leave Request
        </button>
      </div>

      {/* Leave Requests Table */}
      <div style={{ border: "1px solid #ccc", padding: "20px", borderRadius: "5px" }}>
        <h2>Your Leave Requests</h2>
        {leaveRequests.length === 0 ? (
          <p>No leave requests found.</p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ border: "1px solid #ccc", padding: "10px" }}>Start Date</th>
                <th style={{ border: "1px solid #ccc", padding: "10px" }}>End Date</th>
                <th style={{ border: "1px solid #ccc", padding: "10px" }}>Reason</th>
                <th style={{ border: "1px solid #ccc", padding: "10px" }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {leaveRequests.map((request, index) => (
                <tr key={index}>
                  <td style={{ border: "1px solid #ccc", padding: "10px" }}>{new Date(request.startDate).toLocaleDateString()}</td>
                  <td style={{ border: "1px solid #ccc", padding: "10px" }}>{new Date(request.endDate).toLocaleDateString()}</td>
                  <td style={{ border: "1px solid #ccc", padding: "10px" }}>{request.reason}</td>
                  <td style={{ border: "1px solid #ccc", padding: "10px" }}>{request.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default EmployeeDashboard;
