import React from "react";

function Home() {
  const subsectionStyle = {
    display: "flex",
  };
  const subsectionImageStyle = {};
  return (
    <div>
      <h2>Studii</h2>
      <p>A study system where classmates help eachother</p>
      <section>
        <div>
          <div>
            <h3>Subheading 1</h3>
            <p>Blurb</p>
          </div>
          <div>Image...</div>
        </div>
        <div>
          <div>
            <h3>Subheading 1</h3>
            <p>Blurb</p>
          </div>
          <div>Image...</div>
        </div>
      </section>
    </div>
  );
}

export default Home;
