import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TbHelpSquareRounded } from "react-icons/tb";
import { CiLogout } from "react-icons/ci";
import { MdOutlineDashboard } from "react-icons/md";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { signOut, signInFailure } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import userSvg from "../asstes/user_png.png";
import OutsideClickHandler from "react-outside-click-handler";
import { signOutRoute } from "../Api/authApi";

const Profile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      const dataRes = await signOutRoute();
      if (dataRes.data.success) {
        dispatch(signOut());
        navigate("/login");
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="relative">
      <button
        id="dropdown"
        onClick={() => setIsOpen(true)}
        className="flex items-center rounded-xl px-6 text-sm font-medium leading-normal text-primary transition duration-150 ease-in-out "
        type="button"
      >
        <img
          className="w-10 h-10 rounded-full object-cover"
          src={userSvg}
          alt="user photo"
        />
      </button>
      <OutsideClickHandler
        onOutsideClick={() => {
          setIsOpen(false);
        }}
      >
        {isOpen && (
          <div
            id="dropdown"
            className="absolute z-50 -right-[0%] top-14 bg-white divide-y divide-gray-100  rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 transition-all duration-3000"
          >
            <div className="px-4 py-3 text-sm text-gray-900 dark:text-gray-10 lg:w-[240px] hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
              <Link
                to="/"
                className="flex flex-wrap justify-start items-center gap-4 font-semibold cursor-pointer"
              >
                <img
                  className="w-8 h-8 rounded-full object-cover hidden sm:block"
                  src={userSvg}
                  alt="user photo"
                />
                <p className="hover:font-bold dark:text-gray-200 ">
                  {currentUser &&
                    currentUser.email.substring(
                      0,
                      currentUser.email.lastIndexOf("@")
                    )}
                </p>
              </Link>
            </div>
            <ul
              className="py-2 text-sm"
              aria-labelledby="dropdownAvatarNameButton"
            >
              <li>
                <Link
                  to="/dashboard"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <div className="flex justify-start items-center gap-4 font-semibold">
                    <MdOutlineDashboard />
                    <p className="hover:font-bold dark:text-gray-10">
                      Dashboard
                    </p>
                  </div>
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <div className="flex justify-start items-center gap-4 font-semibold">
                    <TbHelpSquareRounded />
                    <p className="hover:font-bold dark:text-gray-200">Helps</p>
                  </div>
                </Link>
              </li>
            </ul>
            <div className="py-2">
              <button
                onClick={handleSignOut}
                className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              >
                <div className="flex justify-start items-center gap-4 font-semibold">
                  <CiLogout />
                  <p className="hover:font-bold dark:text-gray-10">Sign Out</p>
                </div>
              </button>
            </div>
          </div>
        )}
      </OutsideClickHandler>
    </div>
  );
};

export default Profile;
