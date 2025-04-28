import { useState, useEffect } from 'react';
import axios from 'axios';
import TasksList from './TasksList.jsx'; 
import AddTaskButton from './AddTaskButton.jsx';
import Loader from './Loader.jsx'; 
import { Link } from 'react-router-dom';
import TaskStats from './TaskStats.jsx';

function Hero() {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [loadingTasks, setLoadingTasks] = useState(true); 
  const [loadingAuth, setLoadingAuth] = useState(true); 
  const [tasks, setTasks] = useState([]); 

  useEffect(() => {
    const token = localStorage.getItem('token');
    setUserLoggedIn(!!token);
    setLoadingAuth(false);  
  }, []);

  // Function to fetch tasks from an API using axios
  const fetchTasks = async () => {
    try {
      const response = await axios.get('/api/tasks', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setTasks(response.data);  
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoadingTasks(false);  
    }
  };

  useEffect(() => {
    if (userLoggedIn) {
      fetchTasks();  
    }
  }, [userLoggedIn]);

  if (loadingAuth) {
  
    return <Loader />;
  }

  if (userLoggedIn) {
    return (
      <section className="bg-[#17203D] min-h-screen text-white p-8 flex flex-col items-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[#b6d07a]">
          Welcome Back! 🚀
        </h1>
        <p className="text-white/70 text-lg mb-12">
          Manage your tasks and stay ahead of your goals.
        </p>
        
        {/* Add Task Button placed strategically */}
        <div className="mb-8">
          <AddTaskButton />
        </div>

        {/* Task Stats */}
        <div className="mb-8 w-full max-w-4xl">
          <TaskStats />
        </div>
        
        {/* Conditionally render Loader while tasks are being loaded */}
        {loadingTasks ? (
          <Loader /> 
        ) : (
          <TasksList tasks={tasks} /> 
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

      <p className="text-white/70 text-lg max-w-2xl mb-12">
        Stay focused and productive with our powerful, minimalistic task manager.  
        Simple to use, yet powerful enough to handle all your goals.
      </p>

      {/* Add Task Button for non-logged-in users */}
      <div className="mb-10">
        <AddTaskButton />
      </div>

      <div className="flex space-x-4 mb-12">
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

      <section className="grid md:grid-cols-3 gap-8 max-w-6xl w-full mt-12">
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
