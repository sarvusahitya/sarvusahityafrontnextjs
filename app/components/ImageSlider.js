// Components/Gallery.js
"use client";
import { useEffect, useState } from "react";

import { Navigation, Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";

// import "./../swiper/css/navigation";
// import "/swiper/css/pagination";
const Gallery = ({ sliders }) => {
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState("");

  const [currentSlide, setCurrentSlide] = useState(0);

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const slides = sliders.map((slider) => ({
    src: slider.slider_media_url,
    width: 3840,
    height: 2560,
  }));

  return (
    <Swiper
      spaceBetween={10}
      slidesPerView={2}
      autoplay={{ delay: 0 }}
      className="z-0 relative"
    >
      {sliders.map((x, index) => {
        return (
          <SwiperSlide key={x._id}>
            <img src={x.slider_media_url} alt="Slide 1" />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default Gallery;
