// Components/Gallery.js
"use client";
import { useEffect, useState } from "react";

import { Navigation, Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";

// import "./../swiper/css/navigation";
// import "/swiper/css/pagination";
const Gallery = ({ sliders }) => {
  const convertToWebP = (url) => {
    // Check if the URL already ends with .webp, if not, replace the extension
    if (!url.endsWith(".webp")) {
      return url.replace(/\.(jpg|jpeg|png)/, ".webp");
    }
    return url;
  };

  const [open, setOpen] = useState(false);
  const [image, setImage] = useState("");

  const [currentSlide, setCurrentSlide] = useState(0);

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const slides = sliders.map((slider) => ({
    src: slider.slider_media_url,
    width: 3840,
    height: 2560,
  }));
  const webpSliders = sliders.map((slider) => ({
    ...slider,
    slider_media_url: convertToWebP(slider.slider_media_url),
  }));

  return (
    <Swiper
      spaceBetween={10}
      slidesPerView={2}
      autoplay={{ delay: 0 }}
      className="z-0 relative"
    >
      {webpSliders.map((x, index) => {
        return (
          <SwiperSlide key={x._id}>
            <img
              src={x.slider_media_url}
              alt="Slide 1"
              width={1200}
              height={100}
            />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default Gallery;
