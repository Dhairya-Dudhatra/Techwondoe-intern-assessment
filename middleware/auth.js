const jwt = require("jsonwebtoken");

const config = process.env;

const verifyToken = (req, res, next) => {
  const token =
     req.headers["jwt"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {

    const decoded = jwt.verify(token, config.TOKEN_KEY);
     
     
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = verifyToken ;