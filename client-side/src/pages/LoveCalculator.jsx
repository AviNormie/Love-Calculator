import React, { useState } from 'react';
import axios from 'axios';

const LoveCalculator = () => {
  const [username, setUsername] = useState('');
  const [crushName, setCrushName] = useState('');
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/save-result', {
        username,
        crushName,
      });

      setResult(response.data.newResult);
    } catch (error) {
      console.error('Error saving result:', error.response?.data || error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400 to-red-500 flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-4xl font-bold text-center text-pink-600 mb-6">Love Calculator 💖</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
          <input
            type="text"
            placeholder="Your Crush's Name"
            value={crushName}
            onChange={(e) => setCrushName(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
          <button
            type="submit"
            className="w-full bg-pink-500 text-white py-3 rounded-lg font-bold text-lg hover:bg-pink-600 transition"
          >
            Calculate ❤️
          </button>
        </form>

        {result && (
          <div className="mt-6 text-center">
            <h2 className="text-2xl font-semibold text-pink-600">Result</h2>
            <p className="mt-4 text-lg font-medium">
              <span className="font-bold">{result.username}</span> ❤️{' '}
              <span className="font-bold">{result.crushName}</span>
            </p>
            <p className="mt-2 text-lg text-gray-700">
              Compatibility Score: <span className="font-bold">{result.compatibilityScore}%</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoveCalculator;
