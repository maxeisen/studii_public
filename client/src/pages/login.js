import React, { useState } from "react";
import { observer, inject } from "mobx-react";
import { useHistory, Link } from "react-router-dom";
import { css } from "@emotion/core";
import ContentWrapper from "../components/contentWrapper";

function Login({ store }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");

  const history = useHistory();

  const requestLogin = () => {
    const data = { username: email, password };
    fetch("http://localhost:8000/userauth/login/", {
      method: "POST",
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(r => r.json())
      .then(r => {
        if (r.token) {
          setMessage("You're logged in! Redirecting...");
          store.SetToken(r.token);
          store.SetIsStudent(!r.user.isTutor);
          store.SetUserId(r.user.id);
          store.SetEmail(email);
          history.push("/forum");
        } else {
          throw new Error("No token received");
        }
      })
      .catch(r => {
        setMessage("Wrong username or password");
      });
  };

  return (
    <ContentWrapper>
      <div
        css={css`
          max-width: 400px;
          margin: 0 auto;
        `}
      >
        <h2>Login</h2>
        {message ? (
          message
        ) : (
          <div
            css={css`
              padding: 1rem;
              margin-top: 0.5rem;
              border: 1px solid #ccc;
            `}
          >
            <div
              css={css`
                margin-bottom: 1rem;
              `}
            >
              <label>Email</label>
              <br />
              <input
                value={email}
                onChange={e => {
                  setEmail(e.target.value);
                }}
                type="text"
              />
            </div>
            <div
              css={css`
                margin-bottom: 1rem;
              `}
            >
              <label>Password</label>
              <br />
              <input
                value={password}
                onChange={e => {
                  setPassword(e.target.value);
                }}
                type="password"
              />
            </div>
            <button onClick={requestLogin}>Login</button>
          </div>
        )}
      </div>
      <div
        css={css`
          text-align: center;
          margin-top: 1rem;
        `}
      >
        Need to make an account? <Link to="/signup">Sign up</Link>
      </div>
    </ContentWrapper>
  );
}

export default inject(`store`)(observer(Login));
