const user = require("../models/user.js");
const bcrypt = require("bcrypt");
const password = require("../libs/password");

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

async function checkIfUserExist(data) {
  return new Promise(async (resolve, reject) => {
    let findUserExist = await user.findOne({ email: data.email });
    if (findUserExist) {
      //CheckPassword
      if (await password.comparePass(data.pass, findUserExist.password)) {
        resolve(true);
      } else {
        resolve(false);
      }
    } else {
      resolve(false);
    }
  });
}

module.exports = { createNewUser, checkIfUserExist };
