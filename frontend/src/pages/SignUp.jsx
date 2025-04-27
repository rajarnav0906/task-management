import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false); // Loading state for the submit button
  const navigate = useNavigate(); // For navigation after signup

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous error messages
    setErrorMessage('');

    // Basic field validation
    if (!email || !password || !confirmPassword) {
      setErrorMessage('All fields are required!');
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match!');
      return;
    }

    setLoading(true); // Show loading indicator while sending request

    // Sending POST request to the backend
    try {
      const response = await axios.post('http://localhost:8001/api/v1/signup', {
        email,
        password,
      });

      // Redirect to login page on successful signup
      if (response.status === 201) {
        navigate('/login');
      }
    } catch (error) {
      setLoading(false); // Stop loading if an error occurs
      // Handle error from the backend (email already exists, etc.)
      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('Something went wrong! Please try again later.');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#17203D] px-4">
      <div className="w-full max-w-md bg-[#1f2a52] rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-white text-center mb-6">Create Your Account</h2>

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
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-white mb-2">Confirm Password</label>
            <input
              type="password"
              className="w-full p-3 rounded-md bg-[#2a355e] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6552D0]"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#6552D0] text-white py-3 rounded-md hover:opacity-90 transition-all duration-200"
            disabled={loading} // Disable button while submitting
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>

          <p className="text-center text-gray-400 mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-[#6552D0] hover:underline">
              Log in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
