// src/pages/Signup.js
/*import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/signup", form);
      alert("Registration successful!");
      navigate("/login");
    } catch (err) {
      alert("Error registering user");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
          required
        />
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
        <button type="submit">Signup</button>
      </form>
      <p>Already have account? <Link to="/login">Login</Link></p>
    </div>
  );
}

const styles = {
  container: { textAlign: "center", marginTop: "100px" },
  form: { display: "flex", flexDirection: "column", gap: "10px", width: "250px", margin: "auto" }
};

export default Signup;
*/

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    await fetch(`${process.env.REACT_APP_API_URI}/api/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    alert("Signup successful");
    navigate("/");
  };

  return (
    <div className="glass-card" style={{ textAlign: "center", marginTop: "100px" }}>
      <h2 style={{color:"white", fontSize:"30px", fontWeight:"bold"}}>Signup</h2>
      <input
        type="text"
        placeholder="Name"  style={{ marginBottom: "10px" , padding: "8px", width: "200px" , borderRadius: "4px", border: "1px solid #ccc" }}
        onChange={(e) => setName(e.target.value)}
      /><br /><br />
      <input
        type="email"
        placeholder="Email"  style={{ marginBottom: "10px" , padding: "8px", width: "200px" , borderRadius: "4px", border: "1px solid #ccc" }}
        onChange={(e) => setEmail(e.target.value)}
      /><br /><br />
      <input
        type="password"
        placeholder="Password"  style={{ marginBottom: "10px" , padding: "8px", width: "200px" , borderRadius: "4px", border: "1px solid #ccc" }}
        onChange={(e) => setPassword(e.target.value)}
      /><br /><br />
      <button style={{ padding: "8px 16px", backgroundColor: "#ffc400", color: "black", border: "none", borderRadius: "4px", cursor: "pointer" }}  onClick={handleSignup}>Signup</button>

      <p>
        Already have account? <Link to="/" style={{color:"white"}}>Login</Link>
      </p>
    </div>
  );
}

export default Signup;