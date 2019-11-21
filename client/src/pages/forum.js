import React from "react";
import Sidebar from "../components/sidebar";
import ForumPosts from "../components/forumPosts";
import ContentWrapper from "../components/contentWrapper";

export default function Forum() {
  return (
    <ContentWrapper>
      <div id="Forum">
        <h1>Discussion Forum</h1>
        <p>Here you can view recent forum posts relating to your courses.</p>
        <div css={{ paddingTop: "10px" }}>
          <ForumPosts />
        </div>
      </div>
    </ContentWrapper>
  );
}
