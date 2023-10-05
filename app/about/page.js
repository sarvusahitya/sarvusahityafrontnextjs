"use client";
import { useEffect, useState } from "react";

import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import "./AboutSlider.css";

function Sliders() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const [sliders, setSliders] = useState([]);
  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });

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

  return (
    <>
      <div className="navigation-wrapper">
        <div ref={sliderRef} className="keen-slider">
          {sliders.map((slider) => (
            <div
              key={slider._id}
              className={`keen-slider__slide number-slide${slider._id}`}
            >
              {/* You can render dynamic content for each slide here */}
              <h2>{slider.slider_name}</h2>
              <img src={slider.slider_media_url} alt={slider.slider_name} />
              {/* Add more content here */}
            </div>
          ))}
        </div>
        {instanceRef.current &&
          instanceRef.current.track &&
          instanceRef.current.track.details && (
            <>
              <Arrow
                left
                onClick={(e) =>
                  e.stopPropagation() || instanceRef.current?.prev()
                }
                disabled={currentSlide === 0}
              />

              <Arrow
                onClick={(e) =>
                  e.stopPropagation() || instanceRef.current?.next()
                }
                disabled={currentSlide === (3?.length || 0) - 1}
              />
            </>
          )}
      </div>
      {instanceRef.current && (
        <div className="dots">
          {[...Array(3?.length || 0).keys()].map((idx) => {
            return (
              <button
                key={idx}
                onClick={() => {
                  instanceRef.current?.moveToIdx(idx);
                }}
                className={"dot" + (currentSlide === idx ? " active" : "")}
              ></button>
            );
          })}
        </div>
      )}
    </>
  );
}

function Arrow(props) {
  const disabled = props.disabled ? " arrow--disabled" : "";
  return (
    <svg
      onClick={props.onClick}
      className={`arrow ${
        props.left ? "arrow--left" : "arrow--right"
      } ${disabled}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      {props.left && (
        <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
      )}
      {!props.left && (
        <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
      )}
    </svg>
  );
}
export default Sliders;
