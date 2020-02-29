import React, { useState } from "react";
import ContentWrapper from "../components/contentWrapper";
import Select from "react-select";
import { css } from "@emotion/core";
import EmailIcon from "../assets/Icons/email.svg";

const tutors = [
  {
    name: "Ross Hill",
    courses: ["CISC101", "CISC204"],
    email: "ross.hill@queensu.ca"
  },
  {
    name: "Max Eisen",
    courses: ["CISC332", "CISC500", "CISC204"],
    email: "max.eisen@queensu.ca"
  }
];

function Tutors() {
  const [searchVal, setSearchVal] = useState("");
  const [selectedCourses, setSelectedCourses] = useState([]);
  const courseOptions = tutors.reduce(
    (acc, val) =>
      acc.concat(
        val.courses
          .filter(course => !acc.some(x => x.value === course))
          .map(x => ({ label: x, value: x }))
      ),
    []
  );

  return (
    <ContentWrapper>
      <h2>Find a Tutor</h2>
      <div
        css={css`
          display: flex;
          padding: 1rem 0;
          > * {
            width: 50%;
            padding: 0 1rem;
          }
          * {
            margin: 0 !important;
          }
          label {
            display: block;
          }
        `}
      >
        <div>
          <label htmlFor="search">Search</label>
          <br />
          <input
            css={css`
              width: 100%;
            `}
            type="text"
            value={searchVal}
            onChange={e => setSearchVal(e.target.value)}
          />
        </div>
        <div class="fwRight">
          <label htmlFor="courses">Courses</label>
          <br />
          <Select
            value={selectedCourses}
            isMulti
            onChange={setSelectedCourses}
            options={courseOptions}
          />
        </div>
      </div>
      <table
        css={css`
          min-width: 80%;
          margin: 0 auto;
          border-collapse: collapse;
          th {
            text-align: left;
          }
          td,
          th {
            padding: 0.8rem 1.2rem;
            border-bottom: 1px solid #ccc;
          }
        `}
      >
        <thead>
          <th />
          <th>Name</th>
          <th>Courses</th>
          <th />
        </thead>
        <tbody>
          {tutors
            .filter(tutor =>
              tutor.name.toLowerCase().includes(searchVal.toLowerCase())
            )
            .filter(tutor =>
              (selectedCourses || []).every(course =>
                tutor.courses.includes(course.value)
              )
            )
            .map(tutor => (
              <tr key={tutor.name}>
                <td>Image</td>
                <td>{tutor.name}</td>
                <td>{tutor.courses.join(", ")}</td>
                <td>
                  <a
                    css={css`
                      display: inline-block;
                      background-color: #00a7ff;
                      border-radius: 3px;
                      padding: 0.2rem 0.1rem;
                      color: white;
                      display: flex;
                      justify-content: center;
                      align-items: center;
                    `}
                    href={`mailto:${tutor.email}?subject=Studii Tutor`}
                  >
                    <img
                      src={EmailIcon}
                      css={css`
                        margin-right: 0.4rem;
                        max-height: 20px;
                        max-width: 20px;
                      `}
                    />
                    Contact
                  </a>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </ContentWrapper>
  );
}

export default Tutors;
