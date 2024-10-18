import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useQuestionPackageStore from '../stores/questionPackageStore';

const AdminPage = () => {
    const navigate = useNavigate();

    // Zustand store'dan verileri ve fonksiyonları al
    const { questionPackages, fetchPackages, deletePackage, updatePackage } = useQuestionPackageStore();

    // Bileşen yüklendiğinde (mount) verileri çek
    useEffect(() => {
        fetchPackages();
    }, [fetchPackages]);

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
                        <span className="mr-4 text-gray-700">Username</span>
                        <button className="bg-[#004D61] text-white px-3 py-2 rounded-md hover:bg-[#003843] transition">Exit</button>
                    </div>
                </div>

                <div className="p-8">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold text-[#002D3A]">Manage Question Package</h1>
                        <button onClick={() => navigate('/manage-question-package/add-package')} className="bg-[#004D61] text-white p-3 rounded">+</button>
                    </div>

                    {/* Paket Listesi */}
                    <div className="mt-4">
                    {questionPackages.map((pkg) => (
                            <div key={pkg.id} className="flex justify-between items-center bg-white p-4 mb-2 rounded-lg shadow-md">
                                <span className="text-[#002D3A] font-semibold">{pkg.id}</span>
                                <span className="text-[#002D3A] font-semibold">{pkg.name}</span>
                                <span className="text-[#002D3A] font-semibold">{pkg.questionCount}</span>
                                <div className="flex gap-2">
                                    <button className="bg-[#004D61] text-white p-2 rounded hover:bg-[#003843]">✏️</button>
                                    <button className="bg-[#B0BEC5] text-white p-2 rounded hover:bg-[#90A4AE]">🗑️</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPage;

