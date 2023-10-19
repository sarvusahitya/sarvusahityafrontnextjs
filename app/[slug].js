// Components/Gallery.js
"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
const PostDetails = () => {
  // data/users.js

  const router = useRouter();
  const { slug } = router.query;

  console.log(slug);
  const [postdata, setPostDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add a loading state

  useEffect(() => {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/posts`;
    const reqBody = {
      page: 1,
      size: 50,
      orderby: -1,
      orderbycolumnname: "view",
      post_slug: slug,
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
          console.log(data);
          setPostDetails(data.data);
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
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{post.post_name}</h1>
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-500">{post.poet_name}</p>
        <p className="text-sm text-gray-500">{post.createdAt}</p>
      </div>
      <div className="mb-4">
        <Image
          src={post.post_media_url[0]}
          alt={post.post_name}
          width={800}
          height={400}
        />
      </div>
      <div
        className="prose"
        dangerouslySetInnerHTML={{ __html: post.post_description }}
      />
    </div>
  );
};

export default PostDetails;
