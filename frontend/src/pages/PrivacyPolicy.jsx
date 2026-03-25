import React from "react";
import Title from "../components/Title";
import NewsletterBox from "../components/NewsletterBox";

const PrivacyPolicy = () => {
  return (
    <div className="border-t pt-14">
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"PRIVACY "} text2={"POLICY"} />
      </div>

      <div className="my-10 flex flex-col gap-8 text-gray-600">
        <div className="flex flex-col gap-4">
          <p>
            At Zeynova, we are committed to protecting your privacy. This Privacy Policy 
            explains how we collect, use, and safeguard your personal information.
          </p>

          <b className="text-gray-800 text-xl">Information We Collect</b>
          <p>
            We collect information you provide directly to us, such as when you create 
            an account, make a purchase, or contact our customer support. This may 
            include your name, email address, shipping address, and payment details.
          </p>

          <b className="text-gray-800 text-xl">How We Use Your Information</b>
          <p>
            Your information is used to process orders, improve our website, and 
            communicate with you about your account or our products. We do NOT 
            sell your personal data to third parties.
          </p>

          <b className="text-gray-800 text-xl">Security</b>
          <p>
            We implement a variety of security measures to maintain the safety of 
            your personal information. All sensitive information is transmitted 
            via Secure Socket Layer (SSL) technology.
          </p>

          <b className="text-gray-800 text-xl">Cookies</b>
          <p>
            We use cookies to enhance your experience on our website. You can 
            choose to disable cookies through your browser settings, but this 
            may affect some features of the site.
          </p>

          <p>
            We may update this policy from time to time. Please check this page 
            periodically for any changes.
          </p>
        </div>
      </div>

      <NewsletterBox />
    </div>
  );
};

export default PrivacyPolicy;
