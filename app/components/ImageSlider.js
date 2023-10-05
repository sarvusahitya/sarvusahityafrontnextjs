// Components/Gallery.js
"use client";
import { useEffect, useState } from "react";

import { Navigation, Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";

// import "./../swiper/css/navigation";
// import "/swiper/css/pagination";
const Gallery = () => {
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState("");

  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const [sliders, setSliders] = useState([]);
  useEffect(() => {
    // Define your API endpoint URL
    const apiUrl = "https://sarvu-sahitya-qdly.onrender.com/sliders";

    // Define the request body
    const reqBody = {
      page: 1,
      size: 10,
      orderby: -1,
      orderbycolumnname: "createdAt",
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
        console.log(data);
        if (data.success) {
          setSliders(data.data);
        } else {
          console.error("Failed to fetch sliders");
        }
      })
      .catch((error) => {
        console.error("Error fetching sliders:", error);
      });
  }, []);

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const slides = sliders.map((slider) => ({
    src: slider.slider_media_url,
    width: 3840,
    height: 2560,
  }));

  return (
    <div className="swiper-container">
      <Swiper
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 1000 }}
      >
        {sliders.map((x, index) => {
          return (
            <SwiperSlide key={x._id}>
              <img src={x.slider_media_url} alt="Slide 1" />
            </SwiperSlide>
          );
        })}
      </Swiper>
      <div className="swiper-button-next"></div>
    </div>
  );
};

export default Gallery;
