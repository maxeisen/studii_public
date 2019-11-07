import React from "react";
import Sidebar from "../components/sidebar";
import NotesPosts from "../components/notesPosts";

export default function Notes() {
  return (
    <div id="Notes">
      <h1>Notes</h1>
      <p>Here you can view recently posted notes from students in your course.</p>
      <div css={{paddingTop: "10px"}}>
        <NotesPosts />
      </div>
    </div>
  );
}
