import React from 'react';
import './PendingRequestsTable.css';

function PendingRequestsTable({ requests, onApprove, onReject }) {
  return (
    <table style={styles.table}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Employee Name</th>
          <th>Submission Date</th>
          <th>Reason</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {requests.map((request) => (
          <tr key={request._id}>
            <td>{request._id}</td>
            <td>{request.username}</td>
            <td>{new Date(request.createdAt).toLocaleDateString()}</td>
            <td>{request.reason}</td>
            <td>
              <button
                style={styles.approveButton}
                onClick={() => onApprove(request._id)}
              >
                Approve
              </button>
              <button
                style={styles.rejectButton}
                onClick={() => onReject(request._id)}
              >
                Reject
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const styles = {
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
  },
  approveButton: {
    backgroundColor: '#28a745',
    color: 'white',
    padding: '5px 10px',
    marginRight: '5px',
    border: 'none',
    cursor: 'pointer',
  },
  rejectButton: {
    backgroundColor: '#dc3545',
    color: 'white',
    padding: '5px 10px',
    border: 'none',
    cursor: 'pointer',
  },
};

export default PendingRequestsTable;