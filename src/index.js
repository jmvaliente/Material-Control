const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require("express-session");
const cors = require("cors");
require("dotenv").config();

//mongoose conection

const app = express();
const api = require("./routes/api.js");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(
  session({
    secret: process.env.SESSION_KEY || "wordSecret",
    resave: true,
    saveUninitialized: true,
    cookie: {
      secure: false,
      maxAge: process.env.COOKIE_MAX_AGE || 1000 * 60 * 24,
    },
  })
);

app.use("/api", api);

app.listen(process.env.PORT || 3000, () => {
  console.log(
    `Server running in port: ${process.env.PORT ? process.env.PORT : 3000}`
  );
});
