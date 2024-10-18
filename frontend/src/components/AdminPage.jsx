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

                <div className="p-8">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold">Manage Question Package</h1>
                        <button onClick={() => navigate('/manage-question-package/add-package')} className="bg-gray-300 p-3 rounded">+</button>
                    </div>

                    {/* Paket Listesi */}
                    <div className="mt-4">
                        {questionPackages.map((pkg) => (
                            <div key={pkg._id} className="flex justify-between items-center bg-gray-50 p-4 mb-2 rounded-lg shadow">
                                <span>{pkg._id}</span>
                                <span>{pkg.packageName}</span>
                                <span>{pkg.questions.length} questions</span>
                                <div className="flex gap-2">
                                    <button
                                        className="bg-blue-500 text-white p-2 rounded"
                                        onClick={() => updatePackage(pkg._id, { packageName: `${pkg.packageName} (Güncellendi)` })}
                                    >
                                        ✏️
                                    </button>
                                    <button
                                        className="bg-red-500 text-white p-2 rounded"
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

export default AdminPage;
