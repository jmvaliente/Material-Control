const request = require("supertest");
const chai = require("chai");
const expect = require("chai").expect;

const app = require("../src/index.js");

let cookie;
const data = {
  existData: {
    email: "prueba@prueba1",
    password: "prueba1",
  },
};

describe("Post /api/login", () => {
  it("Give access correctly email and password", (done) => {
    request(app)
      .post("/api/login")
      .set("accept", "application/json")
      .send({ email: "prueba@prueba1", password: "prueba1" })
      .expect("Content-Type", /json/)
      .expect(200)
      .end(function (err, res) {
        res.body.id.should.equal("1");
        Cookies = res.headers["set-cookie"].pop().split(";")[0];
        done();
      });
  });

  it("Do not access whe the user or password entered are incorrect", (done) => {
    request(app)
      .post("/api/login")
      .set("accept", "application/json")
      .send({ email: "falseemail@email.com", password: "falsePassword" })
      .expect("Content-Type", /json/)
      .expect(200)
      .end(function (err, res) {
        done();
      });
  });
});
