"use client";
import { IoIosNotificationsOutline } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { VscAccount } from "react-icons/vsc";
import { MdArrowBack } from "react-icons/md"; 
import { MdLogout } from "react-icons/md";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const Header = () => {
  const { data: session } = useSession();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const accountRef = useRef(null); // Ref for the account dropdown

  const toggleSearchInput = () => {
    setIsSearchOpen(!isSearchOpen); // Toggle the search input
  };

  const opVsAccount = () => {
    setIsAccountOpen(!isAccountOpen);
  };

  // Close the dropdown when the user clicks outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (accountRef.current && !accountRef.current.contains(event.target)) {
        setIsAccountOpen(false); // Close the dropdown
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside); // Cleanup
  }, []);

  return (
    <div className="flex justify-between items-center h-16 w-full shadow-md px-4 md:px-16 relative">
      {/* Left Section */}
      <div className="ml-12 text-2xl md:hidden flex items-center">
        <h1>Kawou</h1>
      </div>

      <div className="flex items-center">
        {!isSearchOpen && (
          <form className="hidden md:flex relative">
            {/* Input Field (Visible on large screens only) */}
            <input
              className="border rounded-full pl-3 p-[2px]"
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
              className="border rounded-full pl-3 p-[2px]"
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
        <div className="relative" ref={accountRef}>
          <VscAccount
            className="text-xl cursor-pointer"
            onClick={opVsAccount}
          />
          {isAccountOpen && (
            <div className="absolute border-2 w-[220px] h-[300px] top-11 md:right-[-60px] right-[-15px] rounded-2xl bg-slate-800">
              <div className="text-white p-4">
                <h1>{session?.user?.username}</h1>
                <h1>{session?.user?.email}</h1>
                  
                  <div className="hover:bg-slate-400 p-[5px] rounded-xl  cursor-pointer  ">
                       <Link href={"/calendar"}>  <h1 className="pl-2">Calendrier</h1></Link>
                  </div>

                  <hr />

                <div onClick={() => signOut()}
                  className="flex gap-3 mt-5 hover:bg-slate-400 p-2 rounded-xl cursor-pointer"
                >
                  <div className="text-2xl text-white">
                    <MdLogout />
                  </div>
                  <div>
                    <h1>Se déconnecter</h1>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
