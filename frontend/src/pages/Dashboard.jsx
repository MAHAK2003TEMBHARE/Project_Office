/*import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const [role, setRole] = useState("");

  useEffect(() => {
    // localStorage se role fetch
    const storedRole = localStorage.getItem("role");
    if (!storedRole) {
      navigate("/signin"); // If role not exist then redirect
    } else {
      setRole(storedRole);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/signin");
  };

  return (
    <div className="form-container">
      <h2>Welcome to Dashboard</h2>
      <p className="role-message">Role: {role}</p>

      {/* Role-based content *//*}
      {role === "admin" && <p>Admin Panel: Manage users here.</p>}
      {role === "user" && <p>User Panel: View your data here.</p>}

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
*/

// Dashboard.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (!role) {
      navigate("/signin");
    } else if (role === "user") {
      navigate("/userboard");
    } else if (role === "admin") {
      navigate("/adminboard");
    }
  }, [navigate]);

  return <div>Redirecting...</div>;
}
