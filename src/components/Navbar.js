import React, { useState } from 'react';
import menu from '../assets/menu.svg';
import search from '../assets/magnifying-glass.svg';
import '../styles/Navbar.css';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  //Make this false after test
  const [navToggler, setNavToggler] = useState(false);
  return (
    <nav>
      <img
        src={menu}
        alt="Menu"
        width="30"
        height="30"
        onClick={() => setNavToggler((e) => !e)}
      />
      <img src={search} alt="Search" width="30" height="30" />
      {navToggler && (
        <div className="sidebar">
          <ul className="sidebarList">
            <Link to="/">
              <li className="sidebarItem" style={{ color: '#6478d3' }}>
                Home
              </li>
            </Link>
            <Link to="/all">
              <li className="sidebarItem">All Todos</li>
            </Link>
          </ul>
        </div>
      )}
    </nav>
  );
};
