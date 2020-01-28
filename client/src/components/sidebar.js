import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import { Link } from "react-router-dom";
import Logo from "../assets/Logo.svg"


export default props => {
  return (
    <Menu width={ 250 } >

      <Link to="/"><img src={Logo} width={100}/></Link>

      <Link to="/forum">Forum</Link>

      <Link to="/buddiis">Studii Buddies</Link>

      <Link to="/about">About</Link>

    </Menu>
  );
};