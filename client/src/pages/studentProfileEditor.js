import React, { useState, useEffect } from "react";
import { observer, inject } from "mobx-react";
import { useHistory, Link } from "react-router-dom";
import { css } from "@emotion/core";
import ContentWrapper from "../components/contentWrapper";
import Select from "react-select";

function StudentProfileEditor({ store }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [school, setSchool] = useState("Queen's University");
  const [program, setProgram] = useState("");
  const [gradYear, setGradYear] = useState("");

  const [courseOptions, setCourseOptions] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  
  const [areCoursesFetched, setAreCoursesFetched] = useState(false);
  const [isProfileFetched, setIsProfileFetched] = useState(false);


  useEffect(() => {
  if (!isProfileFetched && store.UserId) {
    const getData = async () => {

      const tempProfile = await fetch(
        `http://localhost:8000/userauth/users/${store.UserId}/`,
        {
          mode: 'cors', // no-cors, *cors, same-origin
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${store.UserToken}`
          },
        }
      ).then(r => r.json());

      setIsProfileFetched(true);

      setFirstName(tempProfile.first_name)
      setLastName(tempProfile.last_name)
      setProgram(tempProfile.profile.program)
      setGradYear(tempProfile.profile.gradYear)
      }
      getData();
    }
  },
  [store.UserId, isProfileFetched]
  )

  useEffect(() => {
    if (!areCoursesFetched) {
      const getData = async () => {

        const availableCourses = await fetch(
          "http://localhost:8000/posts/courses/"
        ).then(r => r.json());

        const chosenCourses = await fetch(
          `http://localhost:8000/posts/enrolled/${store.UserId}/`,
          {
            mode: 'cors', // no-cors, *cors, same-origin
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Token ${store.UserToken}`
            },
          }
        ).then(r => r.json());

        setEnrolledCourses(
          chosenCourses.map(x => ({
            label: x.courseCode + " - " + x.name,
            value: x.url
          }))
        );
        
        setCourseOptions(
          availableCourses.results.map(x => ({
            label: x.courseCode + " - " + x.name,
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
      accountType: "student",
      courses: enrolledCourses.map(x => x.value),
      first_name: firstName,
      last_name: lastName,
      profile: {
        // name: name,
        university: school,
        program: program,
        gradYear: gradYear
      }
    };

    fetch(`http://localhost:8000/userauth/users/${ store.UserId}/`, {
      method: "PATCH",
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Token ${store.UserToken}`
      },
      body: JSON.stringify(data)
    })
      .then(r => r.json())
      .then(r => {
        console.log(r);
        history.push("/login");
        if (r.status >= 200 && r.status < 300) {
          setMessage("Your profile has been edited! Redirecting...");
          setTimeout(() => {
            history.push("/login");
          }, 3000);
        } else {
          throw new Error("Profile build failed");
        }
      })
      .catch(r => {
        console.log(r);
        setMessage("Could not edit profile");
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
        <h2>Your Student Profile</h2>
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
                value={enrolledCourses}
                isMulti
                onChange={setEnrolledCourses}
                options={courseOptions}
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

export default inject(`store`)(observer(StudentProfileEditor));
