import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import AdminDashboard from './components/AdminDashboard';
import TechnicianForm from './components/TechnicianForm';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Layout from './components/Layout';

function App() {
  const { user, isAdmin, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
        <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
        
        <Route path="/" element={user ? <Layout /> : <Navigate to="/login" />}>
          <Route index element={isAdmin ? <AdminDashboard /> : <TechnicianForm />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
