import React from "react";
import { css } from "@emotion/core";

import { Link } from "react-router-dom";
import { MdMenu } from "react-icons/md";
import Logo from "../assets/Logo.svg";

function Header() {
  return (
    <div
      css={css`
        height: 3rem;
        display: flex;
        justify-content: space-around;
        align-items: center;
        border-bottom: 1px solid #ccc;
      `}
    >
      <div>
        <Link
          to="/"
          css={css`
            color: black;
          `}
        >
          <img src={Logo} />
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
