import React from "react";
import { observer, inject } from "mobx-react";
import ThumbUpIcon from "../assets/Icons/thumbsup.svg";
import CommentIcon from "../assets/Icons/comment.svg";
import TrashIcon from "../assets/Icons/trash.svg";
import { Link } from "react-router-dom";
import { css } from "@emotion/core";

const IndividualPost = ({
  store,
  email,
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

      button,
      a.button {
        font-size: 11px;
        color: #757575;
        line-height: 20px;
        background-color: white;
        border-radius: 4px;
        border: 1px solid #ccc;
        padding: 0.3rem 0.5rem;
        margin-right: 0.5rem;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        &:hover {
          opacity: 0.75;
        }
        > * {
          display: inline-block;
          margin: 0 0.2rem;
          padding: 0;
        }
      }
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
        font-size: 20px;
        padding-top: 15px;
      `}
    >
      <strong>{author}</strong> to{" "}
      <strong
        css={css`
          color: #00a7ff;
        `}
      >
        {course}
      </strong>
    </h2>
    <Link to={`/post/${postID}`}>
      <h2
        css={css`
          font-weight: 500;
          color: #00a7ff;
          padding-top: 10px;
        `}
      >
        <strong>{title}</strong>
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
        onClick={() => setLiked(!liked)}
        css={css`
          ${liked ? "border: 2px solid #555" : "border: 2px solid #eee;"}
        `}
      >
        <img src={ThumbUpIcon} width="20px" />{" "}
        <strong>{liked ? score + 1 : score}</strong>
      </button>
      <Link to={`/post/${postID}`} class="button">
        <img
          src={CommentIcon}
          width="20px"
          css={css`
            padding-top: 7%;
          `}
        />{" "}
        <strong>{numComments}</strong>
      </Link>
      {store.UserEmail !== email ? (
        ""
      ) : (
        <button>
          <img
            src={TrashIcon}
            width="15px"
            css={css`
              padding-top: 7%;
            `}
          />{" "}
          <strong>Delete</strong>
        </button>
      )}
    </div>
  </div>
);

export default inject(`store`)(observer(IndividualPost));
