import React from 'react';

// A simple array of random avatar URLs (you can replace these with better ones later)
const avatarUrls = [
  "https://i.pravatar.cc/150?img=1",
  "https://i.pravatar.cc/150?img=2",
  "https://i.pravatar.cc/150?img=3",
  "https://i.pravatar.cc/150?img=4",
  "https://i.pravatar.cc/150?img=5",
];

const TaskCard = ({ task, onDelete, onUpdateStatus }) => {
  const randomAvatar = avatarUrls[Math.floor(Math.random() * avatarUrls.length)];

  return (
    <div className="bg-[#1f2a4d] rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all flex flex-col space-y-3">
      {/* Avatar */}
      <div className="flex justify-center">
        <img src={randomAvatar} alt="Avatar" className="w-15 h-15 rounded-full border-4 border-[#b6d07a] object-cover" />
      </div>

      {/* Title */}
      <h3 className="text-1.5xl font-bold text-center text-[#b6d07a]">{task.title}</h3>

      {/* Description */}
      <p className="text-white/80 text-lg text-center">{task.description}</p>

      {/* Status and Priority */}
      <div className="flex justify-center space-x-6">
        <span
          className={`px-5 py-2 rounded-full text-md font-semibold ${
            task.status === 'completed' ? 'bg-green-500 text-white' : 'bg-yellow-500 text-white'
          }`}
        >
          {task.status}
        </span>

        <span
          className={`px-5 py-2 rounded-full text-md font-semibold ${
            task.priority === 'high' ? 'bg-red-500 text-white' :
            task.priority === 'medium' ? 'bg-yellow-500 text-white' :
            'bg-green-500 text-white'
          }`}
        >
          {task.priority}
        </span>
      </div>

      {/* Buttons */}
      <div className="flex justify-center space-x-8 mt-6">
        <button
          onClick={() => onUpdateStatus(task.id)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full transition-all"
        >
          Toggle Status
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-full transition-all"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
