const jwt = require("jsonwebtoken");

const secretSign = "JWTCHALLENGE";

exports.generateJWT = (payload) => {
  return jwt.sign(payload, secretSign);
};

exports.verifyToken = (token) => {
 return jwt.verify(token, secretSign, function (err, decoded) {
    if(err) return false
    return true
  });
};
