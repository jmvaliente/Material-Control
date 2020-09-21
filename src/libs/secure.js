const jwt = require("jsonwebtoken");

function veryfyToken(req, res, next) {
  try {
    jwt.verify(req.session.token, process.env.JWT_SECRET_KEY || "wordSecret");
    next();
  } catch (error) {
    return res.status(401).json({ msg: "Unauthorized" });
  }
}

module.exports = { veryfyToken };
