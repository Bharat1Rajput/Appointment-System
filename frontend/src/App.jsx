import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './pages/signup';
import Login from './pages/login';

const App = () => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  return (
    <BrowserRouter>
      <Routes>
        
        {/* Signup page */}
        <Route path="/signup" element={<Signup />} />
        {/* Login page */}
        <Route path="/login" element={<Login />} />
        

      </Routes>
    </BrowserRouter>
  );
};

export default App;
