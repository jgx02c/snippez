import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, RouteProps } from 'react-router-dom';
import styles from './App.module.scss';
import Dashboard from "./pages/Dashboard";


// Simulating the check of a valid JWT token
const isTokenValid = () => {
  // Replace this logic with your actual validation logic
  const token = localStorage.getItem('token');
  // Example check: if the token exists and is not expired
  return token !== null;
};

function App() {
  return (
    <div className={styles.App}>
      <Router>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
