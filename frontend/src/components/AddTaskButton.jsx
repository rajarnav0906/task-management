import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AddTaskButton() {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('active');
  const [priority, setPriority] = useState('Medium');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token); // set true if token exists
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const token = localStorage.getItem('token');

      if (!token) {
        setMessage('User not authenticated. Please log in.');
        setLoading(false);
        return;
      }

      const response = await axios.post(
        "http://localhost:8001/api/v1/add-task",
        { title, description, status, priority },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        setMessage('✅ Task added successfully!');
        setTitle('');
        setDescription('');
        setStatus('active');
        setPriority('Medium');
        setShowForm(false);
      }
    } catch (error) {
      console.error(error);
      setMessage('❌ Failed to add task. Try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isLoggedIn) {
    // If user is not logged in, don't render anything
    return null;
  }

  return (
    <div>
      {/* Button to trigger modal */}
      {!showForm ? (
        <button
          onClick={() => setShowForm(true)}
          className="px-8 py-4 bg-[#6552D0] rounded-xl text-lg font-semibold hover:scale-105 hover:bg-[#7e6df1] transition-all duration-300"
        >
          + Add New Task
        </button>
      ) : (
        // Modal Background
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          {/* Modal Content */}
          <form
            onSubmit={handleSubmit}
            className="bg-[#1e294f] p-6 rounded-lg w-full sm:w-[500px] max-w-lg shadow-lg"
          >
            <h2 className="text-2xl font-bold mb-6 text-center text-[#b6d07a]">Create a New Task</h2>

            {/* Title */}
            <div className="mb-4">
              <label className="block mb-1 text-white">Title<span className="text-red-500">*</span></label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-3 rounded-lg bg-[#2c355b] text-white outline-none"
                placeholder="Enter task title"
                required
              />
            </div>

            {/* Description */}
            <div className="mb-4">
              <label className="block mb-1 text-white">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-3 rounded-lg bg-[#2c355b] text-white outline-none"
                rows="4"
                placeholder="Enter task description (optional)"
              ></textarea>
            </div>

            {/* Status */}
            <div className="mb-4">
              <label className="block mb-1 text-white">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full p-3 rounded-lg bg-[#2c355b] text-white outline-none"
                required
              >
                <option value="active">Active</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            {/* Priority */}
            <div className="mb-6">
              <label className="block mb-1 text-white">Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full p-3 rounded-lg bg-[#2c355b] text-white outline-none"
                required
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#6552D0] rounded-lg font-semibold hover:scale-105 transition-all duration-300 disabled:opacity-50"
            >
              {loading ? "Adding..." : "Add Task"}
            </button>

            {/* Cancel Button */}
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="mt-4 text-sm underline text-gray-400 hover:text-white"
            >
              Cancel
            </button>

            {/* Message */}
            {message && <p className="mt-4 text-center text-white">{message}</p>}
          </form>
        </div>
      )}
    </div>
  );
}

export default AddTaskButton;
