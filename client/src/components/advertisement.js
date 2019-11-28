import ThumbUpIcon from "../assets/Icons/thumbsup.svg";
import CommentIcon from "../assets/Icons/comment.svg";
import { Link } from "react-router-dom";
import React from "react";
import { css } from "@emotion/core";

const Advertisement = ({ adID, title, advertiser, adUrl, content }) => (
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
        font-size: 13px;
        color: #0000EE;
        line-height: 20px;
      `}
    >
      <a href={adUrl}>
        Sponsored
      </a>
    </span>
      <h2 css={css`padding-top: 10px`}>
        <a href={adUrl}>{title}</a>
      </h2>
    <p
      css={css`
        font-size: 14px;
        color: #000000;
        line-height: 20px;
        padding-top: 15px;
      `}
    >
      {content}
    </p>
    <div class="flex-container"></div>
  </div>
);

export default Advertisement;
