import React from "react";
import Title from "../components/Title";
import NewsletterBox from "../components/NewsletterBox";

const Delivery = () => {
  return (
    <div className="border-t pt-14">
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"DELIVERY "} text2={"INFORMATION"} />
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-16 text-gray-600">
        <div className="flex flex-col gap-6">
          <p>
            We strive to provide reliable and efficient delivery services for all our customers. 
            Once your order is placed, our team works quickly to process and ship your items.
          </p>
          
          <b className="text-gray-800 text-xl">Shipping Methods & Costs</b>
          <p>
            We offer various shipping options to suit your needs. Delivery costs are calculated 
            based on the weight of your order and the destination. You can view the final 
            shipping fee at the checkout page.
          </p>

          <b className="text-gray-800 text-xl">Estimated Delivery Time</b>
          <p>
            - Standard Shipping: 5-7 business days<br />
            - Express Shipping: 2-3 business days<br />
            - International Shipping: 10-15 business days
          </p>

          <p>
            Please note that these are estimated times and may vary during peak seasons or 
            due to unforeseen circumstances. You will receive a tracking number via email 
            once your order has been dispatched.
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row text-sm mb-20 gap-4">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 flex-1">
          <b>Safe Packaging:</b>
          <p className="text-gray-600">
            Every item is carefully packed to ensure it reaches you in perfect condition.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 flex-1">
          <b>Global Shipping:</b>
          <p className="text-gray-600">
            We deliver to over 100 countries worldwide with reliable logistics partners.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 flex-1">
          <b>Easy Tracking:</b>
          <p className="text-gray-600">
            Track your order in real-time through our dashboard or the courier's website.
          </p>
        </div>
      </div>

      <NewsletterBox />
    </div>
  );
};

export default Delivery;
