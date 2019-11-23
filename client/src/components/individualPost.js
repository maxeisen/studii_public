import React from "react";
import ThumbUpIcon from "../assets/Icons/thumbsup.svg";
import CommentIcon from "../assets/Icons/comment.svg";
import { Link } from "react-router-dom";
import { css } from "@emotion/core";

const IndividualPost = ({
  title,
  postID,
  score,
  author,
  content,
  numComments,
  date,
  course
}) => (
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
      {date}
    </span>
    <h2
      css={css`
        font-weight: 500;
        color: black;
      `}
    >
      <b>{author}</b> to <b css={css`color: "#00A7FF;`}>{course}</b>
    </h2>
    <Link to={`/post/${postID}`}>
      <h2
        css={css`
          font-weight: 500;
          color: #484848;
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
    <div class="flex-container">
      <div
        css={css`
          fontsize: 14px;
          color: #757575;
          line-height: 20px;
        `}
      >
        <img src={ThumbUpIcon} width="20px" />{" "}
        <b>
          <sup>{score}</sup>
        </b>
      </div>
      <div
        css={css`
          position: relative;
          padding-left: 5%;
          font-size: 14px;
          color: #757575;
          line-height: 20px;
        `}
      >
        <img
          src={CommentIcon}
          width="20px"
          css={css`
            position: absolute;
            top: 15%;
            right: 25%;
          `}
        />{" "}
        <b>
          <sup>{numComments}</sup>
        </b>
      </div>
    </div>
  </div>
);

export default IndividualPost;
