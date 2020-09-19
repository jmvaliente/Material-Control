const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const userActions = require("../libs/userActions");
const user = require("../models/user.js");

//middleware
const secure = require("../libs/secure.js");

//Routes
router.get("/", (req, res) => {
  res.json({
    msg: "Api Test",
  });
});

//User
router.post("/login", async (req, res) => {
  if (await userActions.checkIfUserExist(req.body.email)) {
    jwt.sign(
      { data: req.body },
      process.env.JWT_SECRET_KEY || "wordSecret",
      (err, token) => {
        if (err) {
          res.json({ msg: "Error Token", data: req.body });
        } else {
          req.session.token = token;
          res.json({ msg: "Autenticator True", data: req.body, token: token });
        }
      }
    );
  } else {
    res.json({ msg: "Email no Exist", data: req.body });
  }
});

router.post("/register", async (req, res) => {
  let registerUser = await userActions.createNewUser(req.body);
  res.json(registerUser);
});

router.get("/user/:id", (req, res) => {
  //private
  res.json({
    msg: "get user OK",
  });
});

//item

router.post("/additem", (req, res) => {
  //private
  res.json({
    msg: "upload Item",
  });
});

router.get("/getitem/:id", (req, res) => {
  res.json({
    msg: "ger item",
  });
});

// Report Data PRIVATE access
router.get("/report", secure.veryfyToken, (req, res) => {
  req.token = req.session.token;
  jwt.verify(
    req.token,
    process.env.JWT_SECRET_KEY || "wordSecret",
    (err, data) => {
      if (err) {
        res.sendStatus(403);
      } else {
        res.json({
          msg: data,
        });
      }
    }
  );
});

module.exports = router;
