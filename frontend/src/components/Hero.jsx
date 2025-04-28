import { useState, useEffect } from 'react';
import TasksList from './TasksList.jsx';  // Assuming TasksList is in the same folder
import AddTaskButton from './AddTaskButton.jsx';  // Assuming AddTaskButton is in the same folder
import Loader from './Loader.jsx';  // Assuming Loader is in the same folder
import { Link } from 'react-router-dom';

function Hero() {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [loadingTasks, setLoadingTasks] = useState(true);  // State to track task loading
  const [tasks, setTasks] = useState([]);  // State to store tasks

  useEffect(() => {
    const token = localStorage.getItem('token');
    setUserLoggedIn(!!token);
  }, []);

  // Function to fetch tasks from an API or database
  const fetchTasks = async () => {
    try {
      // Replace the URL with your actual API endpoint
      const response = await fetch('/api/tasks', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      setTasks(data);  // Store the fetched tasks
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoadingTasks(false);  // Set loading to false after fetching tasks
    }
  };

  useEffect(() => {
    if (userLoggedIn) {
      fetchTasks();  // Fetch tasks when the user is logged in
    }
  }, [userLoggedIn]);

  if (userLoggedIn) {
    return (
      <section className="bg-[#17203D] min-h-screen text-white p-8 flex flex-col items-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[#b6d07a]">
          Welcome Back! 🚀
        </h1>
        <p className="text-white/70 text-lg mb-8">
          Manage your tasks and stay ahead of your goals.
        </p>
        
        {/* Add Task Button placed strategically */}
        <AddTaskButton />
        
        {/* Conditionally render Loader while tasks are being loaded */}
        {loadingTasks ? (
          <Loader />  // Show Loader while loading
        ) : (
          <TasksList tasks={tasks} />  // Show tasks after loading is complete
        )}
        
      </section>
    );
  }

  return (
    <section className="bg-[#17203D] min-h-screen flex flex-col items-center justify-center text-center px-6 py-12">
      <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
        Your Tasks. <span className="text-[#b6d07a]">Organized.</span>
        <br /> Your Goals. <span className="text-[#b6d07a]">Achieved.</span>
      </h1>

      <p className="text-white/70 text-lg max-w-2xl mb-10">
        Stay focused and productive with our powerful, minimalistic task manager.  
        Simple to use, yet powerful enough to handle all your goals.
      </p>

      {/* Add Task Button for non-logged-in users */}
      <div className="mb-10">
        <AddTaskButton />
      </div>

      <div className="flex space-x-4 mb-16">
        <Link
          to="/signup"
          className="px-8 py-4 bg-[#6552D0] text-white font-semibold rounded-lg hover:opacity-90 transition-all duration-200 text-lg"
        >
          Get Started
        </Link>
        <Link
          to="/login"
          className="px-8 py-4 border-2 border-[#6552D0] text-[#6552D0] font-semibold rounded-lg hover:bg-[#6552D0] hover:text-white transition-all duration-200 text-lg"
        >
          Login
        </Link>
      </div>

      <section className="grid md:grid-cols-3 gap-8 max-w-6xl w-full mt-10">
        {/* Feature 1 */}
        <div className="bg-[#1f2a4d] rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all">
          <h2 className="text-2xl font-semibold mb-4 text-[#b6d07a]">Fast Task Creation</h2>
          <p className="text-white/70">
            Add tasks effortlessly and stay focused on what matters most.
          </p>
        </div>

        {/* Feature 2 */}
        <div className="bg-[#1f2a4d] rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all">
          <h2 className="text-2xl font-semibold mb-4 text-[#b6d07a]">Real-time Stats</h2>
          <p className="text-white/70">
            Track your progress with beautiful, easy-to-read statistics.
          </p>
        </div>

        {/* Feature 3 */}
        <div className="bg-[#1f2a4d] rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all">
          <h2 className="text-2xl font-semibold mb-4 text-[#b6d07a]">Minimal Design</h2>
          <p className="text-white/70">
            Clean and distraction-free interface to boost your productivity.
          </p>
        </div>
      </section>
    </section>
  );
}

export default Hero;
