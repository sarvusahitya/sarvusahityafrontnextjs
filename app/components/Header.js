// components/Header.js
import React from "react";
import Link from "next/link";

const Header = () => {
  return (
    <header className=" p-4 flex items-center justify-between">
      {/* Logo on the left */}
      <div>
        <Link href="/">
          <img src="/images/logo.png" alt="Logo" width={100} height={100} />
        </Link>
      </div>

      {/* Menu on the right */}
      <nav className="space-x-4">
        <Link href="/about" className="text-black">
          About
        </Link>
        <Link href="/contactus" className="text-black">
          Contact Us
        </Link>
        <Link href="/feedback" className="text-black">
          Feedback
        </Link>
      </nav>
    </header>
  );
};

export default Header;
