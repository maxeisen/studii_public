import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Login from "./pages/login";
import Signup from "./pages/signup";
import About from "./pages/about";
import Index from "./pages/index";
import Dashboard from "./pages/dashboard";
import Forum from "./pages/forum";
import Notes from "./pages/notes";
import Sidebar from "./components/sidebar";

import Header from "./components/header";

import WrapWithMobx from "./components/wrapWithMobx";

export default function BasicExample() {
  return (
    <WrapWithMobx>
      <Router>
        <Switch>
          <Route exact path="/">
            <Index />
          </Route>
          <Route path="/about">
            <Sidebar />
            <Header />
            <About />
          </Route>
          <Route path="/login">
            <Header />
            <Login />
          </Route>
          <Route path="/signup">
            <Header />
            <Signup />
          </Route>
          <Route path="/dashboard">
            <Sidebar />
            <Header />
            <Dashboard />
          </Route>
          <Route path="/forum">
            <Sidebar />
            <Header />
            <Forum />
          </Route>
          <Route path="/notes">
            <Sidebar />
            <Header />
            <Notes />
          </Route>
        </Switch>
      </Router>
    </WrapWithMobx>
  );
}
