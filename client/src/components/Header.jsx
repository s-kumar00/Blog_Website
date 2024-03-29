import React, { useState } from "react";
import { Button, Navbar, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon } from "react-icons/fa";
import Head_Navbar from "./Head_Navbar";


const Header = () => {
  const [menuOpened, setMenuOpened] = useState(false);
  const toggleMenu = () => setMenuOpened(!menuOpened);
  return (
    <Navbar className="border-b-2 rounded-sm shadow-sm">
      <Link
        to="/"
        className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
      >
        <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
          Tech
        </span>
        Blog
      </Link>
      <form>
        <TextInput
          type="text"
          placeholder="Search..."
          rightIcon={AiOutlineSearch}
          className="hidden lg:inline"
        />
      </form>
      <Button className="w-12 h-10 lg:hidden" color="light" pill>
        <AiOutlineSearch />
      </Button>

      <div className="flex gap-2 md:order-2 gap-x-3">
        <Button className="w-12 h-10" color="light" pill>
          <FaMoon />
        </Button>
        <Link to="/login" className="">
          <Button gradientDuoTone="purpleToBlue">SignUp</Button>
        </Link>
        <Navbar.Toggle onClick={toggleMenu} />
      </div>

      {/* navbar for mobile and large screen */}
      <Head_Navbar containerStyles={"hidden md:flex gap-x-5"} />
      <Head_Navbar
        toggleMenu={toggleMenu}
        containerStyles={`${
          menuOpened
            ? "fixed flex flex-col z-50 -right-[-2%] top-14 gap-y-5 p-5 bg-white rounded-2xl shadow-md w-44 dark:bg-gray-700 transition-all duration-3000 lg:hidden"
            : "fixed flex flex-col z-50 -right-[100%] top-20 gap-y-5 p-5 bg-white rounded-2xl shadow-md w-44 dark:bg-gray-700 transition-all duration-3000"
        }`}
      />
    </Navbar>
  );
};

export default Header;
