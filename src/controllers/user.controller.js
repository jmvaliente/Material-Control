const user = require("../models/user.js");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require('express-validator')

async function createNewUser(req, res) {
  //Validator//
  await body('email').isEmail().withMessage('Email is not Valid').run(req)
  await body('password')
    .isLength({min: 6, max:15}).withMessage('Password min 6 character and 15 character max')
    .custom(value =>!/\s/.test(value)).withMessage('No space are allowed in the password')
    .run(req)
  await body('name').isLength({min:3, max:15}).withMessage('name min 3 character and 15 character max').trim().escape().run(req)

  const result = validationResult(req)
  if(!result.isEmpty()) return res.status(400).json({msg: result.array()})
  //Validator//

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
