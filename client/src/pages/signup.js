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
    history.push("/studentProfile");
    // const data = {
    //   email,
    //   username: email,
    //   password,
    //   first_name: "test",
    //   last_name: "test",
    //   profile: {

    //   }
    // };
    // fetch("http://localhost:8000/userauth/users/", {
    //   method: "POST",
    //   mode: "cors", // no-cors, *cors, same-origin
    //   cache: "no-cache",
    //   credentials: "same-origin",
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify(data)
    // })
    //   .then(r => r.json())
    //   .then(r => {
    //     if (r.status >= 200 && r.status < 300) {
    //       setMessage("You're signed up! Redirecting...");
    //       setTimeout(() => {
    //         history.push("/studentProfile");
    //       }, 3000);
    //     } else {
    //       throw new Error("Signup failed");
    //     }
    //   })
    //   .catch(r => {
    //     setMessage("Could not create account");
    //   });
  };

  const requestTutorSignup = () => {
    history.push("/tutorProfile");
    // const data = {
    //   email,
    //   username: email,
    //   password
    // };
    // fetch("http://localhost:8000/userauth/users/", {
    //   method: "POST",
    //   mode: "cors", // no-cors, *cors, same-origin
    //   cache: "no-cache",
    //   credentials: "same-origin",
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify(data)
    // })
    //   .then(r => r.json())
    //   .then(r => {
    //     if (r.status >= 200 && r.status < 300) {
    //       setMessage("You're signed up! Redirecting...");
    //       setTimeout(() => {
            
    //       }, 3000);
    //     } else {
    //       throw new Error("Signup failed");
    //     }
    //   })
    //   .catch(r => {
    //     setMessage("Could not create account");
    //   });
  };

  return (
    <ContentWrapper>
      <div
        css={css`
          max-width: 400px;
          margin: 0 auto;
        `}
      >
        <h2>Account Type</h2>
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
                padding-top: 10px,
                margin-left: auto,
                margin-right: auto,
                display: center
              `}>
            </div>
            <p css={css`
                color: #949292;
                padding-bottom: 20px
                `}>
              Are you a student or a tutor?
            </p>
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
