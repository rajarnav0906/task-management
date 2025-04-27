import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';  // Import useNavigate
import { authActions } from '../store/auth.jsx';  // Corrected import path
import { FiMenu, FiX } from 'react-icons/fi';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();  // Initialize the useNavigate hook
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn); // Get logged-in state from Redux

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleLogout = () => {
    // Clear localStorage and dispatch logout action
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch(authActions.logout());

    // Navigate to login page after logout
    navigate('/login');
  };

  return (
    <nav className="bg-[#17203D] shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-bold text-white">
            TaskManager
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link to="/" className="text-white hover:text-[#6552D0] transition-colors duration-200">
            Home
          </Link>

          {isLoggedIn && (
            <Link to="/tasks" className="text-white hover:text-[#6552D0] transition-colors duration-200">
              My Tasks
            </Link>
          )}

          {!isLoggedIn ? (
            <Link to="/login" className="px-4 py-2 bg-[#6552D0] text-white rounded-md hover:opacity-90 transition-all duration-200">
              Login
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-[#6552D0] text-white rounded-md hover:opacity-90 transition-all duration-200"
            >
              Logout
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#17203D] px-4 pb-4 flex flex-col space-y-4">
          <Link to="/" onClick={toggleMenu} className="text-white hover:text-[#6552D0] transition-colors duration-200">
            Home
          </Link>

          {isLoggedIn && (
            <Link to="/tasks" onClick={toggleMenu} className="text-white hover:text-[#6552D0] transition-colors duration-200">
              My Tasks
            </Link>
          )}

          {!isLoggedIn ? (
            <Link to="/login" onClick={toggleMenu} className="px-4 py-2 bg-[#6552D0] text-white rounded-md hover:opacity-90 transition-all duration-200">
              Login
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-[#6552D0] text-white rounded-md hover:opacity-90 transition-all duration-200"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
