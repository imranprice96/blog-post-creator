import { useState } from "react";
import { json } from "react-router-dom";

const LoginPage = () => {
  const url = import.meta.env.VITE_API_URL;
  const key = import.meta.env.VITE_SECRET_KEY;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSumbit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${url}/login`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: json.stringify({ username, password }),
    });
    const result = await response.json();
    if (result.status() == 200) {
      console.log(result);
      localStorage.setItem("jwt-token", response.token);
      setUsername("");
      setPassword("");
    } else {
      console.log(result);
    }
  };

  return (
    <div>
      <form onSubmit={handleSumbit}>
        <label htmlFor="username">
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          Username:
        </label>
        <label htmlFor="password">
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          Password:
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
