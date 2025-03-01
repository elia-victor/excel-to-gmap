import React from "react";

const TableComponent = ({ rowData, selectedSheet }) => {
  const sheetData = selectedSheet && rowData[selectedSheet] ? rowData[selectedSheet] : [];

  return (
    <div style={{ marginTop: 20 }}>
      <h3>Data from {selectedSheet}</h3>
      {sheetData.length > 0 ? (
        <table border="1" style={{ width: "100%", textAlign: "left", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              {Object.keys(sheetData[0] || {}).map((key) => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sheetData.map((row, index) => (
              <tr key={index}>
                {Object.values(row).map((value, i) => (
                  <td key={i}>{value}</td>
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
