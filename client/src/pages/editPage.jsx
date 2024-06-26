import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const EditPage = () => {
  const location = useLocation();
  const { rowObject } = location.state;
  const [phoneDetails, setPhoneDetails] = useState(rowObject);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPhoneDetails({
      ...phoneDetails,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:5000/post/edit/${phoneDetails._id}`,
        phoneDetails,
        {
          headers: { token },
        }
      );
      if (response.status === 200) {
        alert("Phone details updated successfully");
        navigate("/home");
      }
    } catch (err) {
      console.error("Error updating phone details", err);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white-100 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6">Edit Phone Details</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Brand
          </label>
          <input
            type="text"
            name="Brand"
            value={phoneDetails.Brand}
            onChange={handleChange}
            required
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Model
          </label>
          <input
            type="text"
            name="Model"
            value={phoneDetails.Model}
            onChange={handleChange}
            required
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Release Year
          </label>
          <input
            type="text"
            name="ReleaseYear"
            value={phoneDetails.ReleaseYear}
            onChange={handleChange}
            required
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Color
          </label>
          <input
            type="text"
            name="Color"
            value={phoneDetails.Color}
            onChange={handleChange}
            required
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Price
          </label>
          <input
            type="text"
            name="Price"
            value={phoneDetails.Price}
            onChange={handleChange}
            required
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Storage
          </label>
          <input
            type="text"
            name="Storage"
            value={phoneDetails.Storage}
            onChange={handleChange}
            required
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">OS</label>
          <input
            type="text"
            name="OS"
            value={phoneDetails.OS}
            onChange={handleChange}
            required
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="flex justify-between gap-4 mt-4">
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save
          </button>
          <button
            type="back"
            className="w-full bg-indigo-600 text-white py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={() => navigate("/home")}
          >
            Back
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPage;
