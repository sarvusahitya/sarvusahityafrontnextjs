"use client";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import axios from "axios";

const ImageSlider = dynamic(() => import("../app/components/ImageSlider"));
const PoetSection = dynamic(() => import("../app/components/PoetSection"));
const CategorySection = dynamic(
  () => import("../app/components/CategorySection")
);
const PostSection = dynamic(() => import("../app/components/PostSection"));

export default function Home() {
  const [sliderData, setSliderData] = useState(null);
  const [categoryData, setCategoryData] = useState(null);
  const [poetData, setPoetData] = useState(null);
  const [postData, setPostData] = useState(null);
  // Make a POST request to the API

  function getSliderData() {
    // Define your API endpoint URL
    const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/sliders`;

    // Define the request body
    const reqBody = {
      page: 1,
      size: 10,
      orderby: -1,
      orderbycolumnname: "createdAt",
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
          setSliderData(data.data);
          getCategoryData();
        } else {
          console.error("Failed to fetch sliders");
          getCategoryData();
        }
      })
      .catch((error) => {
        getCategoryData();
        console.error("Error fetching sliders:", error);
      });
  }
  function getCategoryData() {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/categorys`;

    // Define the request body
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
          setCategoryData(data.data);
          getPoetData();
        } else {
          console.error("Failed to fetch sliders");
          getCategoryData();
        }
      })
      .catch((error) => {
        getPoetData();
        console.error("Error fetching sliders:", error);
      });
    // Make a POST request to the API
  }
  function getPoetData() {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/poets`;

    // Define the request body
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
          getPostData();
        } else {
          console.error("Failed to fetch sliders");
          getCategoryData();
        }
      })
      .catch((error) => {
        getPostData();
        console.error("Error fetching sliders:", error);
      });
    // Make a POST request to the API
  }

  function getPostData() {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/posts`;

    // Define the request body
    const reqBody = {
      page: 1,
      size: 20,
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
          setPostData(data.data);
        } else {
          console.error("Failed to fetch sliders");
          getCategoryData();
        }
      })
      .catch((error) => {
        getPostData();
        console.error("Error fetching sliders:", error);
      });
  }
  useEffect(() => {
    getSliderData();
  }, []);

  return (
    <section>
      {sliderData && <ImageSlider sliders={sliderData} />}
      {categoryData && <CategorySection category={categoryData} />}
      {poetData && <PoetSection poets={poetData} />}
      {postData && <PostSection posts={postData} />}
    </section>
  );
}
