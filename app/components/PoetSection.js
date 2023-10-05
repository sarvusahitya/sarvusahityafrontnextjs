// Components/Gallery.js
"use client";
import { useEffect, useState } from "react";
import ProfilePicture from "./ProfilePicture";
const PoetSection = () => {
  // data/users.js
  const [poets, setPoets] = useState([]);

  useEffect(() => {
    // Define your API endpoint URL
    const apiUrl = "https://sarvu-sahitya-qdly.onrender.com/poets";

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
    <div className="grid grid-cols-6 gap-6">
      {poets.map((user, index) => (
        <div key={index} className="text-center">
          <ProfilePicture
            src={user.profile_media_url}
            poet_name={user.poet_name}
          ></ProfilePicture>
        </div>
      ))}
    </div>
  );
};

export default PoetSection;
