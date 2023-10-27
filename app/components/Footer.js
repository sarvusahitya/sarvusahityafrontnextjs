import React from "react";
import Link from "next/link";
import Image from "next/image";
const Footer = () => {
  // Get the current year dynamically
  const currentYear = new Date().getFullYear();

  const footerStyle = "bg-gray-800 text-white py-5 text-center";
  const linkStyle = "text-white mx-2 text-sm";

  return (
    <footer className={footerStyle}>
      <div>&copy; {currentYear} All rights reserved by Sarvu Sahitya</div>
      <div className="mt-3 flex flex-col items-center sm:flex-row sm:justify-center">
        <div className="mb-2 sm:mb-0">
          <Link
            className={linkStyle}
            href="https://www.facebook.com/sarvusahitya"
          >
            Facebook
          </Link>
          <Link
            className={linkStyle}
            href="https://www.instagram.com/sarvusahitya"
          >
            Instagram
          </Link>
          <Link
            className={linkStyle}
            href="https://www.youtube.com/@sarvusahitya"
          >
            Youtube
          </Link>
        </div>
        <div className="mt-4 sm:mt-0">
          <Image
            src="/images/sarvusahityaqr.png"
            alt="Sarvu Sahitya QR Code"
            width={100}
            height={100}
          />
          Scan This QR For Download Now From Play Store
        </div>
      </div>
    </footer>
  );
};

export default Footer;
