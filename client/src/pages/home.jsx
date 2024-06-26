import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiTrash, FiEdit } from "react-icons/fi";
import { IoEyeOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [csvData, setCsvData] = useState([]);
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `http://localhost:5000/post/delete/${id}`,
        {
          headers: { token },
        }
      );
      if (response.status === 200) {
        setCsvData((prevData) => prevData.filter((csv) => csv._id !== id));
        alert("Csv Data deleted successfully");
      }
    } catch (err) {
      console.log("Error deleting the Csv data", err);
    }
  };

  useEffect(() => {
    const fetchCsvData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/post/Csvdata", {
          headers: { token },
        });
        // console.log(response.data);
        setCsvData(response.data);
      } catch (err) {
        console.log("Error in fetching the data");
      }
    };
    fetchCsvData();
  }, []);

  return (
    <>
      <header className="bg-gray-00 text-gray-800 p-6 flex justify-between items-center">
        <h1 className="text-2xl font-semibold">CSV Data</h1>
        <div>
          <button
            className="bg-blue-500 text-white py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-2"
            onClick={() => navigate("/upload")}
          >
            Upload Data
          </button>
          <button
            className="bg-blue-500 text-white py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-2"
            onClick={() => navigate("/bulk")}
          >
            Bulk Data
          </button>
          <button
            className="bg-blue-500 text-white py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={() => navigate("/add-data")}
          >
            Create Data
          </button>
        </div>
      </header>
      <div className="mx-auto h-[81000vh] w-[100%] overflow-y-scroll pr-10">
        <table className="w-full rounded-xl overflow-hidden">
          <thead>
            <tr className="bg-gray-400/0 px-4 py-2">
              <th className="border-2 border-white bg-blue-500 text-white px-4 py-2">
                Brand
              </th>
              <th className="border-2 border-white bg-blue-500 text-white px-4 py-2">
                Model
              </th>
              <th className="border-2 border-white bg-blue-500 text-white px-4 py-2">
                Release Year
              </th>
              <th className="border-2 border-white bg-blue-500 text-white px-4 py-2">
                Color
              </th>
              <th className="border-2 border-white bg-blue-500 text-white px-4 py-2">
                Price
              </th>
              <th className="border-2 border-white bg-blue-500 text-white px-4 py-2">
                Storage
              </th>
              <th className="border-2 border-white bg-blue-500 text-white px-4 py-2">
                OS
              </th>
              <th className="border-2 border-white bg-blue-500 text-white px-4 py-2">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {csvData?.map((row, index) => (
              <tr
                className={
                  index % 2 === 0
                    ? "bg-gray-400/0 px-4 py-2"
                    : "bg-gray-400/10 px-4 py-2"
                }
                key={row._id}
              >
                <td className="px-4 py-2 border-2 border-white text-black/50 hover:text-gray-900">
                  {row.Brand}
                </td>
                <td className="px-4 py-2 border-2 border-white text-black/50 hover:text-gray-900">
                  {row.Model}
                </td>
                <td className="px-4 py-2 border-2 border-white text-black/50 hover:text-gray-900">
                  {row.ReleaseYear}
                </td>
                <td className="px-4 py-2 border-2 border-white text-black/50 hover:text-gray-900">
                  {row.Color}
                </td>
                <td className="px-4 py-2 border-2 border-white text-black/50 hover:text-gray-900">
                  {row.Price}
                </td>
                <td className="px-4 py-2 border-2 border-white text-black/50 hover:text-gray-900">
                  {row.Storage}
                </td>
                <td className="px-4 py-2 border-2 border-white text-black/50 hover:text-gray-900">
                  {row.OS}
                </td>
                <td
                  className={`px-4 py-2 border-2 border-white text-black/50 hover:text-gray-900 flex gap-8 cursor-pointer items-center justify-center border-none`}
                >
                  <button
                    onClick={() =>
                      navigate("/view", {
                        state: { rowObject: row },
                      })
                    }
                  >
                    <IoEyeOutline color="black" className="hover:bg-red-300" />
                  </button>

                  <button
                    onClick={() =>
                      navigate("/edit", {
                        state: { rowObject: row },
                      })
                    }
                  >
                    <FiEdit color="green" className="hover:bg-red-300" />
                  </button>

                  <button onClick={() => handleDelete(row._id)}>
                    <FiTrash color="red" className="hover:bg-blue-300" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
export default Home;
