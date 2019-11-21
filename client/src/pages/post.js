import React, { useEffect, useState } from "react";
import Sidebar from "../components/sidebar";
import { Link } from "react-router-dom";
import ContentWrapper from "../components/contentWrapper";
import { css } from "@emotion/core";
import ThumbUpIcon from "../assets/Icons/thumbsup.svg";
import CommentIcon from "../assets/Icons/comment.svg";

export default function Post( props ) {
  const [postData, setPostData] = useState({});
  useEffect(() => {
    setPostData(    
    {
      postID: "1",
      author: "Student123",
      course: "CISC 220",
      title: "What is a command-line interface?",
      content: "Hi guys, I'm reading over some notes from this week's lectures and I have no clue what a command-line interface is. Can anyone offer some help?",
      date: "November 4, 2019",
      numComments: 4,
      score: 15
    })
  })

const { postID, author, course, title, content, date, numComments, score } = postData;

  return (
    <section id="forum">
      <ContentWrapper>
        <div>
          <div
          >
              <div
                key={title}
                css={css`
                padding: 20px 20px 0px 20px;
                border: 2px solid lightgray;
                border-radius: 5px;
                margin: 20px 20px 20px 20px;
                `}
              >
                <span align= "right" css={{ fontSize: "10px", color: "#484848", lineHeight: "20px"}}>{date}</span>
                <h2
                  css={{
                    fontWeight: "500",
                    color:"black"
                  }}
                >
                  <b>{author}</b> to <b css = {{color: "#00A7FF"}}>{course}</b>
                </h2>
                <Link to={`/post/${postID}`}>
                <h2 
                css={{
                    fontWeight: "500",
                    color: "#484848",
                  }}>
                {title}
                </h2>
                </Link>
                <p
                  css={{ fontSize: "14px", color: "#000000", lineHeight: "20px" }}
                >
                  {content}
                </p>
                <div class="flex-container">
                  <div
                    css={{ fontSize: "14px", color: "#757575", lineHeight: "20px" }}
                  >
                    <img src={ThumbUpIcon} width="20px"/> <b><sup>{score}</sup></b>
                  </div>
                  <div
                    css={{ position: "relative", paddingLeft: "5%", fontSize: "14px", color: "#757575", lineHeight: "20px" }}
                  >
                    <img src={CommentIcon} width="20px" css={{ position: "absolute", top: "15%", right: "25%" }}/> <b><sup>{numComments}</sup></b>
                  
                  </div>
                </div>
              </div>
          </div>
        </div>
      </ContentWrapper>
    </section>
  );
}
