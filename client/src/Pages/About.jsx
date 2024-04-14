import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

const About = () => {
  const [image, setImage] = useState();

  useEffect(() => {
    const getImage = async () => {
      const response = await axios.get(
        "https://api.unsplash.com/photos/random?query=natural&client_id=q033EokQwMal0-g4QqpenkjiLleUfGenB1UpiHBVPkQ"
      );
      setImage(response.data.urls.full);
    };
    getImage();
  }, []);

  return (
    <div
      className="h-screen bg-cover bg-no-repeat "
      style={{ backgroundImage: `url(${image})` }}
    >
      About
    </div>
  );
};

export default About;
