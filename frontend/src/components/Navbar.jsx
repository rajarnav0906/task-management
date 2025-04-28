import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'; 
import { authActions } from '../store/auth.jsx'; 
import { FiMenu, FiX } from 'react-icons/fi';
import { Link as ScrollLink } from 'react-scroll';  // Importing ScrollLink

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn); 

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch(authActions.logout());
    navigate('/login');
  };

  return (
    <nav className="bg-[#17203D] shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-bold text-white">
            TaskManager
          </Link>
        </div>

        <div className="hidden md:flex space-x-6 items-center">
          <Link to="/" className="text-white hover:text-[#6552D0] transition-colors duration-200">
            Home
          </Link>

          {isLoggedIn && (
            <ScrollLink
              to="taskList"  // The ID of your TaskList component
              smooth={true}
              offset={-50}  // Adjusts the scroll position (optional)
              duration={500}  // Scroll duration in ms
              className="text-white hover:text-[#6552D0] transition-colors duration-200 cursor-pointer"  // Added cursor-pointer
            >
              My Tasks
            </ScrollLink>
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

        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-[#17203D] px-4 pb-4 flex flex-col space-y-4">
          <Link to="/" onClick={toggleMenu} className="text-white hover:text-[#6552D0] transition-colors duration-200">
            Home
          </Link>

          {isLoggedIn && (
            <ScrollLink
              to="taskList"  // The ID of your TaskList component
              smooth={true}
              offset={-50}
              duration={500}
              onClick={toggleMenu}  // Close the mobile menu when clicked
              className="text-white hover:text-[#6552D0] transition-colors duration-200 cursor-pointer"  // Added cursor-pointer
            >
              My Tasks
            </ScrollLink>
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
