import React, { useState, useEffect } from "react";
import { observer, inject } from "mobx-react";
import ContentWrapper from "./contentWrapper";
import { css } from "@emotion/core";
import Advertisement from "../components/advertisement";
import IndividualPost from "../components/individualPost";
import Select from "react-select";

const adFrequency = 3;
const adCluster = [
  {
    adId: 1,
    title: "EngLinks Tutoring",
    advertiser: "EngLinks",
    adUrl: "https://englinks.ca/",
    content:
      "Queen's Engineering students tutoring and providing resources for other Queen's Engineering students!"
  },
  {
    adId: 2,
    title: "ArtSci Students... ASUS is here to help!",
    advertiser: "ASUS Tutors",
    adUrl: "https://www.queensasus.com/tutoring",
    content:
      "Get the best on-campus ArtSci course tutoring services with ASUS Tutors."
  },
  {
    adId: 3,
    title: "Calling all Struggling Commerce Students!",
    advertiser: "BrainTrust",
    adUrl: "https://www.facebook.com/braintrusttutoring/",
    content:
      "BrainTrust will provide you with help for any Commerce course you're struggling with."
  },
  {
    adId: 4,
    title: "CompSci students - get the CompSci Advantage!",
    advertiser: "CompSci Advantage",
    adUrl: "https://www.compsciadvantage.com/",
    content:
      "CompSci Advantage will help you master even the toughest CISC courses. From 101 to 452, we got you!"
  }
];

const Forum = ({ store }) => {
  const [newQuestionTitle, setNewQuestionTitle] = useState("");
  const [newQuestionBody, setNewQuestionBody] = useState("");
  const [newQuestionCourseOptions, setNewQuestionCourseOptions] = useState([]);
  const [newQuestionCourse, setNewQuestionCourse] = useState("");
  const [areCoursesFetched, setAreCoursesFetched] = useState(false);

  const [forumPosts, setForumPosts] = useState([]);
  const [arePostsFetched, setArePostsFetched] = useState(false);

  useEffect(() => {
    if (!arePostsFetched && store.UserToken) {
      const getData = async () => {
        const data = await fetch(
          `http://localhost:8000/posts/getfeed/?limit=10&offset=0`,
          {
            mode: "cors", // no-cors, *cors, same-origin
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${store.UserToken}`
            }
          }
        ).then(r => r.json());
        alert(JSON.stringify(data));
        setForumPosts(data);
        setArePostsFetched(true);
      };
      getData();
    }
  });

  useEffect(() => {
    if (!areCoursesFetched && store.UserToken) {
      const getData = async () => {
        const data = await fetch(
          `http://localhost:8000/posts/enrolled/${store.UserId}/`,
          {
            mode: "cors", // no-cors, *cors, same-origin
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${store.UserToken}`
            }
          }
        ).then(r => r.json());

        setNewQuestionCourseOptions(
          data.map(x => ({
            label: x.courseCode + " - " + x.name,
            value: x.url
          }))
        );
        setAreCoursesFetched(true);
      };
      getData();
    }
  }, [store.UserToken, areCoursesFetched]);

  const [likedPosts, setLikedPosts] = useState([]);
  const togglePostLike = postID => {
    if (likedPosts.includes(postID)) {
      setLikedPosts(likedPosts.filter(x => x !== postID));
    } else {
      setLikedPosts([...likedPosts, postID]);
    }
  };

  return (
    <section id="forum">
      {/* {JSON.stringify(store)} */}
      <div
        css={css`
          padding: 1.5rem;
          border: 1px solid #ccc;
          border-radius: 4px;
          margin: 1.5rem;
          margin-bottom: 3rem;
        `}
      >
        <h2>Ask a Question</h2>
        <br />
        <label
          css={css`
            font-weight: bold;
          `}
          htmlFor="questionTitle"
        >
          Title
        </label>
        <br />
        <input
          id="questionTitle"
          name="questionTitle"
          type="text"
          css={css`
            width: 80%;
            padding: 2rem;
          `}
          value={newQuestionTitle}
          onChange={e => setNewQuestionTitle(e.target.value)}
        />
        <br />
        <label
          css={css`
            font-weight: bold;
          `}
          htmlFor="questionCourse"
        >
          Course
        </label>
        <br />
        <Select
          css={css`
            width: 80%;
            margin-bottom: 2rem;
          `}
          value={newQuestionCourse}
          onChange={setNewQuestionCourse}
          options={newQuestionCourseOptions}
        />
        {/* {JSON.stringify(courseOptions)} */}
        <label
          css={css`
            font-weight: bold;
          `}
          htmlFor="questionBody"
        >
          Body
        </label>
        <br />
        <textarea
          id="questionBody"
          name="questionBody"
          css={css`
            margin: 1rem 0;
            padding: 1rem;
            min-width: 80%;
          `}
          value={newQuestionBody}
          onChange={e => setNewQuestionBody(e.target.value)}
        />
        <br />
        <button
          css={css`
            color: #333;
          `}
          onClick={async () => {
            await fetch("http://localhost:8000/posts/content/", {
              method: "POST", // *GET, POST, PUT, DELETE, etc.
              mode: "cors", // no-cors, *cors, same-origin
              headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${store.UserToken}`
              },
              body: JSON.stringify({
                title: newQuestionTitle,
                course: newQuestionCourse.value || "CISC101",
                content: {
                  textContent: newQuestionBody
                }
              })
            });
          }}
        >
          Submit
        </button>
      </div>
      <div>
        <div>
          {forumPosts.map((props, index) => (
            <>
              {index % adFrequency === 0 ? (
                <Advertisement {...adCluster[index / adFrequency]} />
              ) : (
                ""
              )}
              <IndividualPost
                liked={likedPosts.includes(props.postID)}
                setLiked={() => togglePostLike(props.postID)}
                {...props}
              />
            </>
          ))}
        </div>
      </div>
    </section>
  );
};

export default inject(`store`)(observer(Forum));
