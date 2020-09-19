const user = require("../models/user.js");

async function createNewUser(data) {
  return new Promise(async (resolve, reject) => {
    let findUserExists = await user.findOne({ email: data.email });
    if (findUserExists) {
      resolve({ msg: "User exist in database" });
    } else {
      let newUser = new user(data);
      let saveUser = await newUser.save();
      resolve({ msg: "User Created correctly" });
    }
  });
}

async function checkIfUserExist(email) {
  return new Promise(async (resolve, reject) => {
    let findUserExist = await user.findOne({ email: email });
    if (findUserExist) {
      //CheckPassword
      resolve(true);
    } else {
      resolve(false);
    }
  });
}

module.exports = { createNewUser, checkIfUserExist };
