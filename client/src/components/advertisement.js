import ThumbUpIcon from "../assets/Icons/thumbsup.svg";
import CommentIcon from "../assets/Icons/comment.svg";
import { Link } from "react-router-dom";
import React from "react";
import { css } from "@emotion/core";

const Advertisement = ({ title, adID, advertiser, adURL, content }) => (
  <div
    key={title}
    css={css`
      padding: 20px 20px 0px 20px;
      border: 2px solid lightgray;
      border-radius: 5px;
      margin: 20px 20px 20px 20px;
    `}
  >
    <span
      align="right"
      css={css`
        font-size: 10px;
        color: #484848;
        line-height: 20px;
      `}
    >
      Sponsored
    </span>
    <Link to={{ adURL }}>
      <h2
        css={css`
          font-weight: 500;
          color: black;
        `}
      >
        {title}
      </h2>
    </Link>
    <p
      css={`
        font-size: 14px;
        color: #000000;
        line-height: 20px;
      `}
    >
      {content}
    </p>
    <div class="flex-container"></div>
  </div>
);

export default Advertisement;
