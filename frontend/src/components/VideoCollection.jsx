import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const VideoCollection = () => {
  const { interviewType } = useParams();
  const navigate = useNavigate(); // Initialize navigate for navigation
  const candidates = []; // Burada adayların listesini doldurun

  // Add a function to handle navigation
  const handleNavigate = () => {
    navigate('/'); // Navigate back to the admin panel or a specific route
  };

  return (
    <div className="flex h-screen">
      {/* Sol Menü */}
      <div className="w-1/5 bg-[#002D3A] p-6">
        <h2 className="text-2xl font-bold mb-10 text-center text-white">Admin Panel</h2>
        <h3 className="text-xl font-semibold mb-2 text-white">Menu</h3>
        <hr className="border-t-2 border-gray-300 mb-6" />
        <ul>
          <li className="mb-4">
            <a 
              onClick={() => navigate('/manage-question-package')} 
              className="text-gray-200 hover:text-white cursor-pointer">Manage Question Package
            </a>
          </li>
          <li>
            <a 
              onClick={() => navigate('/interviewlist')} 
              className="text-gray-200 hover:text-white cursor-pointer">Interview List
            </a>
          </li>
        </ul>
      </div>

      {/* Sağ İçerik */}
      <div className="w-4/5 bg-[#F9F9F9]">
        <div className="flex justify-between items-center p-3 border-b border-gray-300">
          <h1 className="text-xl font-semibold text-[#002D3A]">{interviewType} Video Collection</h1>
          <button 
            onClick={handleNavigate} 
            className="bg-[#004D61] text-white px-4 py-2 rounded-md hover:bg-[#003843] transition">
            Back to Admin
          </button>
        </div>

        <div className="p-8 grid grid-cols-3 gap-4">
          {candidates.map((candidate, index) => (
            <div key={index} className="p-4 border rounded-lg shadow-md bg-white">
              <h2 className="text-lg font-semibold mb-2 text-[#002D3A]">{candidate}</h2>
              <div className="bg-gray-200 p-6 rounded-lg">
                <i className="fas fa-play-circle text-3xl text-gray-500"></i>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end p-4">
          <button className="bg-[#004D61] text-white px-4 py-2 rounded-md hover:bg-[#003843] transition">Save</button>
        </div>
      </div>
    </div>
  );
};

export default VideoCollection;
