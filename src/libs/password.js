const bcrypt = require("bcrypt");

function comparePass(pass, hash) {
  bcrypt.compare(pass, hash, (err, result) => {
    if (err) {
      throw err;
    } else {
      return result;
    }
  });
}

module.exports = { comparePass };
