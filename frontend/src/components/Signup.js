// src/Signup.js
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

function Signup() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-[#d0d4c2]">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        {/* Logo and Signup Text */}
        <div className="flex items-center justify-center mb-6">
          <img src="/logo.png" alt="Logo" className="h-16 w-16 mr-2" /> {/* Adjust path and size */}
          <h1 className="text-5xl font-bold text-green-900">Signup</h1>
        </div>

        {/* Full Name Input */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fullName">
            Full Name
          </label>
          <div className="relative">
            <input
              id="fullName"
              type="text"
              placeholder="Full Name"
              className="w-full px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>
        </div>

        {/* Email Address Input */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email Address
          </label>
          <div className="relative">
            <input
              id="email"
              type="email"
              placeholder="Email Address"
              className="w-full px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>
        </div>

        {/* Password Input */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button className="w-full bg-green-800 text-white py-2 rounded hover:bg-green-700 transition duration-200">
          Submit
        </button>

        {/* Already have an account? Link to Login */}
        <div className="mt-4 text-center">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-green-800 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
