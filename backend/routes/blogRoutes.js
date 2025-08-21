const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const blogController = require("../controllers/blogController");

// Create blog
router.post("/create", auth(["user", "admin"]), blogController.createBlogController);

// Get current user's blogs
router.get("/myblogs", auth(["user", "admin"]), blogController.getUserBlogsController);

// Admin: get pending blogs
router.get("/pending", auth(["admin"]), blogController.getPendingBlogsController);

// Admin: accept/reject blog
router.put("/status/:id", auth(["admin"]), blogController.updateBlogStatusController);

module.exports = router;
