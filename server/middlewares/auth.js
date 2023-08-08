const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.header("token");
  if (!token) {
    return res.status(401).json({ error: "Unauthorized. Missing token." });
  }
  try {
    const decodedToken = jwt.verify(token, "Secret-Key");
    req.userId = decodedToken.id;
    next();
  } catch (error) {
    return res.status(403).json({ error: "Forbidden. Invalid token." });
  }
};

module.exports = auth;