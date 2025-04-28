import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskCard from './TaskCard.jsx';  // Assuming TaskCard is in the same folder
import Loader from './Loader'; // Assuming you have a Loader component

const TasksList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch tasks from the backend
  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8001/api/v1/get-all-tasks', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setTasks(response.data);
    } catch (err) {
      setError('Failed to load tasks. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks(); // Fetch tasks when component mounts
  }, []); // Empty dependency array ensures it only runs once on mount

  return (
    <section className="p-8">
      {/* Show loader if tasks are being fetched */}
      {loading ? (
        <div className="flex justify-center items-center">
          <Loader /> {/* Assuming Loader is a spinner or loading animation */}
        </div>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      )}
    </section>
  );
};

export default TasksList;
