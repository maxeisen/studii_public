import React from "react";
import { css } from "@emotion/core";

import { Link } from "react-router-dom";
import { MdMenu } from "react-icons/md";
import Logo from "../assets/Logo.svg";
import { observer, inject } from "mobx-react";

function Header({ store }) {
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
      <div
        className="searchWrapper"
        css={css`
          height: 2rem;
          img {
            max-height: 2rem;
            color: white;
          }
        `}
      >
        <Link to="/">
          <img src={Logo} />
        </Link>
      </div>
      <div className="searchWrapper">
        <input type="text" placeholder="Search..." />
      </div>
      <div>
        <Link to="/login">Login / Signup</Link>
      </div>
      <div>
        {store.UserEmail}
        <MdMenu />
      </div>
    </div>
  );
}

export default inject(`store`)(observer(Header));
