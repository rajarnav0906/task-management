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
    <div className="bg-[#1f2a4d] p-6 rounded-xl shadow-lg">
      {loading ? (
        <p>Loading stats...</p>
      ) : (
        <div className="text-white">
          <h2 className="text-xl font-semibold text-center text-[#b6d07a] mb-6">Task Statistics</h2>
          
          {/* Table Container */}
          <table className="w-full table-auto text-white">
            <thead>
              <tr className="border-b border-[#b6d07a]">
                <th className="py-2 px-4 text-left">Category</th>
                <th className="py-2 px-4 text-left">Count</th>
              </tr>
            </thead>
            <tbody>
              {/* Total Tasks */}
              <tr className="border-b border-[#b6d07a]">
                <td className="py-2 px-4">Total Tasks</td>
                <td className="py-2 px-4 text-center">{stats.totalTasks}</td>
              </tr>

              {/* Completed Tasks */}
              <tr className="border-b border-[#b6d07a]">
                <td className="py-2 px-4">Completed Tasks</td>
                <td className="py-2 px-4 text-center text-green-500">{stats.completedTasks}</td>
              </tr>

              {/* Pending Tasks */}
              <tr className="border-b border-[#b6d07a]">
                <td className="py-2 px-4">Active Tasks</td>
                <td className="py-2 px-4 text-center text-yellow-500">{stats.pendingTasks}</td>
              </tr>

              {/* High Priority Tasks */}
              <tr className="border-b border-[#b6d07a]">
                <td className="py-2 px-4">High Priority Tasks</td>
                <td className="py-2 px-4 text-center text-red-500">{stats.highPriorityTasks}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TaskStats;
