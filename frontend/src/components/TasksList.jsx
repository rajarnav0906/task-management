import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskCard from './TaskCard.jsx';
import Loader from './Loader';
import { FaFilter } from 'react-icons/fa';

const TasksList = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

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
      setFilteredTasks(response.data);
    } catch (err) {
      setError('Failed to load tasks. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Filter tasks based on the selected status
  useEffect(() => {
    if (statusFilter === 'all') {
      setFilteredTasks(tasks);
    } else if (statusFilter === 'completed') {
      setFilteredTasks(tasks.filter(task => task.status === 'completed'));
    } else if (statusFilter === 'active') {
      setFilteredTasks(tasks.filter(task => task.status === 'active'));
    }
  }, [statusFilter, tasks]);

  return (
    <section id="taskList" className="p-6 md:p-8">
      {/* Header with filter */}
      <div className="mb-6 flex justify-end">
        <div className="flex items-center bg-[#283862] rounded-lg p-1 border border-[#374a7c] shadow-sm">
          <FaFilter className="text-[#b6d07a] ml-2 mr-1" size={12} />
          <select
            id="statusFilter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-sm bg-transparent text-white py-1 pl-1 pr-6 rounded appearance-none focus:outline-none cursor-pointer"
            style={{ 
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23b6d07a'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 0.5rem center',
              backgroundSize: '1rem'
            }}
          >
            <option value="all" className="bg-[#1f2a4d] text-white">All Tasks</option>
            <option value="completed" className="bg-[#1f2a4d] text-white">Completed</option>
            <option value="active" className="bg-[#1f2a4d] text-white">Active</option>
          </select>
        </div>
      </div>

      {/* Tasks grid */}
      {loading ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <Loader />
        </div>
      ) : error ? (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 text-red-400 text-center">
          {error}
        </div>
      ) : filteredTasks.length === 0 ? (
        <div className="bg-[#283862] rounded-lg p-6 text-center text-white/70">
          No {statusFilter !== 'all' ? statusFilter : ''} tasks found.
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      )}
    </section>
  );
};

export default TasksList;