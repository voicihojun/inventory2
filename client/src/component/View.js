import axios from "axios";
import { useState } from "react";

const View = () => {
  const [db, setDb] = useState([]);
  const getDB = async () => {
    console.log("getDB connected");
    try {
      const db = await axios.get("/items");
      console.log("success");
      console.log(db.data);
      setDb(db.data);
      if (db.data.length === 0) {
        document.getElementById("message").innerText = "no data";
      }
    } catch (err) {
      console.log("fail");
      console.log(err);
    }
  };

  return (
    <div>
      <div>View</div>
      <button onClick={getDB}>get Data</button>
      <div className="container">
        <div className="item">id</div>
        <div className="item">name</div>
        <div className="item">price</div>
        <div className="item">imageURL</div>
        {db.length !== 0 ? (
          db.map((data) => (
            <>
              <div className="item">{data.id}</div>
              <div className="item">{data.name}</div>
              <div className="item">{data.price}</div>
              {/* <div className="item">
                <img src={data.image} alt={data.name} />
              </div> */}
              <div className="item">
                {data.image ? (
                  <img
                    src={`${data.image.substring(
                      0,
                      parseInt(data.image.indexOf("."))
                    )}_thumb${data.image.substring(data.image.indexOf("."))}`}
                    alt={data.name}
                  />
                ) : null}
              </div>
            </>
          ))
        ) : (
          <div id="message">"pls click get Data button."</div>
        )}
      </div>
    </div>
  );
};

export default View;
