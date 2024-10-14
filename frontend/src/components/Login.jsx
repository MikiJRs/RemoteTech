import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // useNavigate hook'u kullanarak yönlendirme işlemi yapacağız

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: email, password }), // Backend'e email ve password gönderiyoruz
        credentials: 'include', // Cookie'yi dahil etmek için
      });

      if (response.ok) {
        console.log('Login successful');
        navigate('/admin'); // Giriş başarılıysa /admin rotasına yönlendir
      } else {
        console.log('Login failed');
        // Giriş başarısızsa yapılacak işlemler
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sol kısım - Form alanı */}
      <div className="w-1/2 bg-gray-200 flex flex-col justify-center p-8">
        <h2 className="text-3xl font-semibold mb-6">Admin Login Page</h2>
        <form onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2 text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500"
              placeholder="Enter your email"
              value={email} // State ile emaili kontrol ediyoruz
              onChange={(e) => setEmail(e.target.value)} // Email güncellenince state'i değiştiriyoruz
            />
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <label htmlFor="password" className="block mb-2 text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500"
              placeholder="Enter your password"
              value={password} // State ile passwordu kontrol ediyoruz
              onChange={(e) => setPassword(e.target.value)} // Password güncellenince state'i değiştiriyoruz
            />
          </div>

          {/* Log in Button */}
          <button type="submit" className="w-full bg-gray-800 text-white py-2 rounded-md hover:bg-gray-700 transition">
            Log in
          </button>
        </form>
      </div>

      {/* Sağ kısım - İllüstrasyon alanı */}
      <div className="w-1/2 bg-gray-100 flex justify-center items-center">
        <img src="/path-to-your-image.svg" alt="illustration" />
      </div>
    </div>
  );
};

export default Login;
