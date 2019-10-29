import React from "react";
import { Link } from "react-router-dom";
import { MdMenu } from "react-icons/md";

function Header() {
  return (
    <div
      style={{
        height: "3rem",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        borderBottom: "1px solid #ccc"
      }}
    >
      <div>
        <Link to="/" style={{ color: "black" }}>
          Studii
        </Link>
      </div>
      <div>
        <em>Your school</em>
      </div>
      <div>
        <input type="text" placeholder="Search..." />
      </div>
      <div>
        <Link to="/login">Login / Signup</Link>
      </div>
      <div>
        <MdMenu />
      </div>
    </div>
  );
}

export default Header;
