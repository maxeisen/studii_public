import React from "react";
import ReactTooltip from "react-tooltip";
import { css } from "@emotion/core";

const data = {
  name: "May White",
  degree: "Computer Science, BSc'20",
  affiliation: "Englinks at Queen's University",
  email: "may.white@queensu.ca",
  courses: ["CISC 101", "CISC 204", "CMPE 457"]
}; // TODO: replace this with an API call

const UserPopup = ({ userId }) => (
  <ReactTooltip place="top" type="light" effect="solid" id="userPopup" border>
    <div
      css={css`
        * {
          font-size: 1rem;
        }
        padding: 1rem 0.5rem;
      `}
    >
      <div
        css={css`
          display: flex;
        `}
      >
        <div
          css={css`
            background-color: #ddd;
            border-radius: 50%;
            height: 5rem;
            width: 5rem;
            margin-right: 1rem;
          `}
        />
        <div
          css={css`
            > * {
              margin-bottom: 0.5rem;
            }
          `}
        >
          <div
            css={css`
              font-size: 1.8rem;
            `}
          >
            {data.name}
          </div>
          <div
            css={css`
              color: #0058ff;
              font-weight: bold;
            `}
          >
            {data.degree}
          </div>
          <div
            css={css`
              font-style: italic;
            `}
          >
            <strong>Tutor</strong> for {data.affiliation}
          </div>
        </div>
      </div>
      <div
        css={css`
          margin: 0.5rem 0;
        `}
      >
        <strong>Email</strong>: {data.email}
      </div>
      <div>
        <strong>Courses</strong>: {data.courses.join(", ")}
      </div>
    </div>
  </ReactTooltip>
);

export default UserPopup;
