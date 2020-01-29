import React from "react";
import { observer, inject } from "mobx-react";
import { css } from "@emotion/core";
import ThumbUpIcon from "../assets/Icons/thumbsup.svg";
import ThumbDownIcon from "../assets/Icons/thumbsdown.svg";
import TrashIcon from "../assets/Icons/trash.svg";

const Comment = ({
  id,
  author,
  verified,
  date,
  score,
  content,
  bestComment,
  email,
  togglePostLike,
  likedPosts,
  store
}) => (
  <div
    key={id}
    css={css`
      margin: 1rem;
      display: flex;
      button {
        border: none !important;
      }
    `}
  >
    <div
      css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-right: 1rem;
        > button {
          margin: 0.7rem 0;
        }
      `}
    >
      <button
        className={likedPosts.includes("c" + id)}
        onClick={() => togglePostLike("c" + id)}
        css={css`
          ${likedPosts.includes("c" + id) ? "border-color: #555" : ""}
        `}
      >
        <img src={ThumbUpIcon} width="20px" />
      </button>
      <strong>{likedPosts.includes("c" + id) ? score + 1 : score}</strong>
      <button>
        <img src={ThumbDownIcon} width="20px" />
      </button>
    </div>
    <div
      css={css`
        flex-grow: 1;
      `}
    >
      <div
        css={css`
          display: flex;
          justify-content: space-between;
        `}
      >
        <h3
          css={css`
            padding: 0;
            margin: 0;
          `}
        >
          {author}
        </h3>
        <div
          css={css`
            display: flex;
            width: 100%;
            justify-content: space-between;
            justify-content: flex-end;
            align-items: center;
          `}
        >
          {verified ? (
            <>
              <span
                css={css`
                  color: #00a7ff;
                `}
              >
                Verified User
              </span>
              &nbsp;&bull;&nbsp;
            </>
          ) : (
            ""
          )}
          {bestComment ? (
            <>
              <span
                css={css`
                  color: green;
                `}
              >
                Best Reponse
              </span>
              &nbsp;&bull;&nbsp;
            </>
          ) : (
            ""
          )}
          <span
            css={css`
              font-size: 0.8rem;
            `}
          >
            {date}
          </span>
        </div>
      </div>
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
        {email === store.UserEmail ? (
          <button>
            <img src={TrashIcon} width="12px" /> <strong>Delete</strong>
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  </div>
);

export default inject(`store`)(observer(Comment));
