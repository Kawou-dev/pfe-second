"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react"; // Icônes pour le menu et fermeture

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Étude", path: "/etudes" },
    { name: "To do", path: "/todo" },
    { name: "Vacances", path: "/vacances" },
  ];

  // Fermer le menu quand on clique en dehors
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest(".sidebar")) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isOpen]);

  return (
    <>
      {/* Bouton Hamburger */}
      <button 
        className="md:hidden text-2xl cursor-pointer fixed top-3 left-5 z-60 text-black p-2 rounded"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="text-white top-4" size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <nav 
        className={`sidebar fixed z-50 top-0 left-0 h-full w-64 bg-gray-800 text-white p-5 flex flex-col transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-64"
        } md:translate-x-0 md:relative`}
      >
        {/* Titre en haut */}
        <h1 className="text-xl mt-2 font-bold md:pl-5 pl-14    ">Kawou </h1>

        {/* Liste des liens avec un petit espacement */}
        <ul className="mt-5">
          {menuItems.map((item) => (
            <li key={item.path} className={`mb-2 p-2 rounded ${pathname === item.path ? "bg-gray-700" : ""}`}>
              <Link href={item.path}>{item.name}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default Sidebar;
