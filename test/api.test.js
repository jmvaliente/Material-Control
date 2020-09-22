const request = require("supertest");
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../src/.env') })
const chai = require("chai")
const expect = require('chai').expect;

const app = require("../src/index.js");

let cookie;
const data = {
  existData: {
    email: "prueba@prueba2",
    pass: "pruebas2",
  },
};

describe("POST /api/login", () => {
  it("Give access when the user entered is correct", (done) => {
    request(app)
      .post("/api/login")
      .set("Accept", "application/json")
      .send({ "email": data.existData.email, "pass": data.existData.pass })
      .expect("Content-Type", /json/)
      .expect('set-cookie', /connect.sid/)
      //.expect('set-cookie', /userData/)
      .expect(200)
      .end(function (err, res) {
        if (err) done(err)
        //expect(res.body.message).to.be.a("string")
        //expect(res.body.message).to.be.equal("user acess granted")
        //cookie = { name: res.headers['set-cookie'][1].toString().split('=')[0], value: res.headers['set-cookie'][1].toString().split('=')[1].split(';')[0] }
        done()
      })
  });


  it("Do not give access whe the user or password entered are incorrect", (done) => {
    request(app)
      .post("/api/login")
      .set("Accept", "application/json")
      .send({ "email": "wronguser@wrongmail.com", "pw": "wrongpassword" })
      .expect("Content-Type", /json/)
      .expect('set-cookie', /connect.sid/)
      .expect(401)
      .end(done)
  })

  it("deny access to report area", (done) => {
    request(app)
      .get("/api/report")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(401)
      .end(done)
  })



});
