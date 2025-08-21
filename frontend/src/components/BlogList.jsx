import React from "react";

export default function BlogList({ blogs, token, isAdmin, refresh }) {
  const handleStatus = async (id, status) => {
    try {
      const res = await fetch(`http://localhost:5000/api/blogs/status/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status }),
      });
      if (res.ok) refresh();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      {blogs.map((b) => (
        <div key={b.id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
          <h3>{b.title}</h3>
          <p>{b.description}</p>
          <p>Status: {b.status}</p>
          {b.image_url && <img src={b.image_url} alt="" style={{ width: "100px" }} />}
          {b.multi_image_urls?.map((url, i) => <img key={i} src={url} alt="" style={{ width: "100px", margin: "5px" }} />)}

          {isAdmin && b.status === "pending" && (
            <div>
              <button onClick={() => handleStatus(b.id, "accepted")}>Accept</button>
              <button onClick={() => handleStatus(b.id, "rejected")}>Reject</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
