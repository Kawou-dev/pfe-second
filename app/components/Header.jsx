"use client";
import { IoIosNotificationsOutline } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { VscAccount } from "react-icons/vsc";
import { MdArrowBack } from "react-icons/md"; // Icon for closing input
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { useState } from "react";

const Header = () => {
  const { data: session } = useSession();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleSearchInput = () => {
    setIsSearchOpen(!isSearchOpen); // Toggle the search input
  };

  return (
    <div className="flex justify-between items-center h-16 w-full shadow-md px-4 md:px-16 relative">
      {/* Left Section */}

        <div className="ml-12 text-2xl md:hidden flex items-center ">
          <h1>Kawou</h1>
        </div>

     
      <div className="flex items-center">
        {!isSearchOpen && (
          <form className="hidden md:flex relative">
            {/* Input Field (Visible on large screens only) */}
            <input
              className="border rounded-full   pl-3 p-[2px] "
              type="text"
              placeholder="Search..."
            />
            <button
              className="text-xl absolute right-1 top-[6px] cursor-pointer aspect-square rounded-full"
              type="submit"
            >
              <CiSearch />
            </button>
          </form>
        )}

        {isSearchOpen && (
          <form className="flex relative">
            {/* Input Field (Visible when search is toggled) */}
            <button
              className="mr-2 text-xl cursor-pointer"
              onClick={toggleSearchInput}
            >
              <MdArrowBack className="md:hidden" /> {/* Close/Back Arrow Button */}
            </button>
            <input
              className="border rounded-full   pl-3 p-[2px]"
              type="text"
              placeholder="Search..."
            />
            <button
              className="text-xl absolute right-1 top-[6px] cursor-pointer aspect-square rounded-full"
              type="submit"
            >
              <CiSearch />
            </button>
          </form>
        )}
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {!isSearchOpen && (
          <div className="md:hidden">
            {/* Search Button for Small Screens */}
            <CiSearch
              className="text-xl cursor-pointer"
              onClick={toggleSearchInput}
            />
          </div>
        )}
        <div>
          <IoIosNotificationsOutline className="text-2xl cursor-pointer" />
        </div>
        <div>
          <VscAccount className="text-xl cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default Header;
