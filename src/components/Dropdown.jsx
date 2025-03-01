import React from "react";

const DropdownSheetSelector = ({ selectedSheet, setSelectedSheet, rowData }) => {
  return (
    <div>
      {Object.keys(rowData).length > 0 && (
        <>
          <h3>Select a Sheet:</h3>
          <select style={{ height: '45px', padding: '10px', borderRadius: 5 }} value={selectedSheet} onChange={(e) => setSelectedSheet(e.target.value)}>
            {Object.keys(rowData).map((sheetName) => (
              <option key={sheetName} value={sheetName}>
                {sheetName}
              </option>
            ))}
          </select>
        </>
      )}
    </div>
  );
};

export default DropdownSheetSelector;
