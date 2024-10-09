import React from 'react';

const Login = () => {
  return (
    <div className="flex h-screen">
      {/* Sol kısım - Form alanı */}
      <div className="w-1/2 bg-gray-200 flex flex-col justify-center p-8">
        <h2 className="text-3xl font-semibold mb-6">Admin Login Page</h2>
        <form>
          {/* Email Input */}
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2 text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500"
              placeholder="Enter your email"
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
            />
          </div>

          {/* Log in Button */}
          <button className="w-full bg-gray-800 text-white py-2 rounded-md hover:bg-gray-700 transition">
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
