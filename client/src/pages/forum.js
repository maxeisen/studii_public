import React from "react";
import ForumPosts from "../components/forumPosts";
import ContentWrapper from "../components/contentWrapper";

import { css } from "@emotion/core";

export default function Forum() {
  return (
    <ContentWrapper>
      <div id="Forum">
        <h1>Forum</h1>
        <p>Here you can view recent posts relating to your courses.</p>
        <div css={css`padding-top: 15px`}>
          <ForumPosts />
        </div>
      </div>
    </ContentWrapper>
  );
}
