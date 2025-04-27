import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { authActions } from '../store/auth.jsx'; // Corrected import path
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false); // Loading state for the button
  const dispatch = useDispatch();
  const navigate = useNavigate();  // To redirect after login

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous error messages
    setErrorMessage('');
    
    // Basic form validation
    if (!email || !password) {
      setErrorMessage('Both email and password are required!');
      return;
    }

    setLoading(true);  // Set loading to true when the form is being submitted

    try {
      // API call to backend for login
      const response = await axios.post('http://localhost:8001/api/v1/login', {
        email,
        password,
      });

      // Save token and user info to localStorage
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      // Dispatch login action with the token and user data
      dispatch(authActions.login({
        token,
        user,
      }));

      console.log("Login Successful!", response.data);
      setLoading(false); // Stop loading once login is successful

      navigate('/');  // Redirect to home page after successful login
    } catch (error) {
      setLoading(false); // Stop loading if an error occurs
      console.error("Login error:", error.response?.data?.message || error.message);
      
      // Handle specific error cases (e.g., wrong password)
      if (error.response?.data?.message) {
        setErrorMessage(error.response.data.message); // Show specific error message from server
      } else {
        setErrorMessage('Something went wrong. Please try again later.');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#17203D] px-4">
      <div className="w-full max-w-md bg-[#1f2a52] rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-white text-center mb-6">Login to Your Account</h2>
        
        {/* Display error message if any */}
        {errorMessage && (
          <div className="bg-red-500 text-white p-3 rounded-md mb-4 text-center">
            {errorMessage}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-white mb-2">Email</label>
            <input
              type="email"
              className="w-full p-3 rounded-md bg-[#2a355e] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6552D0]"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-white mb-2">Password</label>
            <input
              type="password"
              className="w-full p-3 rounded-md bg-[#2a355e] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6552D0]"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#6552D0] text-white py-3 rounded-md hover:opacity-90 transition-all duration-200"
            disabled={loading} // Disable button when loading
          >
            {loading ? 'Logging In...' : 'Login'}
          </button>

          <p className="text-center text-gray-400 mt-4">
            Don't have an account?{" "}
            <Link to="/signup" className="text-[#6552D0] hover:underline">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
