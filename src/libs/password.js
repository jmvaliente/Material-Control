const bcrypt = require("bcrypt");

function cryptPass(pass) {
  bcrypt
    .genSalt(parseInt(process.env.SALT) || 10)
    .then((salt) => {
      bcrypt.hash(pass, salt).then((hash) => {
        console.log(hash);
        return hash;
      });
    })
    .catch((err) => {
      return err;
    });
}

function comparePass(pass, hash) {
  bcrypt.compare(pass, hash, (err, result) => {
    if (err) {
      throw err;
    } else {
      return result;
    }
  });
}
