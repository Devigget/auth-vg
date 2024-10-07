// src/components/ForgotPassword.js
import { useState } from 'react';
import { FaArrowLeft, FaEnvelope } from 'react-icons/fa';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
      } else {
        setError(data.message || 'Failed to send reset link. Please try again.');
      }
    } catch (err) {
      setError('Server error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#d9ddc5]">
      <button
        className="absolute top-4 left-4 p-2 bg-gray-200 rounded-full"
        onClick={() => window.history.back()}
      >
        <FaArrowLeft className="text-xl text-gray-600" />
      </button>
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Forgot Password</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-80">
        <div className="mb-4 relative">
          <label className="block text-gray-700">Email</label>
          <div className="flex items-center border border-gray-300 rounded mt-1 p-2">
            <FaEnvelope className="text-gray-400 mr-2" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 outline-none"
              placeholder="Enter your email"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className={`w-full bg-green-800 text-white py-2 rounded hover:bg-green-900 ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={loading}
        >
          {loading ? 'Sending...' : 'Submit'}
        </button>
      </form>
      {message && <p className="mt-4 text-green-600">{message}</p>}
      {error && <p className="mt-4 text-red-600">{error}</p>}
    </div>
  );
};

export default ForgotPassword;
