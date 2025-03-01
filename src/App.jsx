import { useEffect, useState } from "react";
import UploadFile from "./components/UploadFile";
import Dropdown from "./components/Dropdown";
import GoogleMaps from "./components/GoogleMaps";
import TableComponent from "./components/Table";
import "./App.css";

function App() {
  const [rowData, setRowData] = useState({});
  const [selectedSheet, setSelectedSheet] = useState("");
  const [sortedData, setSortedData] = useState([]); // Stores sorted data
  const [selectedMarker, setSelectedMarker] = useState(null);

  useEffect(() => {
    if (Object.keys(rowData).length > 0) {
      setSelectedSheet(Object.keys(rowData)[0]);
    }
  }, [rowData]);

  useEffect(() => {
    if (selectedSheet && rowData[selectedSheet]) {
      setSortedData(rowData[selectedSheet]); // Default to original order
    }
  }, [selectedSheet, rowData]);

  const handleSort = (sortedArray) => {
    setSortedData(sortedArray); // Update sorted data
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", padding: "30px", width: "100%", alignItems: "center" }}>
      <div style={{ display: "flex", justifyContent: "space-evenly", padding: "30px", width: "75%", marginBottom: 30 }}>
        <UploadFile rowData={rowData} setRowData={setRowData} />
        <Dropdown rowData={rowData} selectedSheet={selectedSheet} setSelectedSheet={setSelectedSheet} />
      </div>
      <GoogleMaps rowData={sortedData} selectedSheet={selectedSheet} selectedMarker={selectedMarker} setSelectedMarker={setSelectedMarker} />
      <TableComponent rowData={sortedData} selectedSheet={selectedSheet} onSort={handleSort} setSelectedMarker={setSelectedMarker} />
    </div>
  );
}

export default App;
