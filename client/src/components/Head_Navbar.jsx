import React from "react";
import { NavLink } from "react-router-dom";
import { MdCategory, MdHomeFilled } from "react-icons/md";
import { TbBrandBlogger } from "react-icons/tb";

const Navbar = ({ containerStyles, toggleMenu }) => {
  return (
    <nav className={`${containerStyles}`}>
      <NavLink
        to={"/"}
        onClick={toggleMenu}
        className={({ isActive }) => (isActive ? "active_link" : "")}
      >
        <div className="flex gap-x-2 justify-center items-center">
          <MdHomeFilled /> Home
        </div>
      </NavLink>
      <NavLink
        to={"/about"}
        onClick={toggleMenu}
        className={({ isActive }) => (isActive ? "active_link" : "")}
      >
        <div className="flex gap-x-2 justify-center items-center">
          <MdCategory /> About
        </div>
      </NavLink>
      <NavLink
        to={"/blog"}
        onClick={toggleMenu}
        className={({ isActive }) => (isActive ? "active_link" : "")}
      >
        <div className="flex gap-x-2 justify-center items-center">
          <TbBrandBlogger /> Blog
        </div>
      </NavLink>
    </nav>
  );
};

export default Navbar;
