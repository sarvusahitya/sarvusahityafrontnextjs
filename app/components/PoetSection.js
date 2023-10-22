// Components/Gallery.js
"use client";
import { useEffect, useState } from "react";
import ProfilePicture from "./ProfilePicture";
import Link from "next/link";
const PoetSection = ({ poets }) => {
  return (
    <>
      <h2 className="text-2xl font-bold mb-4 mt-5">Poet Section</h2>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {poets.map((user, index) => (
          <div key={index} className="text-center">
            <Link href={`/poets/${user._id}`} key={index}>
              <ProfilePicture
                src={user.profile_media_url}
                name={user.poet_name}
              ></ProfilePicture>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default PoetSection;
