import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import { useEffect, useState } from "react";

function Navbar({ setToken }) {
  const token = localStorage.getItem("jwt-token");
  const logout = () => {
    setToken(null);
    localStorage.removeItem("jwt-token");
    alert("Logged out successfully");
  };

  if (token == null) {
    return (
      <>
        <div className="topnav">
          <div className="nav-container">
            <Link to="/" id="title">
              <h1>Blog-Posts</h1>
            </Link>
            <span className="nav-info">
              <p className="signed-out">Signed out</p>
              <Link to="login" id="login">
                <button>Login</button>
              </Link>
            </span>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="topnav">
          <div className="nav-container">
            <Link to="/" id="title">
              <h1>Blog-Posts</h1>
            </Link>
            <span className="nav-info">
              <p className="signed-in">Signed in</p>
              <button onClick={logout}>Logout</button>
            </span>
          </div>
        </div>
      </>
    );
  }
}

export default Navbar;
