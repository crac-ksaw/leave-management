// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './index.css';  // Make sure this file exists or remove it
import App from './App'; // Make sure you have the App component in src/App.js

// Render the App component into the root element
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);