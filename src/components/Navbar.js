import React, { useState } from 'react';
import menu from '../assets/menu.svg';
import search from '../assets/magnifying-glass.svg';
import '../styles/Navbar.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { changeSearch } from '../state/todoSlice';
import { auth } from '../develop';
import { useSpring, animated as a } from 'react-spring';

export const Navbar = ({ selected }) => {
  const [navToggler, setNavToggler] = useState(false);
  const [searchToggler, setSearchToggler] = useState(false);
  const searchValue = useSelector((state) => state.todos.search);
  const time = new Date().getHours();
  const showTime = time > 12 ? time - 12 : time;

  const dispatch = useDispatch();

  const searchStyle = useSpring({
    position: 'absolute',
    right: searchToggler ? (window.innerWidth < 400 ? 180 : 260) : 0,
    o: searchToggler ? 1 : 0,
  });
  const selectedStyle = { color: '#6478d3' };
  const sidebarStyle = useSpring({
    left: navToggler ? 0 : -200,
  });

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
      <a.img
        src={search}
        alt="Search"
        width="30"
        height="30"
        style={searchStyle}
        onClick={() => setSearchToggler((e) => !e)}
      />
      <a.div className="sidebar" style={sidebarStyle}>
        <ul className="sidebarList">
          <Link to="/">
            <li className="sidebarItem" style={selected === 'home' ? selectedStyle : {}}>
              Home
            </li>
          </Link>
          <Link to="/all">
            <li className="sidebarItem" style={selected === 'all' ? selectedStyle : {}}>
              All Todos
            </li>
          </Link>
          <li
            className="sidebarItem"
            onClick={() => auth.signOut()}
            style={{ cursor: 'pointer' }}
          >
            Logout
          </li>
        </ul>
      </a.div>
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
