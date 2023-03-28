import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./appHeader.scss";

const AppHeader = () => {
  return (
    <header className="app__header">
      <h1 className="app__title">
        <Link to="/">
          <div className="logo"></div>
          Your Personal Library
        </Link>
      </h1>
      <nav className="app__menu">
        <ul>
          <li>
            <NavLink
              end
              style={({ isActive }) => ({
                color: isActive ? "#6a5126" : "rgb(164 143 122)",
              })}
              to="/"
            >
              Books Log
            </NavLink>
          </li>
          |
          <li>
            <NavLink
              style={({ isActive }) => ({
                color: isActive ? "#6a5126" : "rgb(164 143 122)",
              })}
              to="/bookshelf"
            >
              Bookshelves
            </NavLink>
          </li>
          |
          <li>
            <NavLink
              
              style={({ isActive }) => ({
                color: isActive ? "#6a5126" : "rgb(164 143 122)",
              })}
              to="/challenges"
            >
              Challenges
            </NavLink>
          </li>
         
        </ul>
      </nav>
    </header>
  );
};

export default AppHeader;
