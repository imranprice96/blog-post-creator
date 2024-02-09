import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import styled from "styled-components";

function Navbar() {
  return (
    <>
      <div className="topnav">
        <Link to="/">
          <h1>Blog-Posts</h1>
        </Link>
      </div>
    </>
  );
}

export default Navbar;
