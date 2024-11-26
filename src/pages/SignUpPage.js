// src/pages/SignUpPage.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./SignUpPage.css";

const SignUpPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async () => {
    if (!username || !password || !role) {
      setError("All fields are required");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/signup", {
        username,
        password,
        role,
      });

      if (response.data.success) {
        alert("User registered successfully. Please log in.");
        navigate("/");
      }
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="signup-page">
      <h1>Sign Up</h1>
      <div className="signup-container">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="role-selection">
          <label>
            <input
              type="radio"
              name="role"
              value="employee"
              onChange={() => setRole("employee")}
            />
            Employee
          </label>
          <label>
            <input
              type="radio"
              name="role"
              value="manager"
              onChange={() => setRole("manager")}
            />
            Manager
          </label>
        </div>
        {error && <p className="error">{error}</p>}
        <button onClick={handleSignUp}>Sign Up</button>
      </div>
    </div>
  );
};

export default SignUpPage;