const pool = require("../config/db");

// Create user with role
const createUser = async (name, email, password, role) => {
  const result = await pool.query(
    "INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *",
    [name, email, password, role]
  );
  return result.rows[0];
};

// Get user by email (include role)
const getUserByEmail = async (email) => {
  const result = await pool.query(
    "SELECT id, name, email, password, role FROM users WHERE email = $1",
    [email]
  );
  return result.rows[0];
};

// Admin count
const getAdminCount = async () => {
  const result = await pool.query("SELECT COUNT(*) FROM users WHERE role = 'admin'");
  return parseInt(result.rows[0].count, 10);
};

module.exports = { createUser, getUserByEmail, getAdminCount };
