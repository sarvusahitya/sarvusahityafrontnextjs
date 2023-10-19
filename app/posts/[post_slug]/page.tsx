// Components/Gallery.js
"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

import Link from "next/link";
const PostSection = () => {
  // data/users.js
  const pathname = usePathname();
  const parts = pathname.split("/");
  const lastSlug = parts[parts.length - 1];
  const [posts, setPostData] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add a loading state

  useEffect(() => {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/posts`;
    const reqBody = {
      _id: lastSlug,
    };
    console.log(reqBody);

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

  return (
    <>
      {posts.map((post, index) => (
        <div key={index}>
          {" "}
          {/* Added a wrapping div */}
          <h2 className="text-2xl font-bold mb-4">{post.post_name}</h2>
          <img src={post.post_media_url[0]} alt={post.post_name} />
          <div className="mt-4">
            <p className="text-gray-500">{post.createdAt}</p>
            <div dangerouslySetInnerHTML={{ __html: post.post_description }} />
          </div>
          <div className="mt-4">
            <div className="flex space-x-2">
              {post.post_tags.map((tag, tagIndex) => (
                <span
                  key={tagIndex}
                  className="px-2 py-1 bg-gray-200 text-gray-700 text-sm rounded-full m-2"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-4">
            <h3>Poet Information:</h3>
            <p>Poet Name: {post.poet_data[0].poet_name}</p>
            <p>Birthplace: {post.poet_data[0].poet_birthplace}</p>
            {/* Add more poet details as needed */}
          </div>
        </div>
      ))}
    </>
  );
};

export default PostSection;
