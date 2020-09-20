const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

let userSchema = new Schema({
  email: String,
  name: String,
  password: String,
});

userSchema.pre("save", function (next) {
  const pass = this;
  if (pass.isModified("password")) {
    bcrypt
      .genSalt(process.env.SALT || 10)
      .then((salt) => {
        return bcrypt.hash(pass.password, salt).then((hash) => {
          pass.password = hash;
          next();
        });
      })
      .catch((error) => next(error));
  } else {
    next();
  }
});

module.exports = mongoose.model("user", userSchema);
