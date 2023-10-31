// Components/Gallery.js
"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import React from "react";
import ReactHtmlParser from "html-react-parser";
import Image from "next/image";
import ProfilePicture from "@/app/components/ProfilePicture";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Link from "next/link";
const PoetSection = () => {
  // data/users.js
  const pathname = usePathname();
  const parts = pathname.split("/");
  const lastSlug = parts[parts.length - 1];
  const [poets, setPoetData] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add a loading state
  const [clientRender, setClientRender] = useState(false);

  useEffect(() => {
    if (!clientRender) {
      setClientRender(true);
      return;
    }
    const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/poets`;
    const reqBody = {
      _id: lastSlug,
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
  }, [clientRender]);
  const options = {
    weekday: "long", // Full name of the day of the week
    year: "numeric",
    month: "long", // Full name of the month
    day: "numeric", // Day of the month
  };

  return (
    <div className="bg-white p-4 rounded shadow-md max-w-xl mx-auto mt-6">
      {isLoading ? (
        <p>Loading...</p>
      ) : poets.length === 0 ? (
        <p>No poet data available.</p>
      ) : (
        poets.map((poet, index) => (
          <div key={index} className="text-center">
            <ProfilePicture
              src={poet.profile_media_url || ""}
              name={poet.poet_name || "Unknown Poet"}
            ></ProfilePicture>
            <h1 className="text-2xl font-bold text-center">
              {poet.poet_name || "Unknown Poet"}{" "}
              {poet.poet_nickname ? `(${poet.poet_nickname})` : ""}
              {poet.is_blue_tick && (
                <span className="text-blue-500 ml-2">
                  <FontAwesomeIcon icon={faCheckCircle} />
                </span>
              )}
            </h1>

            <p>
              <strong>Birthdate:</strong> {poet.poet_birthdate || ""}
            </p>
            <p>
              <strong>Birthplace:</strong> {poet.poet_birthplace || ""}
            </p>
            <p>
              <strong>Home Town:</strong> {poet.poet_home_town || ""}
            </p>
            <p>
              <strong>School Name:</strong>{" "}
              {poet.poet_school_name
                ? ReactHtmlParser(poet.poet_school_name)
                : ""}
            </p>
            <p>
              <strong>Address:</strong>{" "}
              {poet.poet_address ? ReactHtmlParser(poet.poet_address) : ""}
            </p>
            <p>
              <strong>Languages Known:</strong>{" "}
              {poet.poet_languages_known && poet.poet_languages_known.length
                ? poet.poet_languages_known.join(", ")
                : ""}
            </p>
            <p>
              <strong>Occupations:</strong>{" "}
              {poet.poet_occupations && poet.poet_occupations.length
                ? poet.poet_occupations.join(", ")
                : ""}
            </p>
            <p>
              <strong>Hobbies:</strong>{" "}
              {poet.poet_hobbies && poet.poet_hobbies.length
                ? poet.poet_hobbies.join(", ")
                : ""}
            </p>
            <p>
              <strong>Nationality:</strong>{" "}
              {poet.poet_nationality && poet.poet_nationality.length
                ? poet.poet_nationality.join(", ")
                : ""}
            </p>
            <p>
              <strong>Awards:</strong>{" "}
              {poet.awards && poet.awards.length ? poet.awards.join(", ") : ""}
            </p>
            <p className="html-content">
              <strong>Books:</strong>{" "}
              {poet.poet_books ? ReactHtmlParser(poet.poet_books) : ""}
            </p>
            <p className="html-content">
              <strong>Future Books:</strong>{" "}
              {poet.poet_future_books
                ? ReactHtmlParser(poet.poet_future_books)
                : ""}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default PoetSection;
