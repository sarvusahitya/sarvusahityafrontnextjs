// Components/Gallery.js
"use client";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { convertToWebP } from "@/utils/ssutils";
import axios from "axios";

import Image from "next/image";
import ProfilePicture from "../components/ProfilePicture";
const PostSection = () => {
  // data/users.js

  const [posts, setPostData] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add a loading state
  const [page, setPage] = useState(0); // Track the page number

  const loadMorePosts = () => {
    setIsLoading(true);
    // Fetch more data based on the next page number
    const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/posts`;
    const reqBody = {
      page: page + 1, // Increment the page number
      size: 8,
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
          setPostData([...posts, ...data.data]); // Append new data to the existing posts
          setPage(page + 1); // Update the page number
          setIsLoading(false);
        } else {
          console.error("Failed to fetch more posts");
        }
      })
      .catch((error) => {
        console.error("Error fetching more posts:", error);
      });
  };

  useEffect(() => {
    loadMorePosts();
  }, []);

  useEffect(() => {
    // Create an IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading) {
          // When the last element is intersecting and not loading, load more data
          loadMorePosts();
        }
      },
      {
        threshold: 1, // 1 means when the last element is fully in the viewport
      }
    );

    if (posts.length > 0) {
      observer.observe(document.getElementById(`post-${posts.length - 1}`));
    }

    return () => {
      observer.disconnect(); // Disconnect the observer when the component is unmounted
    };
  }, [posts, isLoading]);

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Post</h2>

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {posts.map((post, index) => (
          <div
            className="bg-white rounded-lg shadow-md p-4"
            key={index}
            id={`post-${index}`}
          >
            <Image
              src={convertToWebP(post.post_media_url[0])}
              alt={post.post_name}
              width={1200}
              height={100}
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
        {isLoading && <p>Loading...</p>}
      </div>
    </>
  );
};

export default PostSection;
