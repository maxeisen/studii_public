import React from "react";
import { slide as Menu } from "react-burger-menu";
import { Link } from "react-router-dom";
import Logo from "../assets/Logo.svg";

export default props => {
  return (
    <Menu width={250}>
      <Link to="/">
        <img src={Logo} width={100} />
      </Link>

      <Link to="/tutors">Tutor Search</Link>

      <Link to="/forum">Discussion Forum</Link>

      <Link to="/about">Past Activity</Link>
    </Menu>
  );
};
