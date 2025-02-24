import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const { data } = await axios.post("http://localhost:5000/api/register", values);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
      setLoading(false);
    }
  };

  // Updated container style to use new GIF background instead of gradient
  const containerStyle = {
    display: "flex",
    height: "100vh",
    justifyContent: "center",
    alignItems: "center",
    background: "url('https://mir-s3-cdn-cf.behance.net/project_modules/1400/17421a104128975.5f5bdc0d6d121.gif') center center / cover no-repeat",
  };

  const boxStyle = {
    padding: "50px", // increased padding from 40px
    borderRadius: "15px",
    background: "rgba(255,255,255,0.1)",
    boxShadow: "0 8px 32px 0 rgba(31,38,135,0.37)",
    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)",
    border: "1px solid rgba(255,255,255,0.18)",
    width: "360px", // increased width from 320px
    color: "#fff",
    textAlign: "center",
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    border: "none",
    borderRadius: "5px",
    background: "rgba(255,255,255,0.2)",
    color: "#fff",
  };

  const buttonStyle = {
    width: "100%",
    padding: "10px",
    margin: "20px 0",
    border: "none",
    borderRadius: "5px",
    background: "linear-gradient(135deg, #1e3c72, #ff6f91)",
    color: "#fff",
    cursor: "pointer",
  };

  return (
    <div style={containerStyle}>
      <div style={boxStyle}>
        <h2>Registration</h2>
        {error && <p>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            style={inputStyle}
            type="text"
            name="name"
            placeholder="Name"
            value={values.name}
            onChange={handleChange}
            required
          />
          <input
            style={inputStyle}
            type="email"
            name="email"
            placeholder="Email"
            value={values.email}
            onChange={handleChange}
            required
          />
          <input
            style={inputStyle}
            type="password"
            name="password"
            placeholder="Password"
            value={values.password}
            onChange={handleChange}
            required
          />
          <button style={buttonStyle} type="submit" disabled={loading}>
            {loading ? "Signing up..." : "Signup"}
          </button>
        </form>
        <p style={{ cursor: "pointer", textDecoration: "underline" }} onClick={() => navigate("/login")}>
          Go to Login
        </p>
      </div>
    </div>
  );
};

export default Register;