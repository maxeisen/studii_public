import React from "react";
import { Link } from "react-router-dom";
import ContentWrapper from "./contentWrapper";
import { css } from "@emotion/core";

const forumPosts = [
    {
      author: "Student123",
      course: "CISC 220",
      title: "What is a command-line interface?",
      content: "Hi guys, I'm reading over some notes from this week's lectures and I have no clue what a command-line interface is. Can anyone offer some help?",
      date: "November 4, 2019"
    },
    {
      author: "MEisen",
      course: "CISC 365",
      title: "Wtf is Huffman Encoding?",
      content: "Really struggling with this assignment. Someone please tell me how to implement this Huffman Encoding algorithm cause I have no clue what I'm doing. Thanks!",
      date: "October 29, 2019"
    },
    {
    author: "ConnorTheFrosh",
    course: "General",
    title: "What exactly is computer science? and why am I studying it",
    content: "I'm starting to rethink this whole becoming a compsci major thing. Anyone have any advice?",
    date: "October 26, 2019"
    },
    {
      author: "Hill_Ross",
      course: "CISC 499",
      title: "Can I get some thesis suggestions? I'm lost",
      content: "Just read the title. Anything helps!!!",
      date: "October 20, 2019"
    },
    {
      author: "PattyLen",
      course: "General",
      title: "Django vs. Django Unchained",
      content: "Is Django (Python framework) named after Django Unchained (movie), or vice versa. I know it's gotta be one or the other, just don't know which. Please help!",
      date: "October 18, 2019"
    }
]

const Forum = () => (
    <section id="forum">
      <ContentWrapper>
        <div>
          <div
          >
            {forumPosts.map(({ author, course, title, content, date }) => (
              <div
                key={title}
                css={css`
                padding: 20px 20px 20px 20px;
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
                <h2 
                css={{
                    fontWeight: "500",
                    color: "#484848",
                    paddingBottom: "10px"
                  }}>
                {title}
                </h2>
                <p
                  css={{ fontSize: "14px", color: "#000000", lineHeight: "20px" }}
                >
                  {content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </ContentWrapper>
    </section>
  );

  export default Forum;