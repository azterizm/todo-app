import React, { useState } from 'react';
import menu from '../assets/menu.svg';
import search from '../assets/magnifying-glass.svg';
import '../styles/Navbar.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { changeSearch } from '../state/todoSlice';
import { auth } from '../develop';

export const Navbar = () => {
  const [navToggler, setNavToggler] = useState(false);
  const [searchToggler, setSearchToggler] = useState(false);
  const dispatch = useDispatch();
  const searchValue = useSelector((state) => state.todos.search);
  const time = new Date().getHours();
  const showTime = time > 12 ? time - 12 : time;

  const searchStyle = searchToggler ? { position: 'absolute', right: '260px' } : {};

  return (
    <nav>
      <div className="time">{showTime}</div>
      <img
        src={menu}
        alt="Menu"
        width="30"
        height="30"
        onClick={() => setNavToggler((e) => !e)}
      />
      <img
        src={search}
        alt="Search"
        width="30"
        height="30"
        style={searchStyle}
        onClick={() => setSearchToggler((e) => !e)}
      />
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
            <li
              className="sidebarItem"
              onClick={() => auth.signOut()}
              style={{ cursor: 'pointer' }}
            >
              Logout
            </li>
          </ul>
        </div>
      )}
      {searchToggler && (
        <div className="search">
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search..."
            value={searchValue}
            onChange={(e) => dispatch(changeSearch(e.target.value))}
          />
        </div>
      )}
    </nav>
  );
};
