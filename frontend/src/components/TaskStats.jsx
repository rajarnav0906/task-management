import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaskStats = () => {
  const [stats, setStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
    highPriorityTasks: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('http://localhost:8001/api/v1/get-task-stats', {
          headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        setStats(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching task stats', error);
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="bg-[#1f2a4d] p-8 rounded-xl shadow-lg">
      {loading ? (
        <p>Loading stats...</p>
      ) : (
        <div className="text-white">
          <h2 className="text-xl font-bold text-center text-[#b6d07a] mb-4">Task Statistics</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="stat-item">
              <p className="text-lg">Total Tasks</p>
              <h3 className="text-2xl font-bold">{stats.totalTasks}</h3>
            </div>
            <div className="stat-item">
              <p className="text-lg">Completed Tasks</p>
              <h3 className="text-2xl font-bold text-green-500">{stats.completedTasks}</h3>
            </div>
            <div className="stat-item">
              <p className="text-lg">Active Tasks</p>
              <h3 className="text-2xl font-bold text-yellow-500">{stats.pendingTasks}</h3>
            </div>
            <div className="stat-item">
              <p className="text-lg">High Priority Tasks</p>
              <h3 className="text-2xl font-bold text-red-500">{stats.highPriorityTasks}</h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskStats;
