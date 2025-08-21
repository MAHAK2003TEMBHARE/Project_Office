const pool = require("../db"); // PostgreSQL pool

// Create blog
exports.createBlog = async (user_id, title, description, image_url, multi_image_urls = []) => {
  const result = await pool.query(
    `INSERT INTO blogs (user_id, title, description, image_url, multi_image_urls)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [user_id, title, description, image_url, multi_image_urls]
  );
  return result.rows[0];
};

// Get blogs of a specific user
exports.getUserBlogs = async (user_id) => {
  const result = await pool.query(
    "SELECT * FROM blogs WHERE user_id=$1 ORDER BY created_at DESC",
    [user_id]
  );
  return result.rows;
};

// Get pending blogs for admin
exports.getPendingBlogs = async () => {
  const result = await pool.query(
    "SELECT blogs.*, users.name AS user_name FROM blogs JOIN users ON blogs.user_id = users.id WHERE status='pending' ORDER BY created_at DESC"
  );
  return result.rows;
};

// Update blog status (admin)
exports.updateBlogStatus = async (id, status) => {
  const result = await pool.query(
    "UPDATE blogs SET status=$1, updated_at=NOW() WHERE id=$2 RETURNING *",
    [status, id]
  );
  return result.rows[0];
};
