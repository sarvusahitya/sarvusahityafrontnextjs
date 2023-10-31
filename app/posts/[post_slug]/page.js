// Components/Gallery.js
"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import React from "react";
import ReactHtmlParser from "html-react-parser";
import Image from "next/image";
import axios from "axios";
import { convertToWebP } from "@/utils/ssutils";

import Link from "next/link";
const PostSection = () => {
  const pathname = usePathname();
  const parts = pathname.split("/");
  const lastSlug = parts[parts.length - 1];
  const [posts, setPostData] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add a loading state
  const [clientRender, setClientRender] = useState(false);

  useEffect(() => {
    if (!clientRender) {
      setClientRender(true);
      return;
    }
    const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/posts`;
    const reqBody = {
      _id: lastSlug,
    };
    console.log(reqBody);

    axios
      .post(apiUrl, reqBody, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const data = response.data;
        if (data.success) {
          setPostData(data.data);
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
    <>
      {posts.map((post, index) => (
        <div className="bg-white p-4 rounded-lg shadow-md  " key={index}>
          {/* Display the image on top for mobile devices */}
          <div className="md:flex md:space-x-4">
            <div className="md:w-1/2">
              <Image
                src={convertToWebP(post.post_media_url[0])}
                alt={post.post_name}
                width={400}
                height={300}
                layout="responsive"
              />
            </div>
            <div className="md:w-1/2">
              <div className="sticky top-0">
                {/* Display post information on the right side */}
                <h1 className="text-2xl font-bold mb-4">{post.post_name}</h1>
                <p className="text-gray-600 mb-4">
                  Category: {post.category_name}
                </p>
                <p className="text-gray-600 mb-4">Poet: {post.poet_name}</p>
                <div className="prose max-w-none mb-4 overflow-auto">
                  {/* Add "overflow-auto" class to make the content scrollable */}
                  {ReactHtmlParser(post.post_description)}
                </div>
                <p className="text-gray-600">Total Views: {post.view}</p>
                <div className="mt-4">
                  <h3 className="text-xl font-semibold">Tags:</h3>
                  <div className="flex flex-wrap space-x-2 mt-2">
                    {post.post_tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="bg-blue-500 text-white rounded-full px-2 py-1 text-sm mb-2"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {/* Display the image on the left for screens larger than md */}
          </div>
        </div>
      ))}
    </>
  );
};

export default PostSection;
