import React from "react";
import * as XLSX from "xlsx";
import moment from "moment";
import "moment/locale/id"; // Import Indonesian locale

const convertExcelDate = (excelDate) => {
  if (!excelDate) return "";

  // If the value is a number, convert from Excel serial date
  if (!isNaN(excelDate) && excelDate > 40000) {
    const excelEpoch = new Date(1900, 0, excelDate - 1); // Excel starts from 1900-01-01
    return moment(excelEpoch).locale("id").format("MM/DD/YYYY");
  }

  // If it's already a valid date string, format it correctly
  if (moment(excelDate, ["DD/MM/YY", "DD-MM-YYYY", "YYYY-MM-DD"], true).isValid()) {
    return moment(excelDate, ["DD/MM/YY", "DD-MM-YYYY", "YYYY-MM-DD"]).format("DD/MM/YYYY");
  }

  return excelDate; // Return as is if format unknown
};

const ExcelRowToObject = ({ setRowData }) => {
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });

      // Get all sheet names
      const sheetNames = workbook.SheetNames;
      let allSheetsData = {};

      sheetNames.forEach((sheetName) => {
        const sheet = workbook.Sheets[sheetName];

        // Convert sheet data to JSON format
        const sheetData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

        if (sheetData.length > 5) { // Ensure there are enough rows
          let dataArray = [];

          for (let i = 5; i < sheetData.length; i++) { // Start from row 6 (index 5)
            let row = sheetData[i];
            if (row.length === 0) continue; // Skip empty rows

            let formattedDate = convertExcelDate(row[7]); // Convert Excel date

            let rowObject = {
              name: row[1] || "", // Name
              address: row[2] || "", // Address
              fimCode: row[3] || "", // fimCode
              lat: row[4] ? parseFloat(row[4].split(", ")[0]) : "", // Lat
              lng: row[4] ? parseFloat(row[4].split(", ")[1]) : "", // Lng
              "med/collect": row[5],
              collectability: row[6],
              date: formattedDate, // Corrected date conversion
              description: row[8] || '-'
            };

            dataArray.push(rowObject);
          }

          allSheetsData[sheetName] = dataArray;
        }
      });

      setRowData(allSheetsData);
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div style={{ 
      display: "flex", 
      justifyContent: "center", 
      alignItems: "center", 
      flexDirection: "column",
      textAlign: "center"
    }}>
      <h3>Upload Excel File</h3>
      <input 
        type="file" 
        accept=".xlsx, .xls" 
        onChange={handleFileUpload}
        style={{
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "5px",
          cursor: "pointer",
          display: "block"
        }}
      />
    </div>
  );
};

export default ExcelRowToObject;
