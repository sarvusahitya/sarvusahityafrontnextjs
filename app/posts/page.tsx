// Components/Gallery.js
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

import ProfilePicture from "../components/ProfilePicture";
const PostSection = () => {
  // data/users.js

  const [posts, setPostData] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add a loading state

  useEffect(() => {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/posts`;
    const reqBody = {
      page: 1,
      size: 50,
      orderby: -1,
      orderbycolumnname: "view",
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
          setPostData(data.data);
          setIsLoading(false); // Set loading to false when data is fetched
        } else {
          console.error("Failed to fetch categories");
        }
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Post</h2>

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {posts.map((post, index) => (
          <div className="bg-white rounded-lg shadow-md p-4" key={index}>
            <img
              src={post.post_media_url[0]}
              alt={post.post_name}
              className=""
            />
            <div className="mt-4">
              <h2 className="text-xl font-semibold">{post.post_name}</h2>
              <p className="text-gray-500">{post.createdAt}</p>
              <p className="mt-2">
                {post.post_description.length > 100
                  ? `${post.post_description.substring(0, 100)}...`
                  : post.post_description}
              </p>
            </div>
            <div className="mt-4">
              <div className="flex space-x-2">
                {post.post_tags
                  .filter((tag) => tag.length < 20)
                  .slice(0, 3) // Filter tags with length < 20
                  .map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-200 text-gray-700 text-sm rounded-full m-2"
                    >
                      {tag}
                    </span>
                  ))}
              </div>
              <div className=" bottom-0 left-0 w-full p-4 bg-white opacity-80 flex justify-between">
                <Link
                  href={`/posts/${post._id}`}
                  className="text-blue-600 hover:underline"
                >
                  Read More
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default PostSection;
