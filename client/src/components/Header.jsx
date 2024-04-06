import React, { useState } from "react";
import { Button, Navbar, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaSun, FaMoon } from "react-icons/fa";
import Head_Navbar from "./Head_Navbar";
import Profile from "./Profile";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../redux/themeSlice";

const Header = () => {
  const [menuOpened, setMenuOpened] = useState(false);
  const toggleMenu = () => setMenuOpened(!menuOpened);
  const [searchOpened, setSearchOpened] = useState(false);
  const toggleSearch = () => setSearchOpened(!searchOpened);
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.theme);

  const { currentUser } = useSelector((state) => state.user);

  return (
    <Navbar className="border-b-2 justify-between items-center rounded-b-sm shadow-sm">
      <Link
        to="/"
        className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
      >
        <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
          1-Bit
        </span>
        Blog
      </Link>
      <Button className="w-12 h-10 lg:hidden" color="light" pill>
        <AiOutlineSearch onClick={toggleSearch} />
      </Button>
      <div className="flex gap-2 md:order-2 gap-x-3">
        <Button
          className="w-12 h-10"
          color="light"
          pill
          onClick={() => dispatch(toggleTheme())}
        >
          {theme === "light" ? <FaMoon /> : <FaSun />}
        </Button>
        {!currentUser ? (
          <Link to="/login" className="">
            <Button gradientDuoTone="purpleToBlue" outline>
              Login
            </Button>
          </Link>
        ) : (
          <Profile />
        )}
        <Navbar.Toggle onClick={toggleMenu} />
      </div>

      {/* navbar for mobile and large screen */}
      <Head_Navbar containerStyles={"hidden md:flex gap-x-10 "} />
      <Head_Navbar
        toggleMenu={toggleMenu}
        containerStyles={`${
          menuOpened
            ? "fixed flex z-50 w-full right-[0%] gap-x-2 top-14 gap-y-5 p-5 bg-white rounded-md shadow-md dark:bg-gray-700 transition-all duration-3000 lg:hidden md:hidden"
            : "fixed flex z-50 w-full -left-[100%] gap-x-2 top-14 gap-y-5 p-5 bg-white rounded-md shadow-md dark:bg-gray-700 transition-all duration-3000"
        }`}
      />
      <form>
        <TextInput
          type="text"
          placeholder="Search..."
          rightIcon={AiOutlineSearch}
          className="hidden sm:inline"
          // className={`${
          //   searchOpened
          //     ? "fixed flex z-50 w-full right-[0%] top-14 p-2 bg-white rounded-md shadow-md dark:bg-gray-700 transition-all duration-3000"
          //     : "fixed flex z-50 w-full -left-[100%] top-14 p-2 bg-white rounded-md shadow-md dark:bg-gray-700 transition-all duration-3000"
          // }`}
        />
      </form>
    </Navbar>
  );
};

export default Header;
