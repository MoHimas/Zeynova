import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsletterBox from "../components/NewsletterBox";

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"ABOUT "} text2={"US"} />
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          src={assets.about_img}
          className="w-full md:max-w-[450px]"
          alt=""
        />
        <div className="flex flex-col gap-6 justify-center md:w-2/4 text-gray-600">
          <p>
            At ZEYNOVA, we specialize in high-quality fashion — from everyday
            essentials to trending statement pieces. Each garment is ethically
            manufactured and carefully designed to prioritize comfort, style,
            and durability.
          </p>
          <p>
            With years of experience in the fashion industry, we serve fashion
            enthusiasts worldwide who value quality, modern design, and
            transparency. Our commitment is to deliver apparel that exceeds
            expectations in both style and value.
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p>
            We aim to be your trusted partner in style by providing ethically
            sourced, high-quality fashion with exceptional craftsmanship.
            Through innovation and a customer-first approach, we ensure our
            audience receives timeless clothing that lasts.
          </p>
        </div>
      </div>
      <div className="text-xl py-4">
        <Title text1={"WHY "} text2={"CHOOSE US"} />
      </div>
      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance:</b>
          <p className="text-gray-600">
            Every article of clothing undergoes rigorous inspection to ensure
            fabric quality, stitching precision, and durability meet the highest
            standards of modern fashion.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenience:</b>
          <p className="text-gray-600">
            We offer a seamless buying experience with detailed product
            descriptions, secure payment options, and worldwide shipping to your
            doorstep.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Customer Support:</b>
          <p className="text-gray-600">
            Our customer service team is always ready to assist you with
            personalized sizing advice, after-sales support, and guidance on
            garment care.
          </p>
        </div>
      </div>
      <NewsletterBox />
    </div>
  );
};

export default About;
