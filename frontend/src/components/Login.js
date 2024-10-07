// src/components/Login.js
import { useState } from 'react';
import { FaUser, FaLock, FaArrowLeft, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    alert(data.message);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#d9ddc5]">
      <button onClick={() => navigate('/')} className="absolute top-4 left-4 p-2 bg-gray-200 rounded-full">
        <FaArrowLeft className="text-xl text-gray-600" />
      </button>
      <div className="flex flex-col items-center mb-6">
        <div className="flex items-center space-x-2 mb-4">
          {/* Cart Image */}
          <img src="/logo.png" alt="Cart" className="h-16 w-16" />
          <h2 className="text-6xl font-bold text-gray-900">Login</h2>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-80">
        <div className="mb-4 relative">
          <label className="block text-gray-700">Name</label>
          <div className="flex items-center border border-gray-300 rounded mt-1 p-2">
            <FaUser className="text-gray-400 mr-2" />
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 outline-none"
              placeholder="Full Name"
              required
            />
          </div>
        </div>
        <div className="mb-4 relative">
          <label className="block text-gray-700">Password</label>
          <div className="flex items-center border border-gray-300 rounded mt-1 p-2">
            <FaLock className="text-gray-400 mr-2" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="flex-1 outline-none"
              placeholder="Password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-gray-400"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-green-800 text-white py-2 rounded hover:bg-green-900"
        >
          Submit
        </button>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account? <a href="/signup" className="text-green-700" onClick={() => navigate('/signup')} >Sign up</a>
          </p>
          <p className="text-sm text-gray-600 mt-1">
            <a href="/forgot-password" className="text-green-700" onClick={() => navigate('/forgot-password')}>Forgot your password?</a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
