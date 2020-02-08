import React from "react";
import ContentWrapper from "../components/contentWrapper";
import { css } from "@emotion/core";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div
      css={css`
        > .landingPageTop {
          width: 100%;
          height: 100vh;
        }
      `}
    >
      <div class="landingPageTop">
        <div
          css={css`
            height: 3rem;
            margin: 0 1rem;
            display: flex;
            justify-content: flex-end;
            align-items: center;
            a,
            span {
              color: white;
              font-size: 1.5rem;
              text-decoration: none;
              padding: 0 0.2rem;
            }
            a {
              text-shadow: 1px 1px 2px rgba(50, 50, 50, 0.3);
            }
            a:hover {
              text-decoration: underline;
            }
          `}
        >
          <Link to="/login">Login</Link>
          <span>|</span>
          <Link to="/signup">Sign Up</Link>
        </div>
        <div
          css={css`
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            position: relative;
            top: 40%;
            transform: translateY(-50%);
          `}
        >
          <img src={require("../assets/Logo_small.png")} />
          <div
            css={css`
              height: 1rem;
              width: 12rem;
              background-color: #00a7ff;
              margin: 1rem 0;
            `}
          />
          <div
            css={css`
              font-weight: bold;
            `}
          >
            A collaborative study space for students
          </div>
        </div>
        <div
          css={css`
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
          `}
        >
          <img src={require("../assets/chevronDown.svg")} />
        </div>
      </div>
      <ContentWrapper>
        <div
          css={css`
            > section {
              margin: 2rem 0;
              display: flex;
              align-items: center;
              justify-content: space-between;
            }
            > section > div {
              width: 50%;
              text-align: center;
            }
            h2 {
              margin-bottom: 1rem;
            }
          `}
        >
          <section>
            <div>
              <img src={require("../assets/personAtDesk.png")} />
            </div>
            <div>
              <h2>A study space made by students, for students.</h2>
              <p css={css`line-height: 25px;`}>
              For all your course questions, we offer a collaborative forum that
              provides both peer support and expert advice. With our open and closed
              subforums, you can get answers to any question you have.
              </p>
            </div>
          </section>
          <section>
            <div>
              <h2>An emphasis on collaborative learning</h2>
              <p css={css`line-height: 25px;`}>
              Get answers from verified experts who know what they’re talking about.
              Build up your reputation so you can become a verified contributor.
              Group up with other students  who are studying the same courses
              Get matched with an expert tutor if your group needs some extra help.


              </p>
            </div>
            <div>
              <img src={require("../assets/people.png")} />
            </div>{" "}
          </section>
        </div>
      </ContentWrapper>
    </div>
  );
}

export default Home;
