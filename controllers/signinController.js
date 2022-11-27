const bcrypt = require("bcryptjs");
const { generateJWT } = require("../utils");
const db = require("../models");

const User = db.users;

const signin = async (req, resp) => {
  if (!req.body.email || !req.body.password) {
    return resp.status(403).send({
      success: false,
      message: "Please enter your credentials ",
    });
  }
  const user = await User.findOne({
    where: { email: req.body.email },
  });

  if (!user) {
    return resp.status(403).send({ success: false, message: "Invalid login" });
  }

  const isPasswordValid = await bcrypt.compare(
    req.body.password,
    user.password
  );

  if (isPasswordValid) {
    const token = generateJWT({
      name: user.name,
      email: user.email,
    });

    return resp.status(200).send({
      success: true,
      token: token,
      message: "Logged in successfully",
    });
  }
  return resp.status(403).send({
    success: false,
    message: "Incorrect email or password",
  })
};

module.exports = signin;
