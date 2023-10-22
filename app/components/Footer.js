import React from "react";
import Link from "next/link";

const Footer = () => {
  // Get the current year dynamically
  const currentYear = new Date().getFullYear();

  const footerStyle = {
    backgroundColor: "#333",
    color: "#fff",
    padding: "20px 0",
    textAlign: "center",
  };

  const linkStyle = {
    color: "#fff",
    margin: "0 10px",
    textDecoration: "none",
  };

  return (
    <footer style={footerStyle}>
      <div>&copy; {currentYear} All rights reserved by Sarvu Sahitya</div>
      <div>
        <Link href="https://www.facebook.com/sarvusahitya">
          <span style={linkStyle}>Facebook</span>
        </Link>

        <Link href="https://www.instagram.com/sarvusahitya">
          <span style={linkStyle}>Instagram</span>
        </Link>
        <Link href="https://www.youtube.com/@sarvusahitya">
          <span style={linkStyle}>Youtube</span>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
