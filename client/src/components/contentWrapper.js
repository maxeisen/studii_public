import React from "react";

export default (props) => (
  <div
    css={{
      maxWidth: "1400px",
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
      height: "100%"
    }}
  >
    {props.children}
  </div>
);
