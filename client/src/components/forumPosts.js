import React, { useState } from "react";
import ContentWrapper from "./contentWrapper";
import { css } from "@emotion/core";
import Advertisement from "../components/advertisement";
import IndividualPost from "../components/individualPost";

const adFrequency = 2;
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

const Forum = () => {
  const [newQuestionTitle, setNewQuestionTitle] = useState("");
  const [newQuestionBody, setNewQuestionBody] = useState("");

  const [forumPosts, setForumPosts] = useState([
    {
      postID: "2",
      author: "MEisen",
      email: "MEisen@queensu.ca",
      course: "CISC 365",
      title: "What is Huffman Encoding?",
      content:
        "Really struggling with this assignment. Someone please help me with implementing this Huffman Encoding algorithm cause I have no clue what I'm doing. Thanks!",
      date: "October 29, 2019",
      numComments: 2,
      score: 4
    },
    {
      postID: "3",
      author: "ConnorFrosh",
      email: "ConnorFrosh@queensu.ca",
      course: "General",
      title: "What exactly is computer science? and why am I studying it",
      content:
        "I'm starting to rethink this whole becoming a compsci major thing. Anyone have any advice?",
      date: "October 26, 2019",
      numComments: 6,
      score: 11
    },
    {
      postID: "6",
      author: "NetworkMan",
      email: "NetworkMan@queensu.ca",
      course: "CMPE 452",
      title: "Should I do PCA analysis for my MLP?",
      content:
        "I am working on a project where I need to build my own multi-layer perceptron neural network, and I need some help. I want to...",
      date: "October 25, 2019",
      numComments: 3,
      score: 6
    },
    {
      postID: "7",
      author: "ConnorFrosh",
      email: "ConnorFrosh@queensu.ca",
      course: "ARTH 101",
      title: "Why were the Flourentine Medidi family important to Renaissance?",
      content: "What the title says... I really need help in this course :/",
      date: "October 23, 2019",
      numComments: 2,
      score: 0
    },
    {
      postID: "8",
      author: "EvolutionIsntReal",
      email: "EvolutionIsntReal@queensu.ca",
      course: "BIOL 221",
      title: "Isn't evolution just a theory that remains unproven?",
      content:
        "I understand that evolution is a theory and that it explains how humans developed to be how they are today? What I don't understand is...",
      date: "October 21, 2019",
      numComments: 24,
      score: -53
    },
    {
      postID: "1",
      author: "Student123",
      email: "Student123@queensu.ca",
      course: "CISC 220",
      title: "What is a command-line interface?",
      content:
        "Hi guys, I'm reading over some notes from this week's lectures and I have no clue what a command-line interface is. Can anyone offer some help?",
      date: "November 4, 2019",
      numComments: 4,
      score: 15
    },
    {
      postID: "4",
      author: "Hill_Ross",
      email: "ross.hill@queensu.ca",
      course: "CISC 499",
      title: "Can I get some thesis suggestions? I'm lost",
      content: "Just read the title. Anything helps!!!",
      date: "October 20, 2019",
      numComments: 7,
      score: 12
    },
    {
      postID: "5",
      author: "PattyLen",
      email: "PattyLen@queensu.ca",
      course: "General",
      title: "Django vs. Django Unchained",
      content:
        "Is Django (Python framework) named after Django Unchained (movie), or vice versa. I know it's gotta be one or the other, just don't know which. Please help!",
      date: "October 18, 2019",
      numComments: 2,
      score: 8
    }
  ]);
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
          onClick={() => {
            setForumPosts([
              {
                postID: "20",
                author: "MEisen",
                email: "MEisen@queensu.ca",
                course: "CISC 365",
                title: newQuestionTitle,
                content: newQuestionBody,
                date: "January 30, 2020",
                numComments: 0,
                score: 0
              },
              ...forumPosts
            ]);
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

export default Forum;
