import React from "react";
import Sidebar from "../components/sidebar";
import ForumPosts from "../components/forumPosts";

export default function Forum() {
  return (
    <div id="Forum">
      <h1>Discussion Forum</h1>
      <ForumPosts />
    </div>
  );
}
