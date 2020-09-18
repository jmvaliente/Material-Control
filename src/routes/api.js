const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
//middleware
const secure = require("../libs/secure.js");

//TEMP
const db = [
  { user: "admin", pass: "12345" },
  { user: "user", pass: "123" },
];
//TEMP

function checkUserPass(usr, pass) {
  for (let i = 0; i <= db.length; i++) {
    if (usr === db[i].user && pass === db[i].pass) {
      return true;
    } else {
      return false;
    }
  }
}

router.get("/", (req, res) => {
  res.json({
    msg: "Api Test",
  });
});

//User
router.post("/login", (req, res) => {
  if (checkUserPass(req.body.user, req.body.pass)) {
    jwt.sign(
      { data: req.body },
      process.env.JWT_SECRET_KEY || "wordSecret",
      (err, token) => {
        if (err) {
          res.json({ msg: "Error Token", data: req.body });
        } else {
          res.json({ msg: "Autenticator True", data: req.body, token: token });
          req.session.token = token;
        }
      }
    );
  } else {
    res.json({ msg: "Autentication False", data: req.body });
  }
});

router.post("/register", (req, res) => {
  res.json({
    msg: "Register OK",
  });
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
router.get("/report", (req, res) => {
  //private
  res.json({
    msg: "report OK",
  });
});

module.exports = router;
