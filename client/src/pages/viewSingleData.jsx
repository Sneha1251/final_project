import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ViewSingleData = () => {
  const location = useLocation();
  const { rowObject } = location.state;
  const navigate = useNavigate();

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6"> Phone Details</h1>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Brand</label>
          <p className="mt-1 text-lg">{rowObject.Brand}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Model</label>
          <p className="mt-1 text-lg">{rowObject.Model}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Release Year</label>
          <p className="mt-1 text-lg">{rowObject.ReleaseYear}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Color</label>
          <p className="mt-1 text-lg">{rowObject.Color}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Price</label>
          <p className="mt-1 text-lg">{rowObject.Price}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Storage</label>
          <p className="mt-1 text-lg">{rowObject.Storage}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">OS</label>
          <p className="mt-1 text-lg">{rowObject.OS}</p>
        </div>
        <button
          onClick={() => navigate('/home')}
          className="w-full bg-indigo-600 text-white py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default ViewSingleData;
