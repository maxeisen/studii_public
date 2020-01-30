import React, { useState } from "react";
import { observer, inject } from "mobx-react";
import { Link } from "react-router-dom";
import ContentWrapper from "../components/contentWrapper";
import Comment from "../components/comment";
import { css } from "@emotion/core";
import ThumbUpIcon from "../assets/Icons/thumbsup.svg";
import ThumbDownIcon from "../assets/Icons/thumbsdown.svg";
import TrashIcon from "../assets/Icons/trash.svg";
import ReplyIcon from "../assets/Icons/reply.svg";

function Post({ store }) {
  const [likedPosts, setLikedPosts] = useState([]);

  const togglePostLike = postID => {
    if (likedPosts.includes(postID)) {
      setLikedPosts(likedPosts => likedPosts.filter(x => x !== postID));
    } else {
      setLikedPosts(likedPosts => [...likedPosts, postID]);
    }
  };

  const postData = {
    postID: "1",
    author: "Student123",
    email: "student123@queensu.ca",
    course: "CISC 220",
    title: "What is a command-line interface?",
    content:
      "Hi guys, I'm reading over some notes from this week's lectures and I have no clue what a command-line interface is. Can anyone offer some help?",
    date: "November 4, 2019",
    numComments: 4,
    score: 15,
    comments: [
      {
        id: 1,
        author: "Student135",
        email: "Student135@queensu.ca",
        verified: false,
        date: "November 5, 2019",
        score: 16,
        content: "Google it",
        bestComment: true
      },
      {
        id: 2,
        author: "Tutor12",
        email: "Tutor12@queensu.ca",
        verified: true,
        date: "November 6, 2019",
        score: 12,
        content:
          "It's basically a typically text-based interface that is used to run commands at the level of the operating system. Any application that you run on your computer is actually being run through the command line beneath the surface. Often used for development, as well."
      },
      {
        id: 3,
        author: "Hill_Ross",
        email: "ross.hill@queensu.ca",
        verified: false,
        date: "November 6, 2019",
        score: -5,
        content: "boooo western bad queens good",
        bestComment: false
      },
      {
        id: 4,
        author: "Student404",
        email: "Student404@queensu.ca",
        verified: false,
        date: "November 5, 2019",
        score: 0,
        content: "I was wondering the same thing honestly...",
        bestComment: false
      }
    ]
  };

  const numResponses = postData.comments.length;

  const {
    postID,
    author,
    course,
    title,
    content,
    date,
    numComments,
    score,
    comments
  } = postData;

  return (
    <ContentWrapper>
      <h1>Discussion Post</h1>
      <Link to="/forum">Back to Forum</Link>
      <section
        id="forum"
        css={css`
          padding: 1rem;
          border: 1px solid #555;
          border-radius: 5px;
          margin: 1.5rem 0;
          button {
            border: none !important;
          }
        `}
      >
        <div
          key={title}
          css={css`
            display: flex;
            align-items: center;
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
              className={likedPosts.includes("p" + postID)}
              onClick={() => togglePostLike("p" + postID)}
              css={css`
                ${likedPosts.includes("p" + postID) ? "border-color: #555" : ""}
              `}
            >
              <img src={ThumbUpIcon} width="20px" />
            </button>
            <strong>
              {likedPosts.includes("p" + postID) ? score + 1 : score}
            </strong>
            <button>
              <img src={ThumbDownIcon} width="20px" />
            </button>
          </div>
          <div>
            <div
              css={css`
                display: flex;
                justify-content: space-between;
              `}
            >
              <h2
                css={css`
                  font-size: 16px;
                  padding-top: 8px;
                `}
              >
                <b>{author}</b> to{" "}
                <b
                  css={css`
                    color: #00a7ff;
                  `}
                >
                  {course}
                </b>
              </h2>
              <time
                css={css`
                  color: #484848;
                `}
                datetime={date}
              >
                {date}
              </time>
            </div>
            <h2
              css={css`
                font-weight: 500;
                padding-top: 10px;
              `}
            >
              {title}
            </h2>
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
          </div>
        </div>
        <div
          css={css`
            border-left: 3px solid #222;
            margin-left: 1.2rem;
            padding-left: 1.2rem;
            padding-bottom: 2rem;
          `}
        >
          <button
            css={css`
              color: black;
            `}
          >
            <img src={ReplyIcon} width="20px" /> <strong>Reply</strong>
          </button>
        </div>
        <div
          css={css`
            border-left: 3px solid #222;
            margin-left: 1.2rem;
            padding-left: 1.2rem;
          `}
        >
          <div>
            {postData.comments.map(comment => (
              <Comment
                {...comment}
                togglePostLike={togglePostLike}
                likedPosts={likedPosts}
              />
            ))}
          </div>
        </div>
        <div
          css={css`
            margin-top: 2rem;
            margin-left: 1.5rem;
          `}
        >
          <label
            css={css`
              font-weight: bold;
            `}
            htmlFor="comment"
          >
            Reply to {postData.author}
          </label>
          <br />
          <textarea
            css={css`
              margin: 1rem 0;
              padding: 1rem;
              min-width: 80%;
            `}
            id="comment"
            name="comment"
          />
          <br />
          <button
            css={css`
              color: white;
              background-color: #00a7ff;
            `}
            onClick={() => alert("API call then refresh")}
          >
            Reply
          </button>
        </div>
      </section>
    </ContentWrapper>
  );
}

export default inject(`store`)(observer(Post));
