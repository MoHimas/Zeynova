import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import Productitem from "./Productitem";

const PersonalizedRecommendations = () => {
  const { products, userProfile } = useContext(ShopContext);
  const [recommendations, setRecommendations] = useState([]);
  const [title, setTitle] = useState({ text1: "RECOM", text2: "MENDED" });

  useEffect(() => {
    if (products.length > 0) {
      if (userProfile && userProfile.wishlist && userProfile.wishlist.length > 0) {
        // Get categories from wishlist
        const wishlistProducts = products.filter(p => userProfile.wishlist.includes(p._id));
        const favoriteCategories = [...new Set(wishlistProducts.map(p => p.category))];
        
        // Filter products from those categories, excluding wishlist items
        let recommended = products.filter(p => 
          favoriteCategories.includes(p.category) && 
          !userProfile.wishlist.includes(p._id)
        );

        // If not enough from wishlist categories, add bestsellers
        if (recommended.length < 5) {
          const bestsellers = products.filter(p => p.bestseller && !userProfile.wishlist.includes(p._id));
          recommended = [...new Set([...recommended, ...bestsellers])];
        }

        setTitle({ text1: "RECOMMENDED", text2: "FOR YOU" });
        setRecommendations(recommended.slice(0, 5));
      } else {
        // Fallback for guest or new users: Best Sellers
        const bestsellers = products.filter(p => p.bestseller);
        setTitle({ text1: "TRENDING", text2: "FOR YOU" });
        setRecommendations(bestsellers.slice(0, 5));
      }
    }
  }, [products, userProfile]);

  if (recommendations.length === 0) return null;

  return (
    <div className="my-24">
      <div className="text-center text-3xl py-8">
        <Title text1={title.text1} text2={title.text2} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Based on your preferences and what others are loving right now.
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {recommendations.map((item, index) => (
          <Productitem
            key={index}
            id={item._id}
            name={item.name}
            price={item.price}
            image={item.image}
            stock={item.stock}
            offerPrice={item.offerPrice}
          />
        ))}
      </div>
    </div>
  );
};

export default PersonalizedRecommendations;
