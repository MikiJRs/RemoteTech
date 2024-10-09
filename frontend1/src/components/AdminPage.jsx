import React, { useState } from 'react';

const AdminPage = () => {
    const [packages, setPackages] = useState([
        { id: 1, name: 'Backend Question Package', questionCount: 10 },
        { id: 2, name: 'Frontend Question Package', questionCount: 8 },
        { id: 3, name: 'Fullstack Question Package', questionCount: 5 },
        { id: 4, name: 'Devops Question Package', questionCount: 7 },
    ]);

    return (
        <div className="flex h-screen">
            {/* Sol Menü */}
            <div className="w-1/5 bg-gray-200 p-6">
                <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
                <h3 className="text-xl* font-semibold mb-2">Menu</h3>
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
                        <button className="bg-gray-300 p-2 rounded">+</button>
                    </div>

                    {/* Tablo Başlığı */}
                    <div className="grid grid-cols-4 bg-gray-100 p-4 rounded-lg">
                        <div>#</div>
                        <div>Package Name</div>
                        <div>Question Count</div>
                        <div>Action</div>
                    </div>

                    {/* Paket Listesi */}
                    <div className="mt-4">
                        {packages.map((pkg) => (
                            <div key={pkg.id} className="flex justify-between items-center bg-gray-50 p-4 mb-2 rounded-lg shadow">
                                <span>{pkg.id}</span>
                                <span>{pkg.name}</span>
                                <span>{pkg.questionCount}</span>
                                <div className="flex gap-2">
                                    <button className="bg-blue-500 text-white p-2 rounded">✏️</button>
                                    <button className="bg-red-500 text-white p-2 rounded">🗑️</button>
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
