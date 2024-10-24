import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import QuestionListModal from './QuestionList.jsx';
import useInterviewStore from '../stores/interviewStore'; // Store'u import ettik
import useQuestionPackageStore from '../stores/questionPackageStore'; // Paketleri çekmek için store'u import ettik
import axios from 'axios'; // Axios'u ekledik

const InterviewList = () => {
  const navigate = useNavigate();
  const [modalGoster, setModalGoster] = useState(false);
  const [title, setTitle] = useState('');
  const [selectedPackages, setSelectedPackages] = useState([]); // Birden fazla paket için dizi
  const [expireDate, setExpireDate] = useState(null);
  const [canSkip, setCanSkip] = useState(false);
  const [showAtOnce, setShowAtOnce] = useState(false);
  const [questionListOpen, setQuestionListOpen] = useState(false);

  // Zustand store'dan gerekli fonksiyonları ve verileri alıyoruz
  const { interviewList, fetchInterviews, deleteInterview } = useInterviewStore();
  const { questionPackages, fetchPackages } = useQuestionPackageStore(); // Paketleri çekmek için gerekli fonksiyonlar

  useEffect(() => {
    // Component yüklendiğinde mülakat listesini getir
    fetchInterviews();
    // Component yüklendiğinde paket listesini getir
    fetchPackages();
  }, [fetchInterviews, fetchPackages]);

  const handleSoruEkle = () => {
    setModalGoster(true);
  };

  const handleModalKapat = () => {
    setModalGoster(false);
  };

  const handlePackageChange = (pkgId) => {
    // Eğer paket zaten seçildiyse çıkar, değilse ekle
    if (selectedPackages.includes(pkgId)) {
      setSelectedPackages(selectedPackages.filter(id => id !== pkgId));
    } else {
      setSelectedPackages([...selectedPackages, pkgId]);
    }
  };

  const handleFormKaydet = async () => {
    const newInterview = {
      interviewTitle: title,
      extraQuestions: [
        { question: "What is your name?", time: 30 },
        { question: "What is your age?", time: 15 }
      ],
      expireDate: expireDate,
      // Backend ile uyumlu nesne formatında packageIds gönderiyoruz
      packageIds: selectedPackages.map(packageId => ({ packageId }))
    };

    try {
      // Axios ile POST isteği yap
      const response = await axios.post('http://localhost:5555/api/interviews', newInterview, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      console.log('Interview created successfully:', response.data);
      
      // Başarıyla oluşturulursa modalı kapat ve formu temizle
      setModalGoster(false);
      setTitle('');
      setSelectedPackages([]); // Paket seçimlerini temizle
      setExpireDate(null);
      setCanSkip(false);
      setShowAtOnce(false);

      // Yeni listeyi getir
      fetchInterviews();
    } catch (error) {
      console.error('Failed to create interview:', error.response ? error.response.data : error.message);
    }
  };

  const handleInterviewDelete = (id) => {
    // Mülakatı zustand üzerinden siliyoruz
    deleteInterview(id);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Tarihi daha okunabilir formatta göster
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
            Create Interview
          </button>
        </div>

        {/* Mülakat Listesi */}
        <div className="px-8 py-4">
          {interviewList.length > 0 ? (
            <ul className="grid grid-cols-3 gap-6">
              {interviewList.map((interview, index) => (
                <li
                  key={interview._id}
                  className="p-6 border rounded bg-white shadow-md relative"
                  style={{ minHeight: '280px' }}>
                  <button
                    className="absolute top-2 left-2 text-gray-400 hover:text-gray-600"
                    onClick={() => setQuestionListOpen(true)}>
                    ❔
                  </button>

                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold mt-4">{interview.interviewTitle}</h3>
                    <div className="text-gray-500">
                      <button className="mr-2">Copy Link</button>
                      <button onClick={() => handleInterviewDelete(interview._id)}>🗑️</button>
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
                    <span>📅 To be published until {formatDate(interview.expireDate)}</span>
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
                <label className="block mb-2 font-semibold">Select Packages</label>
                <div className="grid grid-cols-2 gap-4">
                  {questionPackages.map((pkg) => (
                    <div key={pkg._id} className="flex items-center">
                      <input
                        type="checkbox"
                        id={pkg._id}
                        value={pkg._id}
                        checked={selectedPackages.includes(pkg._id)}
                        onChange={() => handlePackageChange(pkg._id)}
                      />
                      <label htmlFor={pkg._id} className="ml-2">{pkg.packageName}</label>
                    </div>
                  ))}
                </div>
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

export default InterviewList;
