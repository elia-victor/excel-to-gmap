import React, { useState } from "react";

const TableComponent = ({ rowData, selectedSheet, onSort, setSelectedMarker }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const handleSort = (key) => {
    setSelectedMarker(null)
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    const sortedArray = [...rowData].sort((a, b) => {
      let valueA = a[key];
      let valueB = b[key];

      if (typeof valueA === "string") valueA = valueA.toLowerCase();
      if (typeof valueB === "string") valueB = valueB.toLowerCase();

      if (valueA < valueB) return direction === "asc" ? -1 : 1;
      if (valueA > valueB) return direction === "asc" ? 1 : -1;
      return 0;
    });

    onSort(sortedArray); // Send sorted data to App.js
  };

  return (
    <div style={{ marginTop: 20, width: "75%", textAlign: "center" }}>
      <h3>Data from {selectedSheet}</h3>
      <p>Click to Sort by [Column Heading]</p>
      {rowData.length > 0 ? (
        <table border="1" style={{ width: "100%", borderCollapse: "collapse", textAlign: "center" }}>
          <thead>
            <tr style={{ backgroundColor: "black", color: "white", fontWeight: "bold" }}>
              <th style={{ padding: "10px", textAlign: "center" }}>No</th> {/* Number Column */}
              {Object.keys(rowData[0] || {}).map((key) => (
                <th
                  key={key}
                  style={{ padding: "10px", textAlign: "center", cursor: "pointer" }}
                  onClick={() => handleSort(key)}
                >
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                  {sortConfig.key === key && (sortConfig.direction === "asc" ? " ▲" : " ▼")}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rowData.map((row, index) => (
              <tr key={index} style={{ backgroundColor: index % 2 === 0 ? "#f0f0f0" : "#ffffff", color: "black" }}>
                <td style={{ padding: "8px", textAlign: "center" }}>{index + 1}</td>
                {Object.values(row).map((value, i) => (
                  <td key={i} style={{ padding: "8px", textAlign: "center" }}>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No data available for {selectedSheet}</p>
      )}
    </div>
  );
};

export default TableComponent;
