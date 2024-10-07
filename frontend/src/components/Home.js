// src/Home.js
import React from 'react';

function Home() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-[#d0d4c2]">
      {/* Logo and Text Container */}
      <div className="flex flex-col items-center gap-2">
        {/* Logo */}
        <img
          src="/logo.png" // Replace with the actual path to your logo
          alt="EasyCart Logo"
          className="w-28 h-28 mb-4" // Adjust width and height as needed
        />

        {/* Main Heading */}
        <h1 className="text-6xl font-bold text-black-900">EasyCart</h1>
        
        {/* Sub Heading */}
        <p className="text-xl text-gray-700 mt-1">faster services</p>
      </div>

      {/* Start Button */}
      <button
        className="mt-8 bg-green-800 text-white py-2 px-6 rounded-md hover:bg-green-700 transition duration-200"
        onClick={() => window.location.href = "/login"}
      >
        Start
      </button>
    </div>
  );
}

export default Home;
