import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // useNavigate hook'u kullanarak yönlendirme işlemi yapacağız

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Backend'e login bilgilerini gönderiyoruz
      const response = await fetch('http://localhost:5555/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: email, password }), // Backend'e email ve password gönderiyoruz
        credentials: 'include', // Cookie'yi dahil etmek için
      });

      if (response.ok) {
        console.log('Login successful');
        navigate('/manage-question-package'); // Giriş başarılıysa /admin rotasına yönlendir
      } else {
        console.log('Login failed');
        setErrorMessage('Invalid email or password'); // Giriş başarısızsa hata mesajını göster
      }
    } catch (error) {
      console.error('Error during login:', error);
      setErrorMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-b from-[#f0f0f0] to-[#d3d3d3]">
      {/* Form alanı */}
      <div className="w-full flex justify-center items-center">
        <div className="w-2/5 bg-[#002D3A] p-10 rounded-2xl shadow-[0_75px_120px_-20px_rgba(0,0,0,0.9)] hover:bg-[#003043] transition">
          <h2 className="text-3xl font-semibold mb-6 text-white text-center">Admin Login Page</h2>
          <form onSubmit={handleSubmit}>
            {/* Email Input */}
            <div className="mb-4">
              <label htmlFor="email" className="block mb-2 text-gray-200">Email</label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 border border-gray-500 rounded-md focus:outline-none focus:border-gray-500"
                placeholder="Enter your email"
                value={email} // State ile emaili kontrol ediyoruz
                onChange={(e) => setEmail(e.target.value)} // Email güncellenince state'i değiştiriyoruz
              />
            </div>

            {/* Password Input */}
            <div className="mb-6">
              <label htmlFor="password" className="block mb-2 text-gray-200">Password</label>
              <input
                type="password"
                id="password"
                className="w-full px-4 py-2 border border-gray-500 rounded-md focus:outline-none focus:border-gray-500"
                placeholder="Enter your password"
                value={password} // State ile passwordu kontrol ediyoruz
                onChange={(e) => setPassword(e.target.value)} // Password güncellenince state'i değiştiriyoruz
              />
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="mb-4 text-red-500 text-center">
                {errorMessage}
              </div>
            )}

            {/* Log in Button */}
            <button type="submit" className="w-full bg-[#004D61] text-white py-2 rounded-md hover:bg-[#003843] transition">
              Log in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
