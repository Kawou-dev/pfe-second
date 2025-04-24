"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react"; // Icônes pour le menu et fermeture

//  icones 
import { IoHomeOutline } from "react-icons/io5";
import { FaBookReader } from "react-icons/fa";
import { LuListTodo } from "react-icons/lu";
import { FaUmbrellaBeach } from "react-icons/fa6";
import { FiBook } from "react-icons/fi";
import { LuNotebook } from "react-icons/lu";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", path: "/dashboard" , icones : <IoHomeOutline /> },
    { name: "Étude", path: "/etudes" , icones : <LuNotebook /> },
    { name: "To do", path: "/todo" , icones : <LuListTodo /> },
    { name: "Vacances", path: "/vacances" , icones : <FaUmbrellaBeach /> },
  ];

  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest(".sidebar")) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isOpen]);

  const closeSideBar = () => {
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  }

  return (
    <>
 
      <button 
        className="md:hidden text-2xl cursor-pointer fixed top-3 left-5 z-60 text-black p-2 rounded"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="text-white top-6" size={24} /> : <Menu size={24} />}
      </button>

    
      <nav 
        className={`sidebar fixed md:rounded-none rounded-r-2xl  z-50 top-0 left-0 h-full w-64 bg-gray-800 text-white p-5 flex flex-col transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-64"
        } md:translate-x-0 md:relative`}
      >
      
          <div className="flex items-center ">
               {/* <img   className=" md:mr-0 mr-[-40px]  w-10  "
               src="https://img.freepik.com/vecteurs-libre/vecteur-degrade-logo-colore-oiseau_343694-1365.jpg" alt="" />
             */}
              <h1 className="text-xl mt-2 font-bold md:pl-5 pl-14    ">Kawou </h1>
          </div>
          <hr className="text-white mt-2" />

       
          <ul className="mt-5">
          {menuItems.map((item) => (
            <Link key={item.path} href={item.path}>
              <li
                className={`mb-2 p-2 rounded ${pathname === item.path ? "bg-gray-600" : ""} hover:bg-gray-700`}
                onClick={closeSideBar}
              >
                <div className="flex items-center gap-2">
                  {item.icones}
                  {item.name}
                </div>
              </li>
            </Link>
          ))}
        </ul>

      </nav>
    </>
  );
};

export default Sidebar;
