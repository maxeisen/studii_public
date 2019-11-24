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
  course,
  liked,
  setLiked
}) => (
  <div
    id={postID}
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
    <h2 css={css`font-size: 20px; padding-top: 15px;`}>
      <b>{author}</b> to <b css={css`color: #00A7FF;`}>{course}</b>
    </h2>
    <Link to={`/post/${postID}`}>
      <h2
        css={css`
          font-weight: 500;
          color: #00A7FF;
          padding-top: 10px;
        `}
      >
        <b>{title}</b>
      </h2>
    </Link>
    <p
      css={css`
        font-size: 14px;
        color: #000000;
        line-height: 20px;
        padding-top: 15px;
        padding-bottom: 15px;
      `}
    >
      {content}
    </p>
    <div class="flex-container">
      <button
        className={liked ? "liked" : ""}
        onClick={()=>setLiked(!liked)}
        css={css`
          fontsize: 14px;
          color: #757575;
          line-height: 20px;
          background-color: white;
          border-radius: 4px;
          padding: 0.2rem 0.5rem;
          ${liked ? "border: 2px solid #555" : "border: 2px solid #eee;"}
        `}
      >
        <img src={ThumbUpIcon} width="20px" />{" "}
        <b>
          <sup>{liked ? score + 1 : score}</sup>
        </b>
      </button>
      <div
        css={css`
          position: relative;
          padding-left: 2%;
          font-size: 14px;
          color: #757575;
          line-height: 20px;
        `}
      >
      <button
        css={css`
          fontsize: 14px;
          color: #757575;
          line-height: 20px;
          background-color: white;
          border-radius: 4px;
          padding: 0.2rem 0.5rem;
          border: 2px solid #eee;
        `}
      >
        <img src={CommentIcon} width="20px" css={css`padding-top: 7%;`}/>{" "}
        <b>
          <sup>{numComments}</sup>
        </b>
      </button>
    </div>
  </div>
  </div>
);

export default IndividualPost;
