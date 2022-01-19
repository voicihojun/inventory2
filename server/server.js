const express = require("express");
const app = express();
const models = require("./models.js");
const multer = require("multer");
const gm = require("gm").subClass({ GraphicsMagick: true });
const mime = require("mime-types");
const { v4: uuid } = require("uuid");
const fs = require("fs");
const CsvParser = require("json2csv").Parser;

const PORT = 5000;

// app.use
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

//GET: /items
app.get("/items", function (req, res) {
  req.query.limit = req.query.limit || 100;
  const limit = parseInt(req.query.limit, 10);
  if (Number.isNaN(limit)) {
    return res.status(400).end();
  }
  models.Items.findAll({ limit }).then((items) => res.json(items));
});

//GET: /items/:id
app.get("/items/:id", function (req, res) {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) {
    return res.status(400).end();
  }
  models.Items.findOne({
    where: {
      id: id,
    },
  }).then((item) => {
    if (!item) return res.status(404).end();
    res.json(item);
  });
});

//DELETE: /items/:id
app.delete("/items/:id", function (req, res) {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) {
    return res.status(400).end();
  }
  models.Items.destroy({
    where: {
      id: id,
    },
  }).then((item) => {
    return res.status(204).end();
  });
});

//POST: /items

//postman 출력부분
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "./uploads/"),
  limit: { fileSize: 3 * 1024 * 1024 },
  filename: (req, file, cb) =>
    cb(null, `${uuid()}.${mime.extension(file.mimetype)}`),
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (["image/jpeg", "image/png"].includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("invalid file type"), false);
    }
  },
});

app.post("/items", upload.single("image") || "", function (req, res) {
  console.log(req.body);
  const name = req.body.name;
  const price = req.body.price;
  let image = null;
  if (req.file) {
    image = req.file.path;
    gm(`${req.file.path}`).thumb(
      "100",
      "100",
      `${req.file.path.replace(
        `.${mime.extension(req.file.mimetype)}`,
        ""
      )}_thumb.${mime.extension(req.file.mimetype)}`,
      100,
      function (error) {
        if (error) console.log(error);
      }
    );
  }

  console.log(name, price, image);

  if (!name) {
    return res.status(400).end();
  }

  models.Items.create({ name, price, image })
    .then((item) => {
      //   res.json(item).end();
      res.status(201).json(item);
    })
    .catch((err) => {
      //   console.error(err);
      if (err.name === "SequelizeUniqueConstraintError")
        return res.status(409).end();
      res.status(500).end();
    });

  //   res.json(req.file);
});

//UPDATE: /items/:id
app.put("/items/:id", upload.single("image") || "", function (req, res) {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) return res.status(400).end();
  console.log("==============");
  console.log(id);
  console.log(req.body);
  console.log("+++++++++");

  const name = req.body.name;
  const price = req.body.price;
  let image = null;

  if (req.file) {
    image = req.file.path;
    gm(`${req.file.path}`).thumb(
      "100",
      "100",
      `${req.file.path.replace(
        `.${mime.extension(req.file.mimetype)}`,
        ""
      )}_thumb.${mime.extension(req.file.mimetype)}`,
      100,
      function (error) {
        if (error) console.log(error);
      }
    );
  }

  console.log(name, price, image);

  if (!name) {
    return res.status(400).end();
  }

  models.Items.findOne({ where: { id } }).then((item) => {
    if (!item) return res.status(404).end();
    item.name = name;
    item.price = price;
    item.image = image;
    item
      .save()
      .then((_) => {
        res.json(item);
      })
      .catch((err) => {
        if (err.name === "SequelizeUniqueConstraintError") {
          return res.status(409).end();
        }
        res.status(500).end();
      });
  });
});

app.get("/export", function (req, res) {
  models.Items.findAll().then((items) => {
    let data = [];
    items.forEach((item) => {
      const { id, name, price, image } = item;
      data.push({ id, name, price, image });
    });

    const csvFields = ["id", "name", "price", "image"];
    const csvParser = new CsvParser({ csvFields });
    const csvData = csvParser.parse(data);

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=items.csv");
    res.status(200).end(csvData);

    fs.writeFileSync("./items.csv", csvData);
  });
});

// =======================

try {
  models.sequelize.sync({ force: false }).then((_) => {
    console.log("Sync DB completed!");
    app.listen(PORT, () => {
      console.log("Express Server listening on PORT " + PORT);
    });
  });
} catch (err) {
  console.error(err);
}

module.exports = app;
