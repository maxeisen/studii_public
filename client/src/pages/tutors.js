import React, { useState } from "react";
import ContentWrapper from "../components/contentWrapper";
import Select from "react-select";
import { css } from "@emotion/core";
import EmailIcon from "../assets/Icons/email.svg";

import ross from "../assets/headshots/ross.jpeg";
import max from "../assets/headshots/max.jpeg";
import carolyn from "../assets/headshots/carolyn.jpeg";
import patrick from "../assets/headshots/patrick.jpeg";
import connor from "../assets/headshots/connor.png";
import shwetha from "../assets/headshots/shwetha.jpeg";
import andrew from "../assets/headshots/andrew.jpeg";
import kevin from "../assets/headshots/kevin.jpeg";
import liat from "../assets/headshots/liat.jpeg";
import jordan from "../assets/headshots/jordan.jpeg";
import rachel from "../assets/headshots/rachel.jpeg";


const tutors = [
  {
    name: "Ross Hill",
    courses: ["CISC 101", "CISC 204"],
    email: "ross.hill@queensu.ca",
    image: ross
  },
  {
    name: "Max Eisen",
    courses: ["CISC 332", "CISC 500", "CISC 204"],
    email: "max.eisen@queensu.ca",
    image: max
  },
  {
    name: "Carolyn Day",
    courses: ["CMPE 323", "CMPE 324", "CMPE 432"],
    email: "carolyn.day@queensu.ca",
    image: carolyn
  },
  {
    name: "Patrick Lenover",
    courses: ["CMPE 332", "ELEC 323", "CISC 101"],
    email: "patrick.lenover@queensu.ca",
    image: patrick
  },
  {
    name: "Connor Colwill",
    courses: ["CISC 101", "CISC 102", "CISC 204"],
    email: "connor.colwill@queensu.ca",
    image: connor
  },
  {
    name: "Kevin Ding",
    courses: ["COMM 304", "COMM 234", "ENIN 300"],
    email: "kevin.ding@queensu.ca",
    image: kevin
  },
  {
    name: "Andrew Simmons",
    courses: ["ENIN 200", "ENIN 300"],
    email: "andrew.simmons@queensu.ca",
    image: andrew
  },
  {
    name: "Shwetha Sivakumar",
    courses: ["CMPE 332", "CMPE 223", "CMPE 499"],
    email: "shwetha.rd@queensu.ca",
    image: shwetha
  },
  {
    name: "Jordan Abramsky",
    courses: ["COMM 402", "COMM 356", "COMM 103"],
    email: "jordan.abramsky@queensu.ca",
    image: jordan
  },
  {
    name: "Rachel Phinnemore",
    courses: ["CISC 332", "CISC 500", "CISC 101", "CISC 497"],
    email: "rachel.phinnemore@queensu.ca",
    image: rachel
  },
  {
    name: "Liat Fainman-Adelman",
    courses: ["COMM 400", "COMM 305", "COMM 102"],
    email: "liat.fainman@queensu.ca",
    image: liat
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
                <td><img src={tutor.image} css={css`width: 125px; height: 125px; object-fit: cover; border-radius: 50%`}/></td>
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
                    href={`mailto:${tutor.email}?subject=Tutoring Inquiry from Studii`}
                  >
                    <img
                      src={EmailIcon}
                      css={css`
                        margin-left: 0.2rem;
                        margin-right: 0.4rem;
                        max-height: 20px;
                        max-width: 20px;
                      `}
                    />
                    <p css={css`padding-right: 3px`}>Contact</p>
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
