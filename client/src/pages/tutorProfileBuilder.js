import React, { useState } from "react";
import { observer, inject } from "mobx-react";
import { useHistory, Link } from "react-router-dom";
import { css } from "@emotion/core";
import ContentWrapper from "../components/contentWrapper";

function TutorProfileBuilder({ store }) {
  const [name, setName] = useState("");
  const [school, setSchool] = useState("");
  const [affiliation, setAffiliation] = useState("");
  const [subjects, setSubjects] = useState("");

  const [message, setMessage] = useState("");

  const history = useHistory();

  const submitProfile = () => {
    const data = {
      profile: {
        name: name,
        school: school,
        affiliation: affiliation,
        subjects: subjects
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
          setMessage("Your profile has been created! Redirecting...");
          setTimeout(() => {
            history.push("/login");
          }, 3000);
        } else {
          throw new Error("Profile build failed");
        }
      })
      .catch(r => {
        setMessage("Could not create profile");
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
        <h2>Tutor Profile</h2>
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
              <label>Name</label>
              <br />
              <input
                value={name}
                onChange={e => {
                  setName(e.target.value);
                }}
                type="text"
              />
            </div>
            <div
              css={css`
                margin-bottom: 1rem;
              `}
            >
              <label>School (optional)</label>
              <br />
              <input
                value={school}
                onChange={e => {
                  setSchool(e.target.value);
                }}
                type="text"
              />
            </div>
            <div
              css={css`
                margin-bottom: 1rem;
              `}
            >
              <label>Affiliated Tutoring Service (optional)</label>
              <br />
              <input
                value={affiliation}
                onChange={e => {
                  setAffiliation(e.target.value);
                }}
                type="text"
              />
            </div>
            <button onClick={submitProfile}>Submit</button>
          </div>
        )}
      </div>
    </ContentWrapper>
  );
}

export default inject(`store`)(observer(TutorProfileBuilder));
