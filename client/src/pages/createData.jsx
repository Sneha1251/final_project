import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddDataForm = () => {
  const [formData, setFormData] = useState({
    Brand: "",
    Model: "",
    ReleaseYear: "",
    Color: "",
    Price: "",
    Storage: "",
    OS: "",
  });
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        "http://localhost:5000/post/addData",
        formData,
        {
          headers: { token },
        }
      );

      setMessage(response.data.message);
      setError("");
    } catch (err) {
      console.error("Error adding data:", err);
      setError(err.response?.data?.error || "Error adding data");
      setMessage("");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-4">Add New Data</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-md shadow-md"
      >
        {[
          "Brand",
          "Model",
          "ReleaseYear",
          "Color",
          "Price",
          "Storage",
          "OS",
        ].map((field) => (
          <div key={field} className="mb-4">
            <label
              htmlFor={field}
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              {field.replace(/([A-Z])/g, " $1").trim()}
            </label>
            <input
              type={
                field === "ReleaseYear" || field === "Price" ? "number" : "text"
              }
              id={field}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
        ))}
        <div className=" flex justify-between">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add Data
          </button>
          <button
            type="back"
            className="bg-blue-500 text-white py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={() => navigate("/home")}
          >
            Back
          </button>
        </div>
      </form>
      {message && <p className="mt-4 text-green-600">{message}</p>}
      {error && <p className="mt-4 text-red-600">{error}</p>}
    </div>
  );
};

export default AddDataForm;
