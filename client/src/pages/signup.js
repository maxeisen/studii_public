import React, { useState } from "react";
import { observer, inject } from "mobx-react";
import { useHistory, Link } from "react-router-dom";
import { css } from "@emotion/core";
import ContentWrapper from "../components/contentWrapper";

function Signup({ store }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");

  const history = useHistory();

  const requestStudentSignup = () => {
    const data = {
      email,
      username: email,
      password,
      first_name: "test",
      last_name: "test",
      profile: {

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
        if (r.status >= 200 && r.status < 300) {
          setMessage("You're signed up! Redirecting...");
          setTimeout(() => {
            history.push("/studentProfile");
          }, 3000);
        } else {
          throw new Error("Signup failed");
        }
      })
      .catch(r => {
        setMessage("Could not create account");
      });
  };

  const requestTutorSignup = () => {
    const data = {
      email,
      username: email,
      password
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
        if (r.status >= 200 && r.status < 300) {
          setMessage("You're signed up! Redirecting...");
          setTimeout(() => {
            history.push("/tutorProfile");
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
    <ContentWrapper>
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
            <div
              css={css`
                padding-top: 10px,
                margin-left: auto,
                margin-right: auto,
                display: center
              `}>
              <label>
                I am a...
              </label>
            </div>
            <div id="outer">
              <button class="inner" onClick={requestStudentSignup}>Student</button>
              <button class="inner" onClick={requestTutorSignup}>Tutor</button>
            </div>
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
    </ContentWrapper>
  );
}

export default inject(`store`)(observer(Signup));
