import React, { useState, useEffect } from "react";
import axios from "axios";

const UpdateForm = () => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);

  const onSubmit = (e) => {
    e.preventDefault();
    setId(e.target["id"].value);
    setName(e.target["name"].value);
    setPrice(e.target["price"].value);
    if (e.target["image"].files) {
      const updateImage = e.target["image"].files[0];
      setImage(updateImage);
    }
    console.log(
      "id: " + id,
      "name: " + name,
      "price: " + price,
      "image: " + image
    );
  };

  useEffect(() => {
    if (name) {
      const uploadData = async () => {
        const formData = new FormData();
        formData.append("id", id);
        formData.append("name", name);
        formData.append("price", price);
        formData.append("image", image);
        await axios.put(`/items/${id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      };

      uploadData();
    }
  }, [name, price, image]);

  return (
    <div>
      <div>UpdateForm</div>
      <form onSubmit={onSubmit}>
        <label htmlFor="id">id</label>
        <input type="text" id="id"></input>
        <label htmlFor="name">name</label>
        <input type="text" id="name"></input>
        <label htmlFor="price">price</label>
        <input type="text" id="price"></input>
        <label htmlFor="image">image</label>
        <input type="file" id="image"></input>
        <button>submit</button>
      </form>
    </div>
  );
};

export default UpdateForm;
