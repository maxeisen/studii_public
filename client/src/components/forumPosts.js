import React, {useState} from "react";
import ContentWrapper from "./contentWrapper";
import { css } from "@emotion/core";
import Advertisement from "../components/advertisement";
import IndividualPost from "../components/individualPost";

const adFrequency = 2;

const forumPosts = [
  {
    postID: "1",
    author: "Student123",
    course: "CISC 220",
    title: "What is a command-line interface?",
    content:
      "Hi guys, I'm reading over some notes from this week's lectures and I have no clue what a command-line interface is. Can anyone offer some help?",
    date: "November 4, 2019",
    numComments: 4,
    score: 15
  },
  {
    postID: "2",
    author: "MEisen",
    course: "CISC 365",
    title: "Wtf is Huffman Encoding?",
    content:
      "Really struggling with this assignment. Someone please tell me how to implement this Huffman Encoding algorithm cause I have no clue what I'm doing. Thanks!",
    date: "October 29, 2019",
    numComments: 2,
    score: 4
  },
  {
    postID: "3",
    author: "ConnorTheFrosh",
    course: "General",
    title: "What exactly is computer science? and why am I studying it",
    content:
      "I'm starting to rethink this whole becoming a compsci major thing. Anyone have any advice?",
    date: "October 26, 2019",
    numComments: 6,
    score: 11
  },
  {
    postID: "4",
    author: "Hill_Ross",
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
    course: "General",
    title: "Django vs. Django Unchained",
    content:
      "Is Django (Python framework) named after Django Unchained (movie), or vice versa. I know it's gotta be one or the other, just don't know which. Please help!",
    date: "October 18, 2019",
    numComments: 2,
    score: 8
  }
];

const adCluster = [
  {
    adId: 1,
    title: "Need a tutor?",
    advertiser: "ASUS Tutors",
    adUrl: "https://www.queensu.ca",
    content: "Blah blah blah blah"
  },
    {
    adId: 2,
    title: "You need a tutor!",
    advertiser: "ASUS Tutors",
    adUrl: "https://www.queensu.ca",
    content: "Blah blah blah blah"
  },
    {
    adId: 3,
    title: "Do you need a tutor?",
    advertiser: "ASUS Tutors",
    adUrl: "https://www.queensu.ca",
    content: "Blah blah blah blah"
  },
];

const Forum = () => {
  const [likedPosts, setLikedPosts] = useState([]);
  const togglePostLike = (postID) => {
    if (likedPosts.includes(postID)) {
      setLikedPosts(likedPosts.filter(x => x !== postID))
    }
    else {
      setLikedPosts([...likedPosts, postID])
    }
  };
  return (
  <section id="forum">
    <ContentWrapper>
      <div>
        <div>
          {forumPosts.map(
            (
              props,
              index
            ) => (
              <>
                {index % adFrequency === 0 ? <Advertisement {...adCluster.pop(0)} /> : ""}
                <IndividualPost liked={likedPosts.includes(props.postID)} setLiked={()=>togglePostLike(props.postID)} {...props}/>
              </>
            )
          )}
        </div>
      </div>
    </ContentWrapper>
  </section>);
}

export default Forum;
