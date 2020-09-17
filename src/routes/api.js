const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    mens: "Api Test",
  });
});

module.exports = router;
