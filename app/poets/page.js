// Components/Gallery.js
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

import Image from "next/image";
import ProfilePicture from "../components/ProfilePicture";
const PoetSection = () => {
  // data/users.js

  const [poets, setPoetData] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add a loading state

  useEffect(() => {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/poets`;
    const reqBody = {
      page: 1,
      size: 50,
      orderby: -1,
      orderbycolumnname: "view",
    };

    axios
      .post(apiUrl, reqBody, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const data = response.data;
        if (data.success) {
          setPoetData(data.data);
          setIsLoading(false); // Set loading to false when data is fetched
        } else {
          console.error("Failed to fetch more posts");
        }
      })
      .catch((error) => {
        console.error("Error fetching more posts:", error);
      });
  }, []);

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
