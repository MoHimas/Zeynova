import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        <div>
          <Link to="/" onClick={scrollToTop}>
            <img src={assets.logo} className="mb-5 w-32" alt="" />
          </Link>
          <p className="w-full md:w-2/3 text-gray-600">
          Experience the perfect blend of fashion and comfort with our latest
          apparel collections. We are dedicated to providing high-quality
          clothing that fits your lifestyle, ensuring you look and feel your
          best every day.
          </p>
        </div>
        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <Link to="/" onClick={scrollToTop}><li>Home</li></Link>
            <Link to="/about" onClick={scrollToTop}><li>About us</li></Link>
            <Link to="/delivery" onClick={scrollToTop}><li>Delivery</li></Link>
            <Link to="/privacy-policy" onClick={scrollToTop}><li>Privacy Policy</li></Link>
          </ul>
        </div>
        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>+1-123-789-123</li>
            <li>zeynova@gmail.com</li>
          </ul>
        </div>
      </div>
      <div>
        <hr />
        <p className="py-5 text-sm text-center">
          Copyright 2025@ Zeynova.com - All Right Reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
