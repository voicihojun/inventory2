import React, { useState, useEffect } from "react";
import axios from "axios";

const UploadForm = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);

  const onSubmit = (e) => {
    e.preventDefault();
    setName(e.target["name"].value);
    setPrice(e.target["price"].value);
    if (e.target["image"].files) {
      const uploadImage = e.target["image"].files[0];
      setImage(uploadImage);
    }
    console.log("name: " + name, "price: " + price, "image: " + image);
  };

  useEffect(() => {
    if (name) {
      const uploadData = async () => {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("price", price);
        formData.append("image", image);
        await axios.post("/items", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      };

      uploadData();
      //   setName("");
      //   setPrice("");
      //   setImage(null);
    }
  }, [name, price, image]);

  return (
    <div className="wrapper">
      <div>UploadForm</div>
      <form onSubmit={onSubmit}>
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

export default UploadForm;
