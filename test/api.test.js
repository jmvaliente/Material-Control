const request = require("supertest");
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../src/.env') })
const chai = require("chai")
const expect = require('chai').expect;

const app = require("../src/index.js");

let cookie = {}
const data = {
  existData: {
    email: "prueba@prueba2",
    pass: "pruebas2",
    name: "Pepe",
    emailRandom: `${Math.random(1000)}@email.com`
  },
};

describe("POST api/register", () => {
  it("Register new user", (done) => {
    request(app)
      .post("/api/register")
      .set("Accept", "application/json")
      .send({ "email": data.existData.emailRandom, "pass": data.existData.pass, "name": data.existData.name })
      .expect("Content-Type", /json/)
      .expect(201)
      .end(done)
  })

  it("Cant register existing user", (done) => {
    request(app)
      .post('/api/register')
      .set("Accept", "application/json")
      .send({ "email": data.existData.email, "pass": data.existData.pass, "name": data.existData.name })
      .expect("Content-Type", /json/)
      .expect(403)
      .end(done)
  })

})

describe("POST /api/login", () => {
  it("Give access when the user entered is correct", (done) => {
    request(app)
      .post("/api/login")
      .set("Accept", "application/json")
      .send({ "email": data.existData.email, "pass": data.existData.pass })
      .expect("Content-Type", /json/)
      .expect('set-cookie', /connect.sid/)
      .expect(200)
      .end(function (err, res) {
        if (err) done(err)
        cookie = { name: res.headers['set-cookie'].toString().split('=')[0], value: res.headers['set-cookie'].toString().split('=')[1].split(';')[0] }
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


  it("access to report area", (done) => {
    request(app)
      .get("/api/report")
      .set("Cookie", `${cookie.name}=${cookie.value}`)
      .set("Accept", "aplication/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .end(done)
  })

});
