import React from 'react';
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/LandingPage/Landing";
import MainPage from './components/MainPage/mainPage';
import Login from './components/Login/Login';
import Signup from './components/Login/Signup';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from "./components/Dashboard/Dashboard";
import AdminDashboard from './components/Dashboard/AdminDashboard';
import './App.css';

function App() {
  return ( 
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/MainPage" element={<MainPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
    </>
  );
}

export default App;
