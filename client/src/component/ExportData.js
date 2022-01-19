import { useState, useEffect } from "react";
import axios from "axios";

const ExportData = () => {
  const exportData = (e) => {
    e.preventDefault();
  };

  //   useEffect(() => {
  //     const deleteData = async () => {
  //       await axios.delete(`/items/${id}`);
  //     };
  //     deleteData();
  //   }, [id]);

  return (
    <div>
      <div>Export</div>
      <button onClick={exportData}>export data</button>
    </div>
  );
};

export default ExportData;
