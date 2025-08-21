const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = (roles = []) => {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(403).json({ message: "Token required" });

    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) return res.status(403).json({ message: "Invalid token" });

      req.user = decoded; // { id, role }

      if (roles.length && !roles.includes(req.user.role)) {
        return res.status(403).json({ message: "Access denied: insufficient role" });
      }

      next();
    });
  };
};

module.exports = auth;
