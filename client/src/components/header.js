import React from "react";
import { css } from "@emotion/core";

import { Link, useHistory } from "react-router-dom";

import { MdPerson } from "react-icons/md";
import Logo from "../assets/Logo.png";
import { observer, inject } from "mobx-react";

function Header({ store }) {

  const history = useHistory();

  const logout = () => {
    store.SetEmail("");
    store.SetToken("");
    history.push("/");
  };
  return (
    <div
      css={css`
        color: white;
        background-color: #00a7ff;
        height: 3rem;
        display: flex;
        justify-content: space-around;
        align-items: center;
        border-bottom: 1px solid #ccc;
        margin-bottom: 2rem;
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
        {!store.UserEmail ? (
          <Link to="/login">Login / Signup</Link>
        ) : (
          <div
            css={css`
              display: flex;
              justify-content: space-around;
              align-items: center;
              * {
                margin-left: 0.5rem;
              }
            `}
          >
            <span
              css={css`
                font-size: 2rem;
              `}
            >
              <MdPerson />
            </span>
            <span>{store.UserEmail}</span>
            <span>
              <button onClick={logout}>Log out</button>
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default inject(`store`)(observer(Header));
