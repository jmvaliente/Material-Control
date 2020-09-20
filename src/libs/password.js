const bcrypt = require("bcrypt");

function comparePass(pass, hash) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(pass, hash, (err, result) => {
      if (err) {
        resolve({ msg: "Password Incorect" });
      } else {
        resolve(result);
      }
    });
  });
}

module.exports = { comparePass };
