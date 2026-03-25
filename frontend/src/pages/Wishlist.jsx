import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import Productitem from "../components/Productitem";

const Wishlist = () => {
  const { products, userProfile, token } = useContext(ShopContext);
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    if (userProfile && userProfile.wishlist && products.length > 0) {
      const items = products.filter((item) =>
        userProfile.wishlist.includes(item._id)
      );
      setWishlistItems(items);
    } else {
        setWishlistItems([]);
    }
  }, [userProfile, products]);

  if (!token) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500">Please login to view your Wish List.</p>
      </div>
    );
  }

  return (
    <div className="border-t pt-10">
      <div className="text-2xl mb-8">
        <Title text1={"MY "} text2={"WISH LIST"} />
      </div>

      {wishlistItems.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
          {wishlistItems.map((item, index) => (
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
      ) : (
        <div className="text-center py-20">
          <p className="text-gray-500 italic">Your wish list is currently empty.</p>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
