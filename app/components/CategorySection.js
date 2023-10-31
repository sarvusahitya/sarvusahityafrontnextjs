// Components/Gallery.js
"use client";
import { useEffect, useState } from "react";
import ProfilePicture from "./ProfilePicture";
const CategorySection = ({ category }) => {
  // data/users.js

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Category Section</h2>

      <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {category.map((user, index) => (
          <div key={index} className="text-center">
            <ProfilePicture
              src={user.category_media_url}
              name={user.category_name}
            ></ProfilePicture>
          </div>
        ))}
      </div>
    </>
  );
};

export default CategorySection;
