import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Contact = () => {
  const [rotatedText, setRotatedText] = useState("");

  useEffect(() => {
    const text = "CONTACT - SEND ME AN EMAIL";
    const transformedText = text.split("").map((character, index) => (
      <span
        key={index}
        className="absolute origin-[0.3rem_5rem]"
        style={{ transform: `rotate(${index * 12}deg)` }}
      >
        {character}
      </span>
    ));
    setRotatedText(transformedText);
  }, []);

  return (
    <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-20 lg:px-8 ">
      <div className="max-w-3xl text-center sm:text-center md:mx-auto md:mb-12">
        <p className="text-base font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-200">
          Contact
        </p>
        <h2 className="font-heading mb-4 font-bold tracking-tight text-gray-900 dark:text-white text-3xl sm:text-5xl">
          Get in Touch
        </h2>
      </div>
      <div className="mt-5 lg:mt-15 lg:flex gap-x-6 sm:flex">
        <div className="lg:w-full md:w-full bg-gray-300 rounded-lg overflow-hidden sm:mr-10 p-10 flex  relative">
          {/* map */}
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3794.8970071767185!2d79.52826367495616!3d17.983528085358767!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a334fbb37aee6c3%3A0xf1b2c37fcb8fefce!2sNational%20Institute%20of%20Technology%2C%20Warangal%20(NIT%20Warangal)!5e0!3m2!1sen!2sin!4v1713010319853!5m2!1sen!2sin"
            width="100%"
            height="100%"
            className="absolute inset-0"
            title="map"
            style={{ filter: "grayscale(1) contrast(1.2) opacity(0.7)" }}
          ></iframe>

          {/* rotation */}

          <div className="bg-white">
            <Link
              to="mailto:loginbook123@gmail.com"
              id="contact_btn"
              className="w-[10rem] h-[10rem] rounded-full text-[#000e17] grid place-items-center absolute lg:right-[40%] sm:right-[40%] xs:right-[30%] sm:top-[25%] top-[-10%] cursor-pointer [transition:all_400ms_ease] hover:shadow-2xl hover:shadow-gray-900 hover:-translate-y-[1rem] hover:text-[#000e17]"
            >
              <i className="uil uil-arrow-up-right absolute text-[3.5rem]"></i>
              <p className="text-[#000e17] font-semibold w-[10rem] h-[10rem] flex justify-center animate-[spinText_30s_linear_infinite]">
                {rotatedText}
              </p>
            </Link>
          </div>
        </div>

        {/* right side */}
        <div className="max-w-full mx-auto rounded-lg overflow-hidden text-gray-900 dark:text-gray-50">
          <div className="px-6 py-4">
            <h3 className="text-lg font-bold ">Our Address</h3>
            <p className="mt-1 text-gray-400">
              Nitw Campus, Warangal, Telangana, India, 506004
            </p>
          </div>
          <div className="border-t border-gray-600 px-6 py-4">
            <h3 className="text-lg font-bold ">Hours</h3>
            <p className="mt-1 text-gray-400">Monday - Friday: 9am - 5pm</p>
            <p className="mt-1 text-gray-400">Saturday: 10am - 4pm</p>
            <p className="mt-1 text-gray-400">Sunday: Closed</p>
          </div>
          <div className="border-t border-gray-600 px-6 py-4">
            <h3 className="text-lg font-bold ">Contact</h3>
            <p className="mt-1 text-gray-400">
              Email: loginbook123@example.com
            </p>
            <p className="mt-1 text-gray-400">Phone: +91 6206573315</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

// access key
// q033EokQwMal0-g4QqpenkjiLleUfGenB1UpiHBVPkQ

// secret key
// 1sfvGmeN6F26jyfi5zHldHyTSpUfmgOVsiBovBMF_vg
