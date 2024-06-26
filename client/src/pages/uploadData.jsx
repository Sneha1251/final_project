import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';

const UploadData = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      setError('Please select a file to upload');
      return;
    }

    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append('user_file', file);

    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/post/uploads', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'token': token,
        },
      });

      setMessage(response.data.message);
      setError('');
    } catch (err) {
      console.error('Error uploading file:', err);
      setMessage('');
      setError(err.response?.data?.error || 'Error uploading file');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 flex flex-col items-center min-h-screen  ">
      <h1 className="text-4xl font-bold mb-6 text-center">Upload CSV Data</h1>
      <form onSubmit={handleUpload} className="bg-white p-8 rounded-md  w-full max-w-md rounded-lg shadow-lg">
        <input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          className="mb-4 block w-full text-lg text-gray-900 border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:border-indigo-500"
        />
        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            disabled={isLoading}
          >
            {isLoading ? <ClipLoader size={20} color={"#ffffff"} /> : 'Upload'}
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="bg-blue-500 text-white py-2 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
            disabled={isLoading}
          >
            Back
          </button>
        </div>
      </form>
      {isLoading && <p className="mt-4 text-blue-600">Uploading, please wait...</p>}
      {message && <p className="mt-4 text-green-600 text-lg">{message}</p>}
      {error && <p className="mt-4 text-red-600 text-lg">{error}</p>}
    </div>
  );
};

export default UploadData;
