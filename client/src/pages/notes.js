import React from "react";
import Sidebar from "../components/sidebar";
import NotesPosts from "../components/notesPosts";

export default function Notes() {
  return (
    <div id="Notes">
        <h1>Notes</h1>
        <NotesPosts />
    </div>
  );
}
