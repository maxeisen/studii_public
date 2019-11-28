import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Login from "./pages/login";
import Signup from "./pages/signup";
import About from "./pages/about";
import Index from "./pages/index";
import Forum from "./pages/forum";
import Sidebar from "./components/sidebar";
import Post from "./pages/post";
import WrapWithMobx from "./components/wrapWithMobx";
import ScrollToTop from "./components/ScrollToTop";
import Header from "./components/header";


export default function BasicExample() {
  return (
    <WrapWithMobx>
      <Router>
        <ScrollToTop/>
        <div>
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
              <Sidebar />
              <Header />
              <Login />
            </Route>
            <Route path="/signup">
              <Sidebar />
              <Header />
              <Signup />
            </Route>
            <Route path="/forum">
              <Sidebar />
              <Header />
              <Forum />
            </Route>
            <Route path="/post/:id">
              <Sidebar />
              <Header />
              <Post />
            </Route>
          </Switch>
        </div>
      </Router>
    </WrapWithMobx>
  );
}
