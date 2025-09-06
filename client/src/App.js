import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import { authService } from './services/authService';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in when app loads
  useEffect(() => {
    const checkAuth = () => {
      if (authService.isAuthenticated()) {
        const currentUser = authService.getCurrentUser();
        setUser(currentUser);
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleSignup = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    authService.logout();
    setUser(null);
  };

  const switchToSignup = () => setIsLogin(false);
  const switchToLogin = () => setIsLogin(true);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading SynergySphere...</p>
      </div>
    );
  }

  return (
    <div className="App">
      {user ? (
        <Dashboard user={user} onLogout={handleLogout} />
      ) : (
        <>
          {isLogin ? (
            <Login onLogin={handleLogin} switchToSignup={switchToSignup} />
          ) : (
            <Signup onSignup={handleSignup} switchToLogin={switchToLogin} />
          )}
        </>
      )}
    </div>
  );
}

export default App;