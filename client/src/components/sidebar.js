import React from 'react';
import { slide as Menu } from 'react-burger-menu';

import Logo from "../assets/Logo.svg"

export default props => {
  return (
    <Menu width={ 250 } >

      <a href = "/">
        <h1> <img src={Logo} width={100}/> </h1>
      </a>
      
      <a className="menu-item" href="/dashboard">
        Dashboard
      </a>

      <a className="menu-item" href="/about">
        About
      </a>

      <a className="menu-item" href="/feed">
        My Feed
      </a>

      <a className="menu-item" href="/forum">
        Discussion Forum
      </a>

      <a className="menu-item" href="/notes">
        Notes
      </a>

      <a className="menu-item" href="/buddiis">
        Studii Buddiis
      </a>

    </Menu>
  );
};