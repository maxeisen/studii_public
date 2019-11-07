import React from "react";
import { Link } from "react-router-dom";
import { MdMenu } from "react-icons/md";
import NotesPosts from "./notesPosts"
import ForumPosts from "./forumPosts"

export default function DashboardFeed() {
  return (
  <div
  style={{

  }}>
    <NotesPosts />
    <ForumPosts />
  </div>


  )
}
