// MulakatAdmin.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QuestionListModal from './QuestionList.jsx';

const MulakatAdmin = () => {
  const navigate = useNavigate();
  const [modalGoster, setModalGoster] = useState(false);
  const [interviewList, setInterviewList] = useState([]);
  const [title, setTitle] = useState('');
  const [packageType, setPackageType] = useState('');
  const [expireDate, setExpireDate] = useState(null);
  const [canSkip, setCanSkip] = useState(false);
  const [showAtOnce, setShowAtOnce] = useState(false);
  const [questionListOpen, setQuestionListOpen] = useState(false);

  const totalCandidates = 6;
  const onHoldCandidates = 3;

  const handleSoruEkle = () => {
    setModalGoster(true);
  };

  const handleModalKapat = () => {
    setModalGoster(false);
  };

  const handleFormKaydet = () => {
    const newInterview = {
      title,
      packageType,
      expireDate,
      canSkip,
      showAtOnce,
      totalCandidates,
      onHoldCandidates,
    };

    setInterviewList([...interviewList, newInterview]);

    setTitle('');
    setPackageType('');
    setExpireDate(null);
    setCanSkip(false);
    setShowAtOnce(false);

    setModalGoster(false);
  };

  const handleInterviewDelete = (index) => {
    const updatedList = interviewList.filter((_, i) => i !== index);
    setInterviewList(updatedList);
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
            <a onClick={() => navigate('/manage-question-package')} className="text-gray-200 hover:text-white cursor-pointer">Manage Question Package</a>
          </li>
          <li>
            <a onClick={() => navigate('/interviewlist')} className="text-gray-200 hover:text-white cursor-pointer">Interview List</a>
          </li>
        </ul>
      </div>

      {/* Sağ İçerik Alanı */}
      <div className="w-4/5 bg-[#F9F9F9]">
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

        <div className="flex justify-between items-center px-8 py-4">
          <h2 className="text-2xl font-semibold text-[#002D3A]">Interview List</h2>
          <button onClick={handleSoruEkle} className="bg-[#004D61] text-white px-4 py-2 rounded-md hover:bg-[#003843] transition">
            +
          </button>
        </div>

        {/* Mülakat Listesi */}
        <div className="px-8 py-4">
          {interviewList.length > 0 ? (
            <ul className="grid grid-cols-3 gap-6">
              {interviewList.map((interview, index) => (
                <li
                  key={index}
                  className="p-6 border rounded bg-white shadow-md relative"
                  style={{ minHeight: '280px' }}>
                  <button
                    className="absolute top-2 left-2 text-gray-400 hover:text-gray-600"
                    onClick={() => setQuestionListOpen(true)}>
                    ?
                  </button>

                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold mt-4">{interview.title}</h3>
                    <div className="text-gray-500">
                      <button className="mr-2">Copy Link</button>
                      <button onClick={() => handleInterviewDelete(index)}>🗑️</button>
                    </div>
                  </div>
                  <div className="border p-2 rounded bg-gray-100 mb-4">
                    <h4 className="text-sm font-semibold mb-2">Candidates:</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-2 border rounded text-center">
                        <p className="font-semibold text-lg">{interview.totalCandidates}</p>
                        <p className="text-sm">TOTAL</p>
                      </div>
                      <div className="p-2 border rounded text-center">
                        <p className="font-semibold text-lg">{interview.onHoldCandidates}</p>
                        <p className="text-sm">ON HOLD</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>📅 Published</span>
                    <button
                      className="text-blue-500"
                      onClick={() => navigate(`/videocollection/${interview.packageType}`)}>
                      See Videos &gt;
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No interviews added yet.</p>
          )}
        </div>

        {/* Question List Modali */}
        <QuestionListModal isOpen={questionListOpen} onClose={() => setQuestionListOpen(false)} />

        {/* Mülakat Ekleme Modali */}
        {modalGoster && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
            <div className="bg-white p-6 rounded-md shadow-md w-1/3 relative">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Create Interview</h2>
                <button onClick={handleModalKapat} className="text-gray-500 absolute top-2 right-2">✖</button>
              </div>

              <div className="mb-4">
                <label className="block mb-2 font-semibold">Title</label>
                <input
                  className="w-full p-2 border rounded"
                  placeholder="Input..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2 font-semibold">Package</label>
                <select
                  className="w-full p-2 border rounded"
                  value={packageType}
                  onChange={(e) => setPackageType(e.target.value)}
                >
                  <option value="">Select Package</option>
                  <option value="Basic">Basic</option>
                  <option value="Pro">Pro</option>
                  <option value="Enterprise">Enterprise</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block mb-2 font-semibold">Expire Date</label>
                <input
                  type="date"
                  className="w-full p-2 border rounded"
                  value={expireDate || ''}
                  onChange={(e) => setExpireDate(e.target.value)}
                />
              </div>

              <div className="flex justify-between mb-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={canSkip}
                    onChange={(e) => setCanSkip(e.target.checked)}
                  />
                  <span className="ml-2">Can Skip</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={showAtOnce}
                    onChange={(e) => setShowAtOnce(e.target.checked)}
                  />
                  <span className="ml-2">Show At Once</span>
                </label>
              </div>

              <button
                className="bg-[#004D61] text-white px-4 py-2 rounded-md hover:bg-[#003843] transition"
                onClick={handleFormKaydet}>
                Save Interview
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MulakatAdmin;
