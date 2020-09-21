const express = require("express");
const router = express.Router();
const user = require("../models/user.js");

const userController = require("../controllers/user.controller.js");

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
  userController.login(req, res);
});

router.post("/register", async (req, res) => {
  userController.createNewUser(req, res);
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
router.get("/report", secure.veryfyToken, (req, res) =>
  res.json({ msg: "Access Ok" })
);

module.exports = router;
