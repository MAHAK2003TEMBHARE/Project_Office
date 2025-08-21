import React, { useEffect, useState, useCallback } from "react";
import BlogForm from "../components/BlogForm";
import BlogList from "../components/BlogList";

export default function UserBoard() {
  const token = localStorage.getItem("token");
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = useCallback(async () => {
    try {
      const res = await fetch("http://localhost:5000/api/blogs/myblogs", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch blogs");
      const { blogs } = await res.json();
      setBlogs(blogs);
    } catch (err) {
      console.error("Failed to fetch blogs:", err.message);
    }
  }, [token]);

  useEffect(() => { fetchBlogs(); }, [fetchBlogs]);

  return (
    <div>
      <h2>User Dashboard - My Blogs</h2>
      <BlogForm token={token} refresh={fetchBlogs} />
      <BlogList blogs={blogs} token={token} isAdmin={false} refresh={fetchBlogs} />
    </div>
  );
}
