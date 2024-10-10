import React, { useState } from "react";
import { dummyData } from "../assets/dummyData";

const Dashboard = ({ username, onLogout }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = dummyData.slice(indexOfFirstRow, indexOfLastRow);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <nav className="bg-blue-500 text-white px-6 py-3 flex justify-between items-center">
        <div className="font-semibold text-lg">Welcome, {username}</div>
        <button
          onClick={onLogout}
          className="bg-red-500 px-4 py-2 rounded text-white hover:bg-red-700"
        >
          Logout
        </button>
      </nav>

      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Data</h2>
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">S.No</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">DOB</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.map((row, index) => (
              <tr key={row.sNo} className="bg-white border-b">
                <td className="border px-4 py-2">{row.sNo}</td>
                <td className="border px-4 py-2">{row.name}</td>
                <td className="border px-4 py-2">{row.dob}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-4 flex justify-start">
          {[...Array(Math.ceil(dummyData.length / rowsPerPage)).keys()].map(
            (number) => (
              <button
                key={number + 1}
                onClick={() => paginate(number + 1)}
                className={`px-3 py-1 mx-1 ${
                  currentPage === number + 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300"
                }`}
              >
                {number + 1}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
