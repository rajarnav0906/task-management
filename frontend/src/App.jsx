import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/SignUp.jsx';
import Tasks from './pages/Tasks.jsx';
import PrivateRoute from './pages/PrivateRoute.jsx';
import Loader from './components/Loader.jsx'; // Import the loader component

function App() {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
    setLoading(false); // Stop loading after authentication check
  }, []);

  // Show loader while checking authentication
  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* Use PrivateRoute for protected routes */}
        <Route 
          path="/tasks" 
          element={<PrivateRoute isAuthenticated={isAuthenticated} element={<Tasks />} />} 
        />
      </Routes>
    </>
  );
}

export default App;
