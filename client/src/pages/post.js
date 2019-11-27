import React, { useEffect, useState } from "react";
import Sidebar from "../components/sidebar";
import { Link } from "react-router-dom";
import ContentWrapper from "../components/contentWrapper";
import { css } from "@emotion/core";
import ThumbUpIcon from "../assets/Icons/thumbsup.svg";
import ThumbDownIcon from "../assets/Icons/thumbsdown.svg";
import CommentIcon from "../assets/Icons/comment.svg";

export default function Post(props) {
  // TODO: fix this so it doesn't crash the app
  // useEffect(() => {
  //   setPostData({
  //     postID: "1",
  //     author: "Student123",
  //     course: "CISC 220",
  //     title: "What is a command-line interface?",
  //     content:
  //       "Hi guys, I'm reading over some notes from this week's lectures and I have no clue what a command-line interface is. Can anyone offer some help?",
  //     date: "November 4, 2019",
  //     numComments: 4,
  //     score: 15
  //   });
  // });

  const [likedPosts, setLikedPosts] = useState([]);
  const togglePostLike = postID => {
    if (likedPosts.includes(postID)) {
      setLikedPosts(likedPosts.filter(x => x !== postID));
    } else {
      setLikedPosts([...likedPosts, postID]);
    }
  };

  const postData = {
    postID: "1",
    author: "Student123",
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
        verified: false,
        date: "November 5, 2019",
        score: 16,
        content: "Google it",
        bestComment: true
      },
      {
        id: 2,
        author: "Tutor12",
        verified: true,
        date: "November 6, 2019",
        score: 12,
        content:
          "It's basically a typically text-based interface that is used to run commands at the level of the operating system. Any application that you run on your computer is actually being run through the command line beneath the surface. Often used for development, as well."
      },
      {
        id: 3,
        author: "Student420",
        verified: false,
        date: "November 6, 2019",
        score: -5,
        content: "boooo queens bad western good",
        bestComment: false
      },
      {
        id: 4,
        author: "Student404",
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
        <a href="/forum">
          <h1
            css={css`
              font-weight: 500;
              color: #00a7ff;
            `}
          >
            <b>Back to Forum</b>
          </h1>
        </a>
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
                  onClick={() => setLikedPosts("p" + postID)}
                  css={css`
                    fontsize: 14px;
                    color: #757575;
                    line-height: 20px;
                    background-color: white;
                    border-radius: 4px;
                    padding: 0.2rem 0.5rem;
                    ${likedPosts.includes("p" + postID)
                      ? "border: 2px solid #555"
                      : "border: 2px solid #eee;"}
                  `}
                >
                  <img src={ThumbUpIcon} width="20px" />{" "}
                  <b>
                    <sup>
                      {likedPosts.includes("p" + postID) ? score + 1 : score}
                    </sup>
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
                    <img
                      src={CommentIcon}
                      width="20px"
                      css={css`
                        padding-top: 7%;
                      `}
                    />{" "}
                    <b>
                      <sup>{numComments}</sup>
                    </b>
                  </button>
                </div>
              </div>
            </div>
          </div>
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
              ({ id, author, verified, date, score, content, bestComment }) => (
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
                        Best answer
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
                        fontsize: 14px;
                        color: #757575;
                        line-height: 20px;
                        background-color: white;
                        border-radius: 4px;
                        padding: 0.2rem 0.5rem;
                        ${likedPosts.includes("c" + id)
                          ? "border: 2px solid #555"
                          : "border: 2px solid #eee;"}
                      `}
                    >
                      <img src={ThumbUpIcon} width="20px" />{" "}
                      <b>
                        <sup>
                          {likedPosts.includes("c" + id) ? score + 1 : score}
                        </sup>
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
                        <img
                          src={ThumbDownIcon}
                          width="20px"
                          css={css`
                            padding-top: 7%;
                          `}
                        />{" "}
                      </button>
                    </div>
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
