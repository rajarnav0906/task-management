import React, { useState } from 'react';
import axios from 'axios';
import Loader from './Loader';
import { useNavigate } from 'react-router-dom';

const TaskCard = ({ task }) => {
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleDelete = async (taskId) => {
    setLoading(true);
  
    try {
      const response = await axios.delete(`http://localhost:8001/api/v1/delete-task/${taskId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      
      if (response.status === 200) {
        window.location.reload(); // Reload to fetch fresh data
      }
    } catch (error) {
      console.error(error);
      alert('Failed to delete task. Please try again.');
      setLoading(false);
    }
  };
  
  const handleUpdateStatus = async (taskId, currentStatus) => {
    const newStatus = currentStatus === 'completed' ? 'active' : 'completed';  // Toggle status
    setLoading(true);
  
    try {
      const response = await axios.put(
        `http://localhost:8001/api/v1/update-task/${taskId}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
  
      if (response.status === 200) {
        window.location.reload(); // Reload to fetch fresh data
      }
    } catch (error) {
      console.error(error);
      alert('Error updating task status');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#1f2a4d] rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all flex flex-col space-y-3">
      <h3 className="text-1.5xl font-bold text-center text-[#b6d07a]">{task.title}</h3>
      <p className="text-white/80 text-lg text-center">{task.description}</p>

      <div className="flex justify-center space-x-6">
        <span
          className={`px-5 py-2 rounded-full text-md font-semibold ${task.status === 'completed' ? 'bg-green-500 text-white' : 'bg-yellow-500 text-white'}`}
        >
          {task.status}
        </span>

        <span
          className={`px-5 py-2 rounded-full text-md font-semibold ${task.priority === 'high' ? 'bg-red-500 text-white' : task.priority === 'medium' ? 'bg-yellow-500 text-white' : 'bg-green-500 text-white'}`}
        >
          {task.priority}
        </span>
      </div>

      <div className="flex justify-center space-x-8 mt-6">
        {loading ? (
          <Loader />
        ) : (
          <>
            <button
              onClick={() => handleUpdateStatus(task._id, task.status)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-full transition-all"
            >
              Toggle Status
            </button>
            <button
              onClick={() => handleDelete(task._id)}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-full transition-all"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
