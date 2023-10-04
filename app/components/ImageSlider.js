// Components/Gallery.js
"use client";
import React, { useState } from "react";
import { AiOutlineExpandAlt } from "react-icons/ai";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";

const Gallery = () => {
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState("");

  const galleryTab = [
    // you can add more image if you want
    {
      imageUrl:
        "https://codetraction.com/fileupload/uploads/slider/20230918_094917.png",
      type: "Nature",
      title: "Beautiful Work",
    },
    {
      imageUrl:
        "https://codetraction.com/fileupload/uploads/slider/20230903_212014.png",
      type: "Nature",
      title: "Beautiful Work",
    },
    {
      imageUrl:
        "https://codetraction.com/fileupload/uploads/slider/2023-09-03_22-06-37.jpg",
      type: "Nature",
      title: "Beautiful Work",
    },
  ];
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const slides = galleryTab.map((item) => ({
    src: item.imageUrl,
    width: 3840,
    height: 2560,
  }));

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {galleryTab.map((x, index) => {
          return (
            <div
              key={index}
              className="group cursor-pointer relative"
              onClick={() => openLightbox(index)}
            >
              <div
                className="bg-cover bg-center h-80 md:h-96 lg:h-80 w-full bg-no-repeat"
                style={{ backgroundImage: `url("${x.imageUrl}")` }}
              >
                <div className="text-3xl text-white absolute bottom-0 left-2 z-10">
                  <div>{x.type}</div>
                  <div>{x.title}</div>
                </div>
              </div>
              <div className="bg-black opacity-0 group-hover:opacity-75 absolute inset-0 flex items-center justify-center transition-all duration-300 ease-in-out">
                <AiOutlineExpandAlt className="text-5xl border w-16 h-16 bg-neutral-500 hover:bg-white hover:text-black p-3 cursor-pointer rounded-full" />
              </div>
            </div>
          );
        })}
      </div>
      <Lightbox
        open={open}
        initialSlide={selectedImageIndex}
        close={() => setOpen(false)}
        plugins={[Zoom]}
        showPrevNext={true}
        slides={slides}
      />
    </div>
  );
};

export default Gallery;
