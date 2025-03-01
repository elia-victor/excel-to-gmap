import { useEffect, useState } from "react";
import UploadFile from "./components/UploadFile";
import Dropdown from "./components/Dropdown";
import GoogleMaps from "./components/GoogleMaps";
import TableComponent from "./components/Table";
import "./App.css";

function App() {
  const [rowData, setRowData] = useState({});
  const [selectedSheet, setSelectedSheet] = useState("");

  useEffect(() => {
    if (Object.keys(rowData).length > 0) {
      setSelectedSheet(Object.keys(rowData)[0]);
    }
  }, [rowData]);

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <UploadFile rowData={rowData} setRowData={setRowData} />
        <Dropdown rowData={rowData} selectedSheet={selectedSheet} setSelectedSheet={setSelectedSheet} />
      </div>
      <GoogleMaps rowData={rowData} selectedSheet={selectedSheet} />
      <TableComponent rowData={rowData} selectedSheet={selectedSheet} />  {/* Add Table Component */}
    </>
  );
}

export default App;
