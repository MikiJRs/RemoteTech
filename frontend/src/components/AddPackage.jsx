import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useQuestionPackageStore from '../stores/questionPackageStore';

const AddPackage = () => {
  const navigate = useNavigate();
  const [packageName, setPackageName] = useState('');
  const [questions, setQuestions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newQuestion, setNewQuestion] = useState({ question: '', time: '' });
  const [errorMessage, setErrorMessage] = useState('');

  // Store'dan addPackage fonksiyonunu alıyoruz
  const { addPackage, loading } = useQuestionPackageStore();

  const handleAddQuestion = () => {
    setShowModal(true);
    setErrorMessage('');
  };

  const handleQuestionChange = (id, value) => {
    setQuestions(questions.map(q => q.id === id ? { ...q, question: value } : q));
  };

  const handleSaveQuestion = () => {
    if (!newQuestion.question.trim()) {
      setErrorMessage('Please enter a question.');
      return;
    }
    if (!newQuestion.time.trim()) {
      setErrorMessage('Please enter the question time.');
      return;
    }
    if (Number(newQuestion.time) <= 0) {
      setErrorMessage('Question time cannot be negative or zero.');
      return;
    }

    setQuestions([...questions, { id: questions.length + 1, question: newQuestion.question, time: newQuestion.time }]);
    setNewQuestion({ question: '', time: '' });
    setShowModal(false);
    setErrorMessage('');
  };

  const handleSave = async () => {
    if (!packageName.trim()) {
      setErrorMessage('Please enter the package name.');
      return;
    }

    if (questions.length === 0) {
      setErrorMessage('You must include at least one question.');
      return;
    }

    // Kontrol: Her sorunun bir `questionText` alanına sahip olduğundan emin ol
    const invalidQuestions = questions.some(q => !q.question.trim());
    if (invalidQuestions) {
      setErrorMessage('Please make sure that all questions are filled.');
      return;
    }

    try {
      // Backend'e paketi kaydediyoruz
      await addPackage({ packageName: packageName.trim(), questions: questions.map(q => ({ questionText: q.question.trim(), time: q.time })) });
      navigate('/manage-question-package');
    } catch (err) {
      console.error('Package could not be saved:', err);
    }
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
            <a onClick={() => navigate('/manage-question-package')} className="text-gray-200 hover:text-white">Manage Question Package</a>
          </li>
          <li>
            <a onClick={() => navigate('/interviewlist')} className="text-gray-200 hover:text-white cursor-pointer">Interview List</a>
          </li>
        </ul>
      </div>

      {/* Sağ İçerik Alanı */}
      <div className="w-4/5 bg-[#F9F9F9]">
        {/* Üst kısım - Remote-tech Admin Page ve Çıkış Butonu */}
        <div className="flex justify-between items-center p-3 border-b border-gray-300">
          <h1 className="text-xl font-semibold text-[#002D3A]">Remote-tech Admin Page</h1>
          <div className="flex items-center">
            <button
              className="bg-[#004D61] text-white px-3 py-2 rounded-md hover:bg-[#003843] transition"
              onClick={() => navigate('/login')}
            >
              Logout
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
              className="flex-grow p-2 border rounded-md mr-2"
            />
            <button onClick={handleAddQuestion} className="bg-[#004D61] text-white px-4 py-2 rounded-md hover:bg-[#003843] transition">Add Question</button>
          </div>

          {/* Soru Listesi */}
          <div className="bg-gray-100 p-4 rounded-lg mb-4">
    <div className="grid grid-cols-12 gap-2 font-semibold text-gray-700 mb-4 border-b pb-2">
        <span className="col-span-1">Order No</span>
        <span className="col-span-8">Question Content</span>
        <span className="col-span-2">Time</span>
        <span className="col-span-1 text-center">Action</span>
    </div>

    {questions.map((q, index) => (
        <div key={q.id ? q.id : `question-${index}`} className="grid grid-cols-12 gap-2 items-center bg-white p-4 mb-2 rounded-lg shadow-md">
            {/* Order No */}
            <span className="col-span-1">{index + 1}</span>

            {/* Question Content */}
            <input
                type="text"
                value={q.question}
                onChange={(e) => handleQuestionChange(q.id, e.target.value)}
                className="col-span-8 p-2 border rounded"
                placeholder="Enter your question here"
            />

            {/* Time */}
            <input
                type="number"
                value={q.time}
                onChange={(e) => setQuestions(questions.map((question, i) => i === index ? { ...question, time: e.target.value } : question))}
                className="col-span-2 p-2 border rounded"
                placeholder="Time (minutes)"
                min="1"
                required
            />

            {/* Action - Delete Button */}
            <div className="col-span-1 flex justify-end items-center">
                <button
                    onClick={() => setQuestions(questions.filter(question => question.id !== q.id))}
                    className="bg-gray-300 hover:bg-red-600 text-white p-2 rounded transition-colors duration-200"
                >
                    🗑️
                </button>
            </div>
        </div>
    ))}
</div>





          {/* Hata Mesajı */}
          {errorMessage && (
            <div className="text-red-500 text-sm mb-4">{errorMessage}</div>
          )}

          {/* Soru Ekleme ve Kaydetme Butonları */}
          <div className="flex justify-between">
            <button className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition" onClick={() => navigate('/manage-question-package')}>Cancel</button>
            <button onClick={handleSave} className="bg-[#004D61] text-white p-2 w-24 rounded">
              {loading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>
      </div>

      {/* Soru Ekleme Modalı */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md shadow-md w-1/4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Add Question</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-500">✖</button>
            </div>
            <div className="mb-4">
              <label className="block mb-2 font-semibold">Question</label>
              <textarea
                value={newQuestion.question}
                onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })}
                className="w-full p-2 border rounded"
                placeholder="Input..."
              />
            </div>

            {/* Hata Mesajı */}
            {errorMessage && (
              <div className="text-red-500 text-sm mb-4">{errorMessage}</div>
            )}

            <div className="flex items-center mb-2 bg-gray-100 p-2 rounded-lg">
              <div className="flex items-center border rounded-lg mr-auto">
                <input
                  type="number"
                  value={newQuestion.time}
                  onChange={(e) => setNewQuestion({ ...newQuestion, time: e.target.value })}
                  className="w-16 p-2 border-r rounded-l"
                />
                <span className="p-2">min</span>
              </div>
              <div className="ml-auto">
                <button onClick={handleSaveQuestion} className="bg-[#004D61] text-white p-2 rounded">Add</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddPackage;
