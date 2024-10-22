import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useQuestionPackageStore from '../stores/questionPackageStore';

const EditManageQuestionPackage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { questionPackages, updatePackage } = useQuestionPackageStore();

    // Local state for form data
    const [packageData, setPackageData] = useState({
        packageName: '',
        questions: [],
    });

    // useEffect to fetch the selected package data when the component mounts
    useEffect(() => {
        const selectedPackage = questionPackages.find(pkg => pkg._id === id);
        if (selectedPackage) {
            setPackageData({
                packageName: selectedPackage.packageName,
                questions: selectedPackage.questions,
            });
        }
    }, [id, questionPackages]);

    // Handle input changes for package name
    const handleInputChange = (e) => {
        setPackageData({
            ...packageData,
            [e.target.name]: e.target.value,
        });
    };

    // Handle questions update (could be enhanced later to allow full CRUD on questions)
    const handleQuestionsChange = (e, index) => {
        const updatedQuestions = [...packageData.questions];
        updatedQuestions[index].questionText = e.target.value; // Burada questionText özelliği güncelleniyor
        setPackageData({
            ...packageData,
            questions: updatedQuestions,
        });
    };

    // Handle form submission to update the package
    const handleSubmit = (e) => {
        e.preventDefault();
        updatePackage(id, packageData);
        navigate('/manage-question-package'); // Navigate back after update
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

                {/* Form düzenleme kısmı */}
                <div className="p-8">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-2xl font-semibold text-[#002D3A]">Edit Question Package</h2>
                        <button
                            type="button"
                            className="bg-[#004D61] text-white px-4 py-2 rounded-md hover:bg-[#003843] transition"
                            onClick={() => {
                                setPackageData((prevData) => ({
                                    ...prevData,
                                    questions: [...prevData.questions, { questionText: '' }]
                                }));
                            }}
                        >
                            Add Question
                        </button>
                    </div>


                    <div className="bg-gray-100 p-6 rounded-lg mb-6 shadow-md">
                        <form onSubmit={handleSubmit}>
                            <label className="grid grid-cols-4 gap-4 font-semibold text-gray-700 mb-4 border-b pb-2" htmlFor="packageName">
                                Package Title
                            </label>

                            <input
                                type="text"
                                id="packageName"
                                name="packageName"
                                value={packageData.packageName}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded mb-4"
                                required
                            />

                            <div className="mb-4">
                                <label className="grid grid-cols-4 gap-4 font-semibold text-gray-700 mb-4 border-b pb-2">
                                    Questions
                                </label>
                                {packageData.questions.map((question, index) => (
                                    <div key={index} className="flex items-center mb-2">
                                        <input
                                            type="text"
                                            value={question.questionText} // Sadece questionText özelliğini gösteriyoruz
                                            onChange={(e) => handleQuestionsChange(e, index)}
                                            className="flex-grow px-3 py-2 border border-gray-300 rounded mr-2"
                                            required
                                        />
                                        <button
                                            className="bg-gray-300 hover:bg-red-600 text-white p-2 rounded transition-colors duration-200"
                                            onClick={() => {
                                                const updatedQuestions = packageData.questions.filter((_, i) => i !== index);
                                                setPackageData({ ...packageData, questions: updatedQuestions });
                                            }}
                                        >
                                            🗑️
                                        </button>
                                    </div>
                                ))}

                            </div>

                            <div className="flex justify-end gap-4">
                                <button
                                    type="button"
                                    className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition"
                                    onClick={() => navigate('/manage-question-package')}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-gray-300 px-4 py-2 rounded hover:bg-blue-600 transition"
                                >
                                    Update Package
                                </button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    );


};

export default EditManageQuestionPackage;
