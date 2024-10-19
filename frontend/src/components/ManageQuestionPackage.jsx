import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useQuestionPackageStore from '../stores/questionPackageStore';

const ManageQuestionPackage = () => {
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
                    <h1 className="text-xl font-semibold">Remote-tech Admin Page</h1>
                    <div className="flex items-center">
                        <button
                            className="bg-[#004D61] text-white px-3 py-2 rounded-md hover:bg-[#003843] transition"
                            onClick={() => navigate('/login')}
                        >
                            Logout
                        </button>

                    </div>
                </div>

                <div className="p-8">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-2xl font-semibold text-[#002D3A]">Manage Question Package</h2>
                        <button onClick={() => navigate('/manage-question-package/add-package')} className="bg-[#004D61] text-white px-4 py-2 rounded-md hover:bg-[#003843] transition">+</button>
                    </div>

                    {/* Paket Listesi */}
                    <div className="bg-gray-100 p-4 rounded-lg mb-4">
                        
                        <div className="flex justify-between mb-2">
                            <span>Order</span>
                            <span>Package</span>
                            <span>Time</span>
                            <span>Action</span>
                        </div>
                        {questionPackages.map((pkg, index) => (
                            <div key={pkg._id} className="flex justify-between items-center bg-gray-50 p-4 mb-2 rounded-lg shadow">
                                <span>{index + 1}</span>
                                <span>{pkg.packageName}</span>
                                <span>{pkg.questions.length} questions</span>
                                <div className="flex gap-2">
                                    <button
                                        className="bg-gray-300 text-white p-2 rounded"
                                        onClick={() => updatePackage(pkg._id, { packageName: `${pkg.packageName} (Güncellendi)` })}
                                    >
                                        🖊️
                                    </button>
                                    <button
                                        className="bg-gray-300 text-white p-2 rounded"
                                        onClick={() => deletePackage(pkg._id)}
                                    >
                                        🗑️
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageQuestionPackage;
