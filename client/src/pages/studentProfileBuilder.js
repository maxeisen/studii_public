import React, { useState } from "react";
import { observer, inject } from "mobx-react";
import { useHistory, Link } from "react-router-dom";
import { css } from "@emotion/core";
import ContentWrapper from "../components/contentWrapper";

function StudentProfileBuilder({ store }) {
  const [name, setName] = useState("");
  const [school, setSchool] = useState("");
  const [courses, setCourses] = useState("");
  const [program, setProgram] = useState("");
  const [gradYear, setGradYear] = useState("");
  const [studentNumber, setStudentNumber] = useState("");

  const [message, setMessage] = useState("");

  const history = useHistory();

  const submitProfile = () => {
    const data = {
      profile: {
        name: name,
        school: school,
        courses: courses,
        program: program,
        gradYear: gradYear,
        studentNumber: studentNumber
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
        <h2>Student Profile</h2>
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
              <label>School</label>
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
              <label>Program</label>
              <br />
              <input
                value={program}
                onChange={e => {
                  setProgram(e.target.value);
                }}
                type="text"
              />
            </div>
            <div
              css={css`
                margin-bottom: 1rem;
              `}
            >
              <label>Expected Graduation Year</label>
              <br />
              <input
                value={gradYear}
                onChange={e => {
                  setGradYear(e.target.value);
                }}
                type="number"
              />
            </div>
            <div
              css={css`
                margin-bottom: 1rem;
              `}
            >
              <label>Student Number</label>
              <br />
              <input
                value={studentNumber}
                onChange={e => {
                  setStudentNumber(e.target.value);
                }}
                type="number"
              />
            </div>
            <button onClick={submitProfile}>Submit</button>
          </div>
        )}
      </div>
    </ContentWrapper>
  );
}

export default inject(`store`)(observer(StudentProfileBuilder));
