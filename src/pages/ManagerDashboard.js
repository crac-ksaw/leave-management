import React, { useState, useEffect } from 'react';
import PendingRequestsTable from '../components/PendingRequestsTable';
import axios from 'axios';
import './ManagerDashboard.css';

function ManagerDashboard() {
  const [pendingRequests, setPendingRequests] = useState([]);

  // Fetch pending leave requests from the server
  useEffect(() => {
    const fetchLeaveRequests = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/manager/leave-requests');
        if (response.data.success) {
          setPendingRequests(response.data.leaveRequests); // Set pending requests only
        } else {
          alert('Failed to fetch leave requests');
        }
      } catch (error) {
        console.error('Error fetching leave requests:', error);
        alert('An error occurred while fetching leave requests.');
      }
    };

    fetchLeaveRequests();
  }, []);

  // Handle Approve Action
  const handleApprove = async (id) => {
    try {
      const response = await axios.post('http://localhost:5000/api/manager/leave-action', {
        leaveId: id,
        status: 'approved',
      });
      if (response.data.success) {
        alert(`Leave request ${id} approved!`);
        setPendingRequests(pendingRequests.filter((req) => req._id !== id));
      } else {
        alert('Failed to approve leave request');
      }
    } catch (error) {
      console.error('Error approving leave request:', error);
      alert('An error occurred while approving the leave request.');
    }
  };

  // Handle Reject Action
  const handleReject = async (id) => {
    try {
      const response = await axios.post('http://localhost:5000/api/manager/leave-action', {
        leaveId: id,
        status: 'rejected',
      });
      if (response.data.success) {
        alert(`Leave request ${id} rejected!`);
        setPendingRequests(pendingRequests.filter((req) => req._id !== id));
      } else {
        alert('Failed to reject leave request');
      }
    } catch (error) {
      console.error('Error rejecting leave request:', error);
      alert('An error occurred while rejecting the leave request.');
    }
  };

  return (
    <div style={styles.container}>
      <h1>Manager Dashboard</h1>
      <h3>Pending Leave Requests</h3>
      <PendingRequestsTable
        requests={pendingRequests}
        onApprove={handleApprove}
        onReject={handleReject}
      />
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
  },
};

export default ManagerDashboard;
