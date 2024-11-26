---

# **Employee Leave Management System**

## **Project Description**
The **Employee Leave Management System** is a web application designed to manage employee leave requests. The system provides:
- Employees with the ability to submit leave requests.
- Managers with the ability to view pending requests, approve, or reject them.

The project is built with **React.js** for the frontend, **Node.js** for the backend, and **MongoDB** as the database.

---

## **Features**

### **For Employees**
- Submit leave requests with a reason and specific dates.
- View their past leave requests and their current status (Pending, Approved, Rejected).

### **For Managers**
- View a list of all pending leave requests.
- Approve or reject leave requests.
- Track submission dates and reasons for leave.

---

## **Tech Stack**

### **Frontend**
- **React.js**
- **Material-UI (MUI)** for styling.

### **Backend**
- **Node.js**
- **Express.js**

### **Database**
- **MongoDB** (Local or Cloud via MongoDB Atlas)

---

## **Setup Instructions**

### **1. Clone the Repository**
```bash
git clone <repository_url>
cd employee-leave-management
```

### **2. Install Dependencies**

#### **Backend**
Navigate to the `backend` folder and install dependencies:
```bash
cd backend
npm install
```

#### **Frontend**
Navigate to the `frontend` folder and install dependencies:
```bash
cd ../frontend
npm install
```

---

### **3. Environment Variables**
Create a `.env` file in the `backend` folder and add the following variables:
```env
MONGO_URI=mongodb://localhost:27017/leave-management
PORT=5000
JWT_SECRET=your_secret_key
```

---

### **4. Start the Application**

#### **Backend**
Navigate to the `backend` folder and start the server:
```bash
cd backend
npm start
```

The server will run at: `http://localhost:5000`.

#### **Frontend**
Navigate to the `frontend` folder and start the React app:
```bash
cd ../frontend
npm start
```

The application will open in your browser at: `http://localhost:3000`.

---

## **API Endpoints**

### **Authentication**
- **POST /api/signup**: Register a new user (Manager or Employee).
- **POST /api/login**: Authenticate a user.

### **Leave Requests**
- **POST /api/leave-request**: Submit a new leave request (Employee).
- **GET /api/leave-requests/:username**: Fetch all leave requests for a specific employee.
- **GET /api/manager/leave-requests**: Fetch all pending leave requests for the manager.
- **POST /api/manager/leave-action**: Approve or reject a leave request.

---

## **Project Structure**

```
employee-leave-management/
├── backend/
│   ├── models/
│   │   ├── User.js          # Schema for user data
│   │   ├── Leave.js         # Schema for leave requests
│   ├── server.js            # Main backend server
│   ├── package.json         # Backend dependencies
├── frontend/
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── pages/           # React pages (Dashboard, Login, etc.)
│   │   ├── App.js           # Main React app
│   ├── package.json         # Frontend dependencies
├── README.md                # Project documentation
```

---

## **Future Enhancements**
- Implement JWT for secure authentication.
- Add email notifications for approval/rejection of leave requests.
- Add role-based dashboards (Manager vs. Employee).
- Enable light/dark mode toggle for better UX.
- Deploy the application using platforms like Vercel (Frontend) and Heroku (Backend).

---

## **Contributing**
If you'd like to contribute to this project, please fork the repository and submit a pull request. For any questions or feedback, feel free to open an issue.

---
