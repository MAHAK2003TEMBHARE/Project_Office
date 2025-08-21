const express = require("express");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

// Only admin can access this route
router.get("/dashboard", auth(["admin"]), (req, res) => {
  res.json({ message: "Welcome Admin!", user: req.user });
});

module.exports = router;
