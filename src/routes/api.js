const express = require("express");
const router = express.Router();

//Controllers
const userController = require("../controllers/user.controller.js");
const itemController = require('../controllers/item.controller.js')

//middleware
const secure = require("../libs/secure.js");

//Routes
router.get("/", (req, res) => res.json({ msg: "Api Test" }));

//User

router.post("/login", async (req, res) => await userController.login(req, res));

router.post("/register", async (req, res) => await userController.createNewUser(req, res));

router.get("/user/:id", (req, res) => res.json({ msg: "get user OK" }));


//item

router.post("/additem", secure.veryfyToken, async (req, res, next) => await itemController.addItem(req, res));

router.patch("/edititem/:id", secure.veryfyToken, async (req, res, next) => await itemController.editItem(req, res))

router.get("/getitem/:id", async (req, res) => await itemController.getItem(req, res));

router.delete("/deleteitem/:id", secure.veryfyToken, async (req, res) => await itemController.deleteItem(req, res));

// Report Data PRIVATE access
router.get("/report", secure.veryfyToken, (req, res) => res.json({ msg: "Access Ok" }));

module.exports = router;