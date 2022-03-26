const jwt = require("jsonwebtoken");
const User = require("../models").user;

module.exports = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    let payload = await jwt.verify(token, "mysecret");
    req.user = await User.findByPk(payload.id);

    next();
  } catch (error) {
    res.status(500);
    next(new Error("Sorry bro salah tokennya"));
  }
};
