import { useState } from "react";
import axios from "axios";
import { CSVLink } from "react-csv";
import { saveAs } from "file-saver";

const ExportItem = () => {
  const [data, setData] = useState([]);
  const exportData = async () => {
    try {
      const db = await axios.get("/export");
      console.log("export data success");
      console.log(db.data);
      setData(db.data);
    } catch (err) {
      console.log("fail");
      console.log(err);
    }
  };

  exportData();

  return (
    <div className="wrapper">
      <div>Export</div>
      {/* <button onClick={exportData}>export data</button> */}
      <button>
        <a
          style={{ textDecoration: "none" }}
          href={`data:application/csv;charset=utf-8,${data}`}
          download="export.csv"
        >
          download
        </a>
      </button>
    </div>
  );
};

export default ExportItem;
