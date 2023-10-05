"use client";
import { React, useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="bg-white p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo on the left */}
        <div>
          <Link href="/">
            <span>
              <img src="/images/logo.png" alt="Logo" width={100} height={100} />
            </span>
          </Link>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-gray-700 hover:text-black"
        >
          <FontAwesomeIcon icon={faEllipsisV} />
        </button>

        {/* Menu on the right (Hidden on small screens) */}
        <nav className={`md:flex space-x-4 ${menuOpen ? "block" : "hidden"}`}>
          <Link href="/about">
            <span
              className="cursor-pointer text-gray-700 hover:text-black"
              onClick={toggleMenu}
            >
              About
            </span>
          </Link>
          <Link href="/contactus">
            <span
              className="cursor-pointer text-gray-700 hover:text-black"
              onClick={toggleMenu}
            >
              Contact Us
            </span>
          </Link>
          <Link href="/feedback">
            <span
              className="cursor-pointer text-gray-700 hover:text-black"
              onClick={toggleMenu}
            >
              Feedback
            </span>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
