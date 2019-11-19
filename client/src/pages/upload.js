import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { css } from "@emotion/core";

import ContentWrapper from "../components/contentWrapper";

export default function Upload() {
  const onDrop = useCallback(acceptedFiles => {
    alert(JSON.stringify(acceptedFiles));
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  const style = {
    display: "block",
    height: "20rem",
    width: "80%",
    backgroundColor: "none",
    padding: 0,
    margin: "3rem auto",
    border: "3px dashed #888",
    borderRadius: "3px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#333",
    cursor: "pointer"
  };
  return (
    <ContentWrapper>
      <h2>Upload notes</h2>
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag some files here, or click to select files</p>
        )}
      </div>
    </ContentWrapper>
  );
}
