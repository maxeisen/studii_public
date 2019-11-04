import React, { useState } from "react";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");

  const requestLogin = () => {
    const data = { username, password };
    fetch("http://localhost:8000/login/", {
      method: "POST",
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(r => r.json())
      .then(r => {
        setMessage("You're logged in! Redirecting...");
        setTimeout(() => {
          window.location.href = "/";
        }, 3000);
      })
      .catch(r => {
        setMessage("You're logged in! Redirecting...");
        setTimeout(() => {
          window.location.href = "/";
        }, 3000);
      });
  };

  return (
    <div>
      <div
        style={{
          maxWidth: "400px",
          margin: "0 auto"
        }}
      >
        <h2>Login or Sign Up</h2>
        {message ? (
          message
        ) : (
          <div
            style={{
              padding: "1rem",
              marginTop: "0.5rem",
              border: "1px solid #ccc"
            }}
          >
            <div style={{ marginBottom: "1rem" }}>
              <label>Username</label>
              <br />
              <input
                value={username}
                onChange={e => {
                  setUsername(e.target.value);
                }}
                type="text"
              />
            </div>
            <div style={{ marginBottom: "1rem" }}>
              <label>Password</label>
              <br />
              <input
                value={password}
                onChange={e => {
                  setPassword(e.target.value);
                }}
                type="password"
              />
            </div>
            <button onClick={requestLogin}>Login</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;
