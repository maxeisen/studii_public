import React, { useState, useEffect } from "react";
import { observer, inject } from "mobx-react";
import { useHistory, Link } from "react-router-dom";
import { css } from "@emotion/core";
import ContentWrapper from "../components/contentWrapper";
import Select from "react-select";

function StudentProfileBuilder({ store }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [school, setSchool] = useState("Queen's University");
  const [program, setProgram] = useState("");
  const [gradYear, setGradYear] = useState("");

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

  const [message, setMessage] = useState("");

  const history = useHistory();

  const submitProfile = () => {
    const data = {
      isTutor: false,
      email,
      username: email,
      password,
      courses: selectedCourses.map(x => x.value),
      first_name: firstName,
      last_name: lastName,
      profile: {
        // name: name,
        university: school,
        program: program,
        gradYear: gradYear
      }
    };

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
          setMessage("Login failed");
        });
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
        // history.push("/login");
        // if (r.status >= 200 && r.status < 300) {
        //   setMessage("Your profile has been created! Redirecting...");
        //   setTimeout(() => {
        //     requestLogin();
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
        <h2>Create a Student Account</h2>
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
            <span>
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
            </span>
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
                margin-bottom: 0.8rem;
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
              <label>Courses</label>
              <br />
              <Select
                value={selectedCourses}
                isMulti
                onChange={setSelectedCourses}
                options={courseOptions}
              />
              {JSON.stringify(selectedCourses)}
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

export default inject(`store`)(observer(StudentProfileBuilder));
