// 테스트 코드

const app = require("./server.js");
const should = require("should");
const request = require("supertest");
const models = require("./models.js");

// GET
describe("GET/ items는 ", () => {
  const items = [
    { name: "aaa", price: "100$" },
    { name: "bbb", price: "200$" },
    { name: "ccc", price: "300$" },
  ];
  before((done) => {
    models.sequelize.sync({ force: true }).then((_) => done());
  });
  before(() => {
    models.Items.bulkCreate(items);
  });
  describe("성공시 ", () => {
    it("item 객체를 담은 배열로 응답한다.", (done) => {
      request(app)
        .get("/items")
        .end((err, res) => {
          res.body.should.be.instanceOf(Array);
          done();
        });
    });
    it("최대 limit 갯수만큼 응답한다.", (done) => {
      request(app)
        .get("/items?limit=2")
        .end((err, res) => {
          res.body.should.have.lengthOf(2);
          done();
        });
    });
  });

  describe("실패시 ", () => {
    it("limit이 숫자형이 아니면 400 응답한다.", (done) => {
      request(app).get("/items?limit=two").expect(400).end(done);
    });
  });
});

describe("GET /items/:id", () => {
  const items = [
    { name: "ccc", price: "100$" },
    { name: "bbb", price: "200$" },
    { name: "aaa", price: "300$" },
  ];
  before((done) => {
    models.sequelize.sync({ force: true }).then((_) => done());
  });
  before(() => {
    models.Items.bulkCreate(items);
  });

  describe("성공시", () => {
    it("id가 1인 item 객체를 반환한다.", (done) => {
      request(app)
        .get("/items/1")
        .end((err, res) => {
          res.body.should.have.property("id", 1);

          done();
        });
    });
  });

  describe("실패시", () => {
    it("id가 숫자가 아니면 400을 응답한다.", (done) => {
      request(app).get("/items/one").expect(400).end(done);
    });
    it("id로 item 못 찾으면 404 응답한다.", (done) => {
      request(app).get("/item/999").expect(404).end(done);
    });
  });
});

// DELETE
describe("DELETE /items/:id", () => {
  const items = [
    { name: "ccc", price: "100$" },
    { name: "bbb", price: "200$" },
    { name: "aaa", price: "300$" },
  ];
  before((done) => {
    models.sequelize.sync({ force: true }).then((_) => done());
  });
  before(() => models.Items.bulkCreate(items));
  describe("성공시", () => {
    it("204 응답한다", (done) => {
      request(app).delete("/items/1").expect(204).end(done);
    });
  });
  describe("실패시", () => {
    it("id가 숫자가 아니면 400 응답한다.", (done) => {
      request(app).delete("/items/two").expect(400).end(done);
    });
  });
});

//POST
describe("POST /items", () => {
  const items = [
    { name: "ccc", price: "100$" },
    { name: "bbb", price: "200$" },
    { name: "aaa", price: "300$" },
  ];
  before((done) => {
    models.sequelize.sync({ force: true }).then((_) => done());
  });
  before(() => models.Items.bulkCreate(items));
  describe("성공시 ", () => {
    let body;
    before((done) => {
      request(app)
        .post("/items")
        .send({ name: "lamp", price: "250$" })
        .expect(201)
        .end((err, res) => {
          body = res.body;
          done();
        });
    });

    it("생성된 item의 name을 반환한다.", () => {
      body.should.have.property("name", "lamp");
    });
  });

  describe("실패시 ", () => {
    it("name 혹은 price 파라미터 누락시 400 반환한다.", (done) => {
      request(app).post("/items").send({}).expect(400).end(done);
    });
    it("name 이 중복일 경우 409 반환한다.", (done) => {
      request(app)
        .post("/items")
        .send({ name: "lamp", price: "250$" })
        .expect(409)
        .end(done);
    });
  });
});

//PUT
describe("PUT/ items/:id", () => {
  const items = [
    { name: "ccc", price: "100$" },
    { name: "bbb", price: "200$" },
    { name: "aaa", price: "300$" },
  ];
  before((done) => {
    models.sequelize.sync({ force: true }).then((_) => done());
  });
  before(() => models.Items.bulkCreate(items));
  describe("성공시", () => {
    it("변경된 name을 반환한다.", (done) => {
      request(app)
        .put("/items/2")
        .send({ name: "Chair", price: "200$" })
        .end((err, res) => {
          res.body.should.have.property("name", "Chair");
          done();
        });
    });
  });

  describe("실패시", () => {
    it("정수가 아닌 id 일 경우 400을 반환한다.", (done) => {
      request(app).put("/items/three").expect(400).end(done);
    });
    it("name/price가 없는 경우 400을 반환한다.", (done) => {
      request(app).put("/items/3").send({}).expect(400).end(done);
    });
    it("없는 id 이면 404를 반환한다.", (done) => {
      request(app).put("/item/9000").expect(404).end(done);
    });
    it("name이 중복이면 409를 반환한다.", (done) => {
      request(app)
        .put("/items/2")
        .send({ name: "aaa", price: "1400$" })
        .expect(409)
        .end(done);
    });
  });
});
