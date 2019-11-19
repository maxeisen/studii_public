import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Login from "./pages/login";
import Signup from "./pages/signup";
import About from "./pages/about";
import Index from "./pages/index";
import Dashboard from "./pages/dashboard";
import Forum from "./pages/forum";
import Notes from "./pages/notes";
import Sidebar from "./components/sidebar"

import Header from "./components/header";

import WrapWithMobx from "./wrapWithMobx";

export default function BasicExample() {
  return (
    <WrapWithMobx>
      <Router>
        <Sidebar />
        <Header />
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>
          <Switch>
            <Route exact path="/">
              <Index />
            </Route>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/signup">
              <Signup />
            </Route>
            <Route path="/dashboard">
              <Dashboard />
            </Route>
            <Route path="/forum">
              <Forum />
            </Route>
            <Route path="/notes">
              <Notes />
            </Route>
          </Switch>
        </div>
      </Router>
    </WrapWithMobx>
  );
}
