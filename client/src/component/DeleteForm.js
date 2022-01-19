import { useState, useEffect } from "react";
import axios from "axios";

const DeleteForm = () => {
  const [id, setId] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    setId(e.target["id"].value);
  };

  useEffect(() => {
    const deleteData = async () => {
      await axios.delete(`/items/${id}`);
    };
    deleteData();
  }, [id]);

  return (
    <div>
      <div>Delete</div>
      <form onSubmit={onSubmit}>
        <label htmlFor="id">id</label>
        <input type="text" id="id"></input>
        <button>submit</button>
      </form>
    </div>
  );
};

export default DeleteForm;
