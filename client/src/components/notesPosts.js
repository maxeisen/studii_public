import React from "react";
import { Link } from "react-router-dom";
import ContentWrapper from "./contentWrapper";
import { css } from "@emotion/core";
import Bio1 from "../assets/SampleNotes/bio1.jpg";
import Bio2 from "../assets/SampleNotes/bio2.jpg";
import Log1 from "../assets/SampleNotes/log1.png";
import Log2 from "../assets/SampleNotes/log2.png";

const notesPosts = [
    {
      author: "NoteTakerMan69",
      course: "BIOL 304",
      title: "Lecture #10 Notes",
      text: "Hey all, here are the lecture notes from today's lecture on interesting things...",
      image1: Bio1,
      image2: Bio2,
      date: "November 3, 2019"
    },
    {
        author: "aCompSciStudent",
        course: "CISC 204",
        title: "Some L9 Notes",
        text: "Here are some of the notes from today's lecture on predicate logic models if anyone was interested",
        image1: Log1,
        image2: Log2,
        date: "October 30, 2019"
    }
]

const Notes = () => (
    <section id="notes">
      <ContentWrapper>
        <div>
          <div
          >
            {notesPosts.map(({ author, course, title, text, image1, image2, date }) => (
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
                  css={{
                      fontSize: "14px",
                      color: "#000000",
                      lineHeight: "20px",
                      paddingBottom: "30px"
                }}
                >
                  {text}
                </p>
                <img width="50%" src={image1} />
                <img width="50%" src={image2} />
              </div>
            ))}
          </div>
        </div>
      </ContentWrapper>
    </section>
  );

  export default Notes;