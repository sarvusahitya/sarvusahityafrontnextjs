// Components/Gallery.js
"use client";
import { useEffect, useState } from "react";
import ProfilePicture from "./ProfilePicture";
const CategorySection = () => {
  // data/users.js
  const [poets, setPoets] = useState([]);

  useEffect(() => {
    // Define your API endpoint URL
    const apiUrl = "https://sarvu-sahitya-qdly.onrender.com/categorys";

    // Define the request body
    const reqBody = {
      page: 1,
      size: 50,
      orderby: -1,
      orderbycolumnname: "view",
    };

    // Make a POST request to the API
    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqBody),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setPoets(data.data);
        } else {
          console.error("Failed to fetch sliders");
        }
      })
      .catch((error) => {
        console.error("Error fetching sliders:", error);
      });
  }, []);

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Category Section</h2>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {poets.map((user, index) => (
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
