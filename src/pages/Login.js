// src/pages/Login.js
/*import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        form
      );

      localStorage.setItem("token", res.data.token);
      alert("Login successful!");
      navigate("/quiz");
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p>Don't have account? <Link to="/signup">Signup</Link></p>
    </div>
  );
}

const styles = {
  container: { textAlign: "center", marginTop: "100px" },
  form: { display: "flex", flexDirection: "column", gap: "10px", width: "250px", margin: "auto" }
};

export default Login;
*/

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const res = await fetch(`${process.env.REACT_APP_API_URI}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (data.token) {
      localStorage.setItem("token", data.token);
      navigate("/quiz");
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="glass-card" style={{ textAlign: "center", marginTop: "100px" }}>
      <h2 style={{color:"white", fontSize:"30px", fontWeight:"bold"}}>Login</h2>
      <input type="email"
        placeholder="Email" style={{ marginBottom: "10px" , padding: "8px", width: "200px" , borderRadius: "4px", border: "1px solid #ccc" }}
        onChange={(e) => setEmail(e.target.value)}
      /><br /><br />
      <input
        type="password"
        placeholder="Password"  style={{ marginBottom: "10px" , padding: "8px", width: "200px" , borderRadius: "4px", border: "1px solid #ccc" }}
        onChange={(e) => setPassword(e.target.value)}
      /><br /><br />
      <button style={{ padding: "8px 16px", backgroundColor: "#ffc400", color: "black", border: "none", borderRadius: "4px", cursor: "pointer" }} onClick={handleLogin}>Login</button>

      <p>
        Don't have account? <Link to="/signup" style={{color:"white"}}>Signup</Link>
      </p>
    </div>
  );
}

export default Login;