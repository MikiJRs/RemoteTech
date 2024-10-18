import React from 'react';

const QuestionListModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg relative animate-fade-in">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Question List</h2>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-gray-600 transition duration-200 focus:outline-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-4">
          {[
            "What is caching?", 
            "What is Big-O notation?", 
            "Can you explain JWT concept?", 
            "What do you expect from this position?"
          ].map((question, index) => (
            <div key={index} className="flex justify-between items-center p-4 bg-gray-50 rounded-md shadow-sm hover:shadow-md transition duration-200">
              <span className="text-gray-700 font-medium">{question}</span>
              <span className="text-sm text-gray-500">2 min</span>
            </div>
          ))}
        </div>

        <div className="mt-6 text-right">
          <button 
            onClick={onClose} 
            className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none transition duration-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionListModal;
