const user = require("../models/user.js");
const jwt = require("jsonwebtoken");

async function createNewUser(req, res) {
  let getUserDb = await getUser(req.body);
  if (getUserDb) return res.status(403).json({ msg: "User exist in database" });

  let newUser = new user(req.body);
  let saveUser = await newUser.save();
  res.status(201).json({ msg: "User Created correctly", data: saveUser });
}

async function login(req, res) {
  let getUserDB = await getUser(req.body);
  if (!getUserDB) return res.status(401).json({ msg: "Email/Password error" });

  let checkPassword = await user.checkPassword(req.body.password, getUserDB.password);
  if (!checkPassword) return res.status(401).json({ msg: "Email/Password error" });

  let token = jwt.sign({ data: req.body }, process.env.JWT_SECRET_KEY || "wordSecret");
  if (!token) return res.status(401).json({ msg: "auth error" });
  req.session.email = getUserDB.email
  req.session.token = token;
  return res.status(200).json({ msg: "Loggin correct", data: token });
}

async function editUser(email, modData) {
  let data = await user.findByIdAndUpdate({ email: email }, { $set: modData }, { upsert: true, new: true })
  return data
}

async function userAccount(req, res) {
  let findUser = await user.findOne({ email: req.session.email }, 'name email -_id')
  if (!findUser) return res.status(403).json({ msg: "Unautorized" })
  return res.status(200).json({ msg: "User Account", data: findUser })
}

async function getUser(data) {
  let findUserExist = await user.findOne({ email: data.email });
  return findUserExist;
}

module.exports = { createNewUser, login, userAccount };
