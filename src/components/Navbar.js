import React from 'react';
import menu from '../assets/menu.svg';
import search from '../assets/magnifying-glass.svg';

export const Navbar = () => {
  return (
    <nav>
      <img src={menu} alt="Menu" width="30" height="30" />
      <img src={search} alt="Search" width="30" height="30" />
    </nav>
  );
};
