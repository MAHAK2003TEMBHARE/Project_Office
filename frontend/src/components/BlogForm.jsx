import React, { useState } from "react";
import toast from "react-hot-toast";

export default function BlogForm({ token, refresh }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    image_url: "",
    multi_image_urls: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      multi_image_urls: form.multi_image_urls ? form.multi_image_urls.split(",") : [],
    };

    try {
      const res = await fetch("http://localhost:5000/api/blogs/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Blog created!");
        setForm({ title: "", description: "", image_url: "", multi_image_urls: "" });
        refresh();
      } else {
        toast.error(data.message || "Error creating blog");
      }
    } catch (err) {
      toast.error("Server error");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
      <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} required />
      <input type="text" name="image_url" placeholder="Image URL" value={form.image_url} onChange={handleChange} />
      <input type="text" name="multi_image_urls" placeholder="Multiple Image URLs (comma separated)" value={form.multi_image_urls} onChange={handleChange} />
      <button type="submit">Create Blog</button>
    </form>
  );
}
