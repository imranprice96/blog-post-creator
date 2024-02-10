import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../styles/Login.css";

const LoginPage = ({ setToken }) => {
  const url = import.meta.env.VITE_API_URL;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSumbit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${url}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    const result = await response.json();
    if (response.status == 200) {
      //console.log(result);
      localStorage.setItem("jwt-token", result.token);
      setUsername("");
      setPassword("");
      navigate("/");
      setToken(response.token);
      alert("Logged in successfully");
    } else {
      //console.log(result);
      setError(result);
    }
  };

  return (
    <div className="container">
      <div className="main-body">
        <Link to="/" className="arrow">
          &larr;
        </Link>
        <form onSubmit={handleSumbit} className="login-form">
          <label htmlFor="username">Username:</label>{" "}
          <input
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label htmlFor="password">Password:</label>{" "}
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
        <span>
          <p>{error.error}</p>
        </span>
      </div>
    </div>
  );
};

export default LoginPage;
