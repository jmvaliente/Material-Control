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
  return db.find((el) => usr === el.user && pass === el.pass);
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
          req.session.token = token;
          res.json({ msg: "Autenticator True", data: req.body, token: token });
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
