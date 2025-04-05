"use client";
import React, { useState } from "react";
import axios from "axios";

// Slider simple
const Slider = ({ images }) => {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % images.length);
  const prev = () => setCurrent((prev) => (prev - 1 + images.length) % images.length);

  if (images.length === 0) return null;

  return (
    <div className="relative w-[100px] h-[100px]">
      <img
        src={images[current]}
        alt={`Slide ${current}`}
        className="w-full h-full object-cover border"
      />
      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black text-white px-1"
          >
            ◀
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black text-white px-1"
          >
            ▶
          </button>
        </>
      )}
    </div>
  );
};

export default Slider ; 