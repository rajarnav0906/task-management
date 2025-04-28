import React, { useState } from 'react';
import axios from 'axios';
import Loader from './Loader';
import { useNavigate } from 'react-router-dom';

const TaskCard = ({ task }) => {
  const [loading, setLoading] = useState(false);
  const [updatedAt, setUpdatedAt] = useState(task.createdAt);
  const navigate = useNavigate();

  // Function to format date to a readable string
  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(date).toLocaleDateString('en-US', options);
  };

  const handleDelete = async (taskId) => {
    setLoading(true);

    try {
      const response = await axios.delete(`http://localhost:8001/api/v1/delete-task/${taskId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.status === 200) {
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
      alert('Failed to delete task. Please try again.');
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (taskId, currentStatus) => {
    const newStatus = currentStatus === 'completed' ? 'active' : 'completed';
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
        setUpdatedAt(new Date());
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
      alert('Error updating task status');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#1f2a4d] rounded-lg overflow-hidden shadow-xl border border-[#2d3c66] hover:shadow-2xl transition-all">
      {/* Header Section with Title */}
      <div className="bg-[#283862] py-3 px-6 border-b border-[#374a7c]">
        <h3 className="text-xl font-bold text-[#b6d07a] uppercase">{task.title}</h3>
      </div>
      
      {/* Body Section */}
      <div className="p-5">
        {/* Description */}
        <div className="mb-4">
          <p className="text-white/90 text-base">{task.description}</p>
        </div>
        
        {/* Tags/Status Section */}
        <div className="flex flex-wrap gap-3 mb-4">
          <span
            className={`px-4 py-1 rounded-full text-sm font-medium ${
              task.status === 'completed' ? 'bg-green-500/90 text-white' : 'bg-yellow-500/90 text-white'
            }`}
          >
            {task.status}
          </span>

          <span
            className={`px-4 py-1 rounded-full text-sm font-medium ${
              task.priority === 'high' ? 'bg-red-500/90 text-white' : 
              task.priority === 'medium' ? 'bg-yellow-500/90 text-white' : 
              'bg-green-500/90 text-white'
            }`}
          >
            {task.priority}
          </span>
        </div>
        
        {/* Metadata Section */}
        <div className="border-t border-[#374a7c] pt-3 mb-4">
          <p className="text-white/70 text-xs">
            {task.status === 'completed' ? 'Completed on' : 'Created on'}: {formatDate(updatedAt)}
          </p>
        </div>
      </div>
      
      {/* Footer/Actions Section */}
      <div className="bg-[#283862] px-6 py-3 flex justify-end gap-3 border-t border-[#374a7c]">
        {loading ? (
          <div className="flex justify-center w-full">
            <Loader />
          </div>
        ) : (
          <>
            <button
              onClick={() => handleUpdateStatus(task._id, task.status)}
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded transition-all"
            >
              {task.status === 'completed' ? 'Mark Active' : 'Mark Complete'}
            </button>
            <button
              onClick={() => handleDelete(task._id)}
              className="bg-red-600/90 hover:bg-red-700 text-white text-sm font-medium py-2 px-4 rounded transition-all"
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