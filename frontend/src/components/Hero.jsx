import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Hero() {
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setUserLoggedIn(!!token);
  }, []);

  return (
    <section className="bg-[#17203D] min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
      {userLoggedIn ? (
        <>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Welcome Back! 🚀
          </h1>
          <p className="text-white/70 text-lg mb-8">
            Continue managing your tasks like a pro.
          </p>
          <Link
            to="/tasks"
            className="px-6 py-3 bg-[#6552D0] text-white rounded-md hover:opacity-90 transition-all duration-200"
          >
            Go to My Tasks
          </Link>
        </>
      ) : (
        <>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Organize. Prioritize. Achieve. ✨
          </h1>
          <p className="text-white/70 text-lg mb-8">
            Sign up today and elevate your task management experience.
          </p>
          <div className="flex space-x-4">
            <Link
              to="/signup"
              className="px-6 py-3 bg-[#6552D0] text-white rounded-md hover:opacity-90 transition-all duration-200"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="px-6 py-3 border-2 border-[#6552D0] text-[#6552D0] rounded-md hover:bg-[#6552D0] hover:text-white transition-all duration-200"
            >
              Login
            </Link>
          </div>
        </>
      )}
    </section>
  );
}

export default Hero;
