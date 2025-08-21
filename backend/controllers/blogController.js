const { createBlog, getUserBlogs, getPendingBlogs, updateBlogStatus } = require("../models/blogModel");

// Create blog
exports.createBlogController = async (req, res) => {
  try {
    const { title, description, image_url, multi_image_urls } = req.body;
    const user_id = req.user.id;

    const multiImages = Array.isArray(multi_image_urls) ? multi_image_urls : [];
    const blog = await createBlog(user_id, title, description, image_url, multiImages);

    res.status(201).json({ blog });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get user blogs
exports.getUserBlogsController = async (req, res) => {
  try {
    const user_id = req.user.id;
    const blogs = await getUserBlogs(user_id);
    res.json({ blogs });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get pending blogs (admin)
exports.getPendingBlogsController = async (req, res) => {
  try {
    const blogs = await getPendingBlogs();
    res.json({ blogs });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Update blog status (admin)
exports.updateBlogStatusController = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const blog = await updateBlogStatus(id, status);
    res.json({ blog });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
