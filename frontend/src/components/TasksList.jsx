import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskCard from './TaskCard.jsx';  // Assuming TaskCard is in the same folder

const TasksList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch tasks from backend
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:8001/api/v1/get-all-tasks', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Assuming the token is stored in localStorage
          },
        });
        setTasks(response.data);
      } catch (err) {
        setError('Failed to load tasks. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:8001/api/v1/delete-task/${taskId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setTasks(tasks.filter(task => task.id !== taskId)); // Update the task list after deletion
    } catch (err) {
      setError('Failed to delete task. Please try again.');
    }
  };

  const handleUpdateStatus = async (taskId) => {
    try {
      const task = tasks.find(t => t.id === taskId);
      const newStatus = task.status === 'completed' ? 'pending' : 'completed';
      await axios.put(
        `http://localhost:8001/api/v1/update-task/${taskId}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setTasks(tasks.map(t => t.id === taskId ? { ...t, status: newStatus } : t)); // Update the status of the task
    } catch (err) {
      setError('Failed to update task status. Please try again.');
    }
  };

  return (
    <section className="p-8">
      {loading ? (
        <p>Loading tasks...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onDelete={handleDeleteTask}
              onUpdateStatus={handleUpdateStatus}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default TasksList;
