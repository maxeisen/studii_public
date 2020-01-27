import React from "react";

const ContentWrapper = props => (
  <div
    style={{
      maxWidth: "1200px",
      marginLeft: "auto",
      marginRight: "auto",
      paddingLeft: "145px",
      paddingRight: "145px",
      "@media screen and (max-width: 1200px) and (min-width: 860px)": {
        paddingLeft: "80px",
        paddingRight: "80px"
      },
      "@media screen and (max-width: 860px)": {
        paddingLeft: "5%",
        paddingRight: "5%"
      },
      paddingTop: "0",
      paddingBottom: "0",
      marginTop: "0",
      marginBottom: "0"
    }}
  >
    {props.children}
  </div>
);

export default ContentWrapper;
