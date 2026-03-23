import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import Productitem from "./Productitem";

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestseller, setBestseller] = useState([]);

  useEffect(() => {
    if (products && products.length > 0) {
      const bestProduct = products.filter((item) => item.bestseller);
      setBestseller(bestProduct.slice(0, 5));
    }
  }, [products]);

  return (
    <div className="my-10">
      <div className="text-center text-3xl py-8">
        <Title text1={"BEST "} text2={"SELLERS"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Explore our most popular pieces, curated for quality and style. From
          everyday essentials to statement outfits, our best-selling items are
          loved for their perfect fit and timeless design. Discover why these
          favorites are must-haves for every wardrobe.
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {bestseller.map((item, index) => (
          <Productitem
            key={index}
            id={item._id}
            price={item.price}
            image={item.image}
            offerPrice={item.offerPrice}
          />
        ))}
      </div>
    </div>
  );
};

export default BestSeller;
