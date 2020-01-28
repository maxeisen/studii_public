import React, { useState } from "react";
import { observer, inject } from "mobx-react";
import { Link } from "react-router-dom";
import ContentWrapper from "../components/contentWrapper";
import { css } from "@emotion/core";
import ThumbUpIcon from "../assets/Icons/thumbsup.svg";
import ThumbDownIcon from "../assets/Icons/thumbsdown.svg";
import TrashIcon from "../assets/Icons/trash.svg";
import CommentIcon from "../assets/Icons/comment.svg";

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
    <section id="forum">
      <ContentWrapper>
        <Link to="/forum">
          <h1
            css={css`
              font-weight: 500;
              color: #00a7ff;
            `}
          >
            <b>Back to Forum</b>
          </h1>
        </Link>
        <div>
          <div>
            <div
              key={title}
              css={css`
                padding: 20px 20px 0px 20px;
                border: 2px solid black;
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
                  font-size: 20px;
                  padding-top: 15px;
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
              <h2
                css={css`
                  font-weight: 500;
                  padding-top: 10px;
                `}
              >
                <b>{title}</b>
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
              <div class="flex-container">
                <button
                  className={likedPosts.includes("p" + postID)}
                  onClick={() => togglePostLike("p" + postID)}
                  css={css`
                    ${likedPosts.includes("p" + postID)
                      ? "border-color: #555"
                      : ""}
                  `}
                >
                  <img src={ThumbUpIcon} width="20px" />{" "}
                  <strong>
                    {likedPosts.includes("p" + postID) ? score + 1 : score}
                  </strong>
                </button>

                <button>
                  <img
                    src={CommentIcon}
                    width="20px"
                    css={css`
                      padding-top: 7%;
                    `}
                  />{" "}
                  <strong>{numComments}</strong>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          css={css`
            padding: 1.5rem;
          `}
        >
          <label
            css={css`
              font-weight: bold;
            `}
            htmlFor="comment"
          >
            Comment
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
              color: #333;
            `}
            onClick={() => alert("API call then refresh")}
          >
            Submit
          </button>
        </div>
        <div>
          <h1
            css={css`
              padding-top: 35px;
            `}
          >
            {numResponses} Responses
          </h1>
          <div>
            {postData.comments.map(
              ({
                id,
                author,
                verified,
                date,
                score,
                content,
                bestComment,
                email
              }) => (
                <div
                  key={title}
                  css={css`
                    width: 80%;
                    padding: 20px 20px 0px 20px;
                    border: 2px solid lightgray;
                    border-radius: 5px;
                    margin: 20px auto 20px auto;
                    ${verified ? "border-color: #8ed8ff;" : ""}
                    ${bestComment ? "border-color: lightgreen;" : ""}
                  `}
                >
                  <div
                    css={css`
                      display: flex;
                      justify-content: space-between;
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
                    {verified ? (
                      <span
                        align="right"
                        css={css`
                          direction: rtl;
                          text-align: right;
                          font-size: 15px;
                          color: #00a7ff;
                          line-height: 20px;
                        `}
                      >
                        Verified User
                      </span>
                    ) : (
                      ""
                    )}
                    {bestComment ? (
                      <span
                        align="right"
                        css={css`
                          direction: rtl;
                          text-align: right;
                          font-size: 15px;
                          color: green;
                          line-height: 20px;
                        `}
                      >
                        Best Reponse
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                  <h1
                    css={css`
                      padding-top: 10px;
                    `}
                  >
                    <b>{author}</b> to <b>{postData.author}</b>
                  </h1>
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
                      className={
                        likedPosts.includes("c" + id) ? "commentLiked" : ""
                      }
                      onClick={() => togglePostLike("c" + id)}
                      css={css`
                        ${likedPosts.includes("c" + id)
                          ? "border-color: #555;"
                          : ""}
                      `}
                    >
                      <img src={ThumbUpIcon} width="20px" />{" "}
                      <strong>
                        {likedPosts.includes("c" + id) ? score + 1 : score}
                      </strong>
                    </button>

                    <button>
                      <img
                        src={ThumbDownIcon}
                        width="20px"
                        css={css`
                          padding-top: 7%;
                        `}
                      />{" "}
                    </button>

                    {email === store.UserEmail ? (
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
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </ContentWrapper>
    </section>
  );
}

export default inject(`store`)(observer(Post));
