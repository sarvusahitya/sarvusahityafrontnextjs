// Components/Gallery.js
"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import React from "react";
import ReactHtmlParser from "html-react-parser";
import Image from "next/image";
import ProfilePicture from "@/app/components/ProfilePicture";
import Link from "next/link";
const PoetSection = () => {
  // data/users.js
  const pathname = usePathname();
  const parts = pathname.split("/");
  const lastSlug = parts[parts.length - 1];
  const [poets, setPoetData] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add a loading state

  useEffect(() => {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/poets`;
    const reqBody = {
      _id: lastSlug,
    };

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
          setPoetData(data.data);
          console.log(data.data);
          setIsLoading(false); // Set loading to false when data is fetched
        } else {
          console.error("Failed to fetch categories");
        }
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);
  const options = {
    weekday: "long", // Full name of the day of the week
    year: "numeric",
    month: "long", // Full name of the month
    day: "numeric", // Day of the month
  };

  return (
    <>
      <div className="bg-white p-4 rounded shadow-md max-w-xl mx-auto mt-6">
        {poets.map((poet, index) => (
          <div key={index} className="text-center">
            <ProfilePicture
              src={poet.profile_media_url}
              name={poet.poet_name}
            ></ProfilePicture>
            <h1 className="text-2xl font-bold text-center">{poet.poet_name}</h1>
            <p>
              <strong>Nickname:</strong> {poet.poet_nickname}
            </p>
            <p>
              <strong>Birthdate:</strong> {poet.poet_birthdate}
            </p>
            <p>
              <strong>Birthplace:</strong> {poet.poet_birthplace}
            </p>
            <p>
              <strong>Home Town:</strong> {poet.poet_home_town}
            </p>
            <p>
              <strong>School Name:</strong>{" "}
              {ReactHtmlParser(poet.poet_school_name)}
            </p>
            <p>
              <strong>Address:</strong> {ReactHtmlParser(poet.poet_address)}
            </p>
            <p>
              <strong>Languages Known:</strong>{" "}
              {poet.poet_languages_known.join(", ")}
            </p>
            <p>
              <strong>Occupations:</strong> {poet.poet_occupations.join(", ")}
            </p>
            <p>
              <strong>Hobbies:</strong> {poet.poet_hobbies.join(", ")}
            </p>
            <p className="html-content">
              <strong>Books:</strong> {ReactHtmlParser(poet.poet_books)}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default PoetSection;
