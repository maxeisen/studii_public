import React, { useState } from "react";
import { observer, inject } from "mobx-react";
import { useHistory, Link } from "react-router-dom";
import { css } from "@emotion/core";

function Signup({ store }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");

  const history = useHistory();

  const requestSignup = () => {
    const data = {
      email,
      username: email,
      password,
      first_name: "Example",
      last_name: "Test",
      profile: {
        university: "Queen's",
        program: "Testing",
        gradYear: 2020
      }
    };
    fetch("http://localhost:8000/userauth/users/", {
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
        if (r.ok) {
          setMessage("You're signed up! Redirecting...");
          setTimeout(() => {
            history.push("/login");
          }, 3000);
        } else {
          throw new Error("Signup failed");
        }
      })
      .catch(r => {
        setMessage("Could not create account");
      });
  };

  return (
    <div>
      <div
        css={css`
          max-width: 400px;
          margin: 0 auto;
        `}
      >
        <h2>Signup</h2>
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
              <label>email</label>
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
            <button onClick={requestSignup}>Signup</button>
          </div>
        )}
      </div>
      <div
        css={css`
          text-align: center;
          margin-top: 1rem;
        `}
      >
        Already have an account? <Link to="/login">Log in</Link>
      </div>
    </div>
  );
}

export default inject(`store`)(observer(Signup));
