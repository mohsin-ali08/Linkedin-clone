import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Router and Routes
import Navbar from './components/Navbar';
import Home from './pages/Home'; // Import Home Component
import Login from './pages/Loginfrom'; // Import your Login Component
import Profile from './pages/Profile'; // Import your Profile Component
import NotFound from './pages/NotFound'; // Import your NotFound Component
import { AuthProvider } from './components/AuthProvider'; // Import your AuthProvider

function App() {
  return (
    <AuthProvider> {/* Wrap your application in AuthProvider */}
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} /> {/* 404 Route */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
