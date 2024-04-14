import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

const About = () => {
  const [image, setImage] = useState();

  useEffect(() => {
    const getImage = async () => {
      const random_number = Math.floor(Math.random() * 1000);
      const query = "nature";
      const response = await axios.get(
        `https://source.unsplash.com/random/${random_number}?${query}`
      );
      setImage(response.request.responseURL);
    };
    getImage();
  }, []);

  return (
    <div className="h-screen relative">
      <div
        className="absolute inset-0 bg-cover bg-no-repeat opacity-50"
        style={{ backgroundImage: `url(${image})` }}
      />
      <div className="relative font-bold text-2xl text-black dark:text-white">
        About
      </div>
    </div>
  );
};

export default About;
