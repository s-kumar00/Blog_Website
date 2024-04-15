import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Contact = () => {
  const [image, setImage] = useState();
  const [rotatedText, setRotatedText] = useState("");

  useEffect(() => {
    const text = "CONTACT - SEND ME AN EMAIL";
    const transformedText = text.split("").map((character, index) => (
      <span
        key={index}
        className="absolute origin-[0.3rem_5rem] text-dark"
        style={{ transform: `rotate(${index * 12}deg)` }}
      >
        {character}
      </span>
    ));
    setRotatedText(transformedText);
  }, []);

  useEffect(() => {
    const getImage = async () => {
      const query = "map";
      const response = await axios.get(
        `https://source.unsplash.com/1920x1080/?${query}`
      );
      setImage(response.request.responseURL);
    };
    getImage();
  }, []);

  return (
    <div className="h-screen relative bg-dark">
      <div className="relative h-screen flex flex-col bg-clip-border bg-transparent text-gray-700 shadow-md overflow-hidden">
        <img
          src={image}
          alt="bg"
          className="absolute inset-0 object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/60 "></div>
        <div className="p-6 relative">
          <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-20 lg:px-8 text-white ">
            <div className="max-w-3xl text-center sm:text-center md:mx-auto md:mb-12">
              <p className="text-base font-semibold uppercase tracking-wide text-blue-700">
                Contact
              </p>
              <h2 className="font-heading mb-4 font-bold tracking-tight text-dark text-3xl sm:text-5xl">
                Get in Touch
              </h2>
            </div>
            <div className="mt-5 lg:mt-15 lg:flex gap-x-6 sm:flex">
              <div className="lg:w-full md:w-full bg-light rounded-lg overflow-hidden sm:mr-10 p-10 flex  relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3794.8970071767185!2d79.52826367495616!3d17.983528085358767!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a334fbb37aee6c3%3A0xf1b2c37fcb8fefce!2sNational%20Institute%20of%20Technology%2C%20Warangal%20(NIT%20Warangal)!5e0!3m2!1sen!2sin!4v1713010319853!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  className="absolute inset-0"
                  title="map"
                  style={{ filter: "grayscale(1) contrast(1.2) opacity(0.7)" }}
                ></iframe>

                <div className="bg-white text-black">
                  <Link
                    to="mailto:loginbook123@gmail.com"
                    id="contact_btn"
                    className="w-[10rem] h-[10rem] rounded-full text-dark grid place-items-center absolute lg:right-[40%] sm:right-[40%] xs:right-[30%] sm:top-[25%] top-[-10%] cursor-pointer [transition:all_400ms_ease] hover:shadow-2xl hover:shadow-gray-900 hover:-translate-y-[1rem] hover:text-dark"
                  >
                    <i className="uil uil-arrow-up-right absolute text-dark text-[3.5rem]"></i>
                    <p className="text-dark font-semibold w-[10rem] h-[10rem] flex justify-center animate-[spinText_30s_linear_infinite]">
                      {rotatedText}
                    </p>
                  </Link>
                </div>
              </div>

              <div className="max-w-full mx-auto rounded-lg overflow-hidden text-dark">
                <div className="px-6 py-4">
                  <h3 className="text-lg font-bold ">Our Address</h3>
                  <p className="mt-1 text-gray-400 ">
                    Nitw Campus, Warangal, Telangana, India, 506004
                  </p>
                </div>
                <div className="border-t border-dark px-6 py-4">
                  <h3 className="text-lg font-bold ">Hours</h3>
                  <p className="mt-1 text-gray-400">
                    Monday - Friday: 9am - 5pm
                  </p>
                  <p className="mt-1 text-gray-400">Saturday: 10am - 4pm</p>
                  <p className="mt-1 text-gray-400">Sunday: Closed</p>
                </div>
                <div className="border-t border-dark px-6 py-4">
                  <h3 className="text-lg font-bold">Contact</h3>
                  <p className="mt-1 text-gray-400">
                    Email: loginbook123@example.com
                  </p>
                  <p className="mt-1 text-gray-400">Phone: +91 6206573315</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
