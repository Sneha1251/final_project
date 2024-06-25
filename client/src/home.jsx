import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTrash, FaEdit } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";

const Home = () => {
  const [csvData, setCsvData] = useState([]);

  const tableStyle = "w-full rounded-xl overflow-hidden";
  const rowStyle = "bg-gray-400/0 px-4 py-2";
  const rowStyle2 = "bg-gray-400/10 px-4 py-2";
  const cellHeaderStyle =
    "border-2 border-white bg-purple-500 text-white px-4 py-2";
  const cellStyle =
    "px-4 py-2 border-2 border-white text-black/50 hover:text-gray-900";

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
        console.log("hi");
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/post/Csvdata", {
          headers: { token },
        });
        console.log(response.data);
        setCsvData(response.data);
      } catch (err) {
        console.log("Error in fetching the data");
      }
    };
    fetchCsvData();
  }, []);

  return (
    <div className="mx-auto h-[81000vh] w-[100%] overflow-y-scroll pr-10">
      <table className={tableStyle}>
        <thead>
          <tr className={`${rowStyle}`}>
            <th className={cellHeaderStyle}>Brand</th>
            <th className={cellHeaderStyle}>Model</th>
            <th className={cellHeaderStyle}>Release Year</th>
            <th className={cellHeaderStyle}>Color</th>
            <th className={cellHeaderStyle}>Price</th>
            <th className={cellHeaderStyle}>Storage</th>
            <th className={cellHeaderStyle}>OS</th>
          </tr>
        </thead>
        <tbody>
          {csvData?.map((row, index) => (
            <tr
              className={index % 2 === 0 ? rowStyle : rowStyle2}
              key={row._id}
            >
              <td className={cellStyle}>{row.Brand}</td>
              <td className={cellStyle}>{row.Model}</td>
              <td className={cellStyle}>{row.ReleaseYear}</td>
              <td className={cellStyle}>{row.Color}</td>
              <td className={cellStyle}>{row.Price}</td>
              <td className={cellStyle}>{row.Storage}</td>
              <td className={cellStyle}>{row.OS}</td>
              <td
                className={`${cellStyle} flex gap-8 cursor-pointer items-center justify-center border-none`}
              >
                {/* <button
                      onClick={() =>
                        navigate("/view", {
                          state: {
                            rowObject: {
                              Model: row.Model,
                              Make: row.Make,
                              Year: row.Year,
                              Color: row.Color,
                              Price: row.Price,
                              Mileage: row.Mileage,
                              Transmission: row.Transmission,
                              FuelType: row.FuelType,
                            },
                          },
                        })
                      }
                    >
                      <IoEyeOutline color="green" className="hover:bg-green-300" />
                    </button> */}

                     {/* <button
                      onClick={() =>
                        navigate("/edit", {
                          state: { rowObject: row },
                        })
                      }
                    >
                      <FaEdit color="blue" className="hover:bg-blue-300" />
                    </button> */}
                    
                    <button onClick={() => handleDelete(row._id)}>
                      <FaTrash color="red" className="hover:bg-red-300" />
                    </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Home;
