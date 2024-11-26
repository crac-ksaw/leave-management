import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./LoginPage.css"; // Make sure you have a CSS file for styling

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("employee"); // Default role is employee
  const [error, setError] = useState("");
  const [isSignup, setIsSignup] = useState(false); // Toggle between login and signup
  const navigate = useNavigate();

  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        username,
        password,
      });

      if (response.data.success) {
        localStorage.setItem("username", username); // Save username to localStorage

        const { role } = response.data; // Extract role (employee or manager)
        if (role === "employee") {
          navigate("/employee-dashboard");
        } else if (role === "manager") {
          navigate("/manager-dashboard");
        }
      } else {
        setError("Invalid username or password");
      }
    } catch (err) {
      console.error("Login failed:", err);
      setError("An error occurred. Please try again.");
    }
  };

  // Handle signup
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/signup", {
        username,
        password,
        role,
      });

      if (response.data.success) {
        alert("Signup successful! Please log in.");
        setIsSignup(false); // Switch back to login view after successful signup
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      console.error("Signup failed:", err);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <h2>{isSignup ? "Signup" : "Login"}</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={isSignup ? handleSignup : handleLogin} className="login-form">
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="input-field"
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input-field"
          />
        </div>
        {isSignup && (
          <div>
            <label>Role:</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
              className="input-field"
            >
              <option value="employee">Employee</option>
              <option value="manager">Manager</option>
            </select>
          </div>
        )}
        <button type="submit" className="submit-button">
          {isSignup ? "Sign Up" : "Login"}
        </button>
      </form>

      <button onClick={() => setIsSignup(!isSignup)} className="toggle-button">
        {isSignup ? "Already have an account? Login" : "Don't have an account? Sign Up"}
      </button>
    </div>
  );
};

export default LoginPage;
