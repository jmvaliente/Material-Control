function veryfyToken(req, res, next) {
  const beareHeader = req.header["autorization"];

  if (typeof beareHeader !== "undefined") {
    const bearer = beareHeader.split(" ");
    const bearerToken = bearer[1];
    next();
  } else {
    next();
  }
}

module.exports = { veryfyToken };
