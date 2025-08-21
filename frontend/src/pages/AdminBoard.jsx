import React, { useEffect, useState, useCallback } from "react";
import BlogForm from "../components/BlogForm";
import BlogList from "../components/BlogList";

export default function AdminBoard() {
  const token = localStorage.getItem("token");
  const [blogs, setBlogs] = useState([]);

  const fetchPending = useCallback(async () => {
    try {
      const res = await fetch("http://localhost:5000/api/blogs/pending", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch pending blogs");
      const { blogs } = await res.json();
      setBlogs(blogs);
    } catch (err) {
      console.error(err.message);
    }
  }, [token]);

  useEffect(() => { fetchPending(); }, [fetchPending]);

  return (
    <div>
      <h2>Admin Dashboard - Pending Blogs</h2>
      <BlogForm token={token} refresh={fetchPending} />
      <BlogList blogs={blogs} token={token} isAdmin={true} refresh={fetchPending} />
    </div>
  );
}
