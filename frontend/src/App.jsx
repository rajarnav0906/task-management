import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/SignUp.jsx';
import Tasks from './pages/Tasks.jsx';
import PrivateRoute from './pages/PrivateRoute.jsx';

function App() {
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
          element={<PrivateRoute element={<Tasks />} />} 
        />
      </Routes>
    </>
  );
}

export default App;
