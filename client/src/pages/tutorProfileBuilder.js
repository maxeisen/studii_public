import React, { useState, useEffect } from "react";
import { observer, inject } from "mobx-react";
import { useHistory, Link } from "react-router-dom";
import { css } from "@emotion/core";
import ContentWrapper from "../components/contentWrapper";
import Select from "react-select";

function TutorProfileBuilder({ store }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [school, setSchool] = useState("");
  const [affiliation, setAffiliation] = useState("");
  const [subjects, setSubjects] = useState("");

  const [message, setMessage] = useState("");

  const history = useHistory();

  const [courseOptions, setCourseOptions] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);

  const [areCoursesFetched, setAreCoursesFetched] = useState(false);

  useEffect(() => {
    if (!areCoursesFetched) {
      const getData = async () => {
        const data = await fetch(
          "http://localhost:8000/posts/courses/"
        ).then(r => r.json());
        setCourseOptions(
          data.map(x => ({
            label: `${x.courseCode} - ${x.name}`,
            value: x.url
          }))
        );
        setAreCoursesFetched(true);
      };
      getData();
    }
  }, [areCoursesFetched]);

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

  const submitProfile = () => {
    const data = {
      isTutor: true,
      email,
      username: email,
      password,
      first_name: firstName,
      last_name: lastName,
      courses: selectedCourses.map(x => x.value),
      profile: {
        university: school,
        affiliation: affiliation,
        // studentNumber: studentNumber
        // program: program,
        // gradYear: gradYear,
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
        // console.log(r);
        requestLogin();
        // if (r.status >= 200 && r.status < 300) {
        //   setMessage("Your profile has been created! Redirecting...");
        //   setTimeout(() => {
        //     history.push("/login");
        //   }, 3000);
        // } else {
        //   throw new Error("Profile build failed");
        // }
      })
      .catch(r => {
        // console.log(r);
        setMessage("Logging you in...");
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
        <h2>Create a Tutor Account</h2>
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
                margin-bottom: 1rem;
              `}
            >
              <label>First Name</label>
              <br />
              <input
                value={firstName}
                onChange={e => {
                  setFirstName(e.target.value);
                }}
                type="text"
              />
            </div>
            <div
              css={css`
                margin-bottom: 1rem;
              `}
            >
              <label>Last Name</label>
              <br />
              <input
                value={lastName}
                onChange={e => {
                  setLastName(e.target.value);
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
              <label>Courses</label>
              <br />
              <Select
                value={selectedCourses}
                isMulti
                onChange={setSelectedCourses}
                options={courseOptions}
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
            <button
              css={css`
                background-color: #5fc8ff;
                color: #ffffff;
              `}
              onClick={submitProfile}
            >
              Submit
            </button>
          </div>
        )}
      </div>
    </ContentWrapper>
  );
}

export default inject(`store`)(observer(TutorProfileBuilder));
