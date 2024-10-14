import React, { useState } from 'react';

const AddPackage = () => {
  const [packageName, setPackageName] = useState('');
  const [questions, setQuestions] = useState([
    { id: 1, question: '', time: '2 min' }
  ]);

  const handleAddQuestion = () => {
    setQuestions([...questions, { id: questions.length + 1, question: '', time: '2 min' }]);
  };

  const handleQuestionChange = (id, value) => {
    setQuestions(questions.map(q => q.id === id ? { ...q, question: value } : q));
  };

  const handleSave = () => {
    // Paket kaydetme işlemi burada yapılacak (backend'e gönderme vb.)
    console.log('Package saved:', { packageName, questions });
  };

  return (
    <div className="flex h-screen">
      {/* Sol Menü */}
      <div className="w-1/5 bg-gray-200 p-6">
        <h2 className="text-2xl font-bold mb-10 text-center">Admin Panel</h2>
        <h3 className="text-xl font-semibold mb-2">Menu</h3>
        <hr className="border-t-2 border-gray-300 mb-6" />
        <ul>
          <li className="mb-4">
            <a href="#" className="text-gray-700">Manage Question Package</a>
          </li>
          <li>
            <a href="#" className="text-gray-700">Interview List</a>
          </li>
        </ul>
      </div>

      {/* Sağ İçerik Alanı */}
      <div className="w-4/5 bg-white">
        {/* Üst kısım - Remote-tech Admin Page ve Çıkış Butonu */}
        <div className="flex justify-between items-center p-3 border-b border-gray-300">
          <h1 className="text-xl font-semibold">Remote-tech Admin Page</h1>
          <div className="flex items-center">
            <span className="mr-4 text-gray-700">Username</span>
            <button className="bg-gray-800 text-white px-3 py-2 rounded-md hover:bg-gray-700 transition">
              Exit
            </button>
          </div>
        </div>

        {/* İçerik Alanı */}
        <div className="p-8">
          {/* Paket Başlığı ve Soru Ekleme Butonu */}
          <div className="flex items-center mb-6">
            <input
              type="text"
              placeholder="Package Title..."
              value={packageName}
              onChange={(e) => setPackageName(e.target.value)}
              className="flex-grow p-3 border rounded-md mr-2"
            />
            <button onClick={handleAddQuestion} className="bg-gray-300 p-3 rounded">+</button>
          </div>

          {/* Soru Listesi */}
          <div className="bg-gray-100 p-4 rounded-lg mb-4">
            <div className="flex justify-between mb-2">
              <span>Order</span>
              <span>Question</span>
              <span>Time</span>
              <span>Action</span>
            </div>

            {questions.map((q, index) => (
              <div key={q.id} className="flex justify-between items-center bg-gray-50 p-4 mb-2 rounded-lg shadow">
                <span>{index + 1}</span>
                <input
                  type="text"
                  value={q.question}
                  onChange={(e) => handleQuestionChange(q.id, e.target.value)}
                  className="flex-1 p-2 border rounded"
                  placeholder="Enter your question here"
                />
                <span>{q.time}</span>
                <button onClick={() => setQuestions(questions.filter(question => question.id !== q.id))} className="text-red-500">
                  🗑️
                </button>
              </div>
            ))}
          </div>

          {/* Soru Ekleme ve Kaydetme Butonları */}
          <div className="flex justify-end">
            <button className="bg-gray-400 p-2 rounded mr-2">Cancel</button>
            <button onClick={handleSave} className="bg-blue-500 text-white p-2 rounded">Save</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPackage;
