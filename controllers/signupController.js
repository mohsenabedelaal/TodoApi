const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { generateJWT } = require("../utils");
const db = require("../models");

const User = db.users;

exports.signUpController = async (req, resp) => {
  if (!req.body.name || !req.body.email || !req.body.password) {
    return resp
      .status(403)
      .send({
        success: false,
        message: "Please enter your information to register",
      });
  }
  const user = await User.findOne({ where: { email: req.body.email } });
  if (user)
    return resp.status(403).send({
      success: false,
      message: "User Already Registered",
    });
  const hashed = await bcrypt.hash(req.body.password, 10);

  const signedUpUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: hashed,
  });

  return resp.status(200).send({
    success: true,
    message: "Registered Successfully",
  });
};
