import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

const Productitem = ({ id, image, name, price, stock, offerPrice }) => {
  const { currency } = useContext(ShopContext);

  return (
    <Link className="text-gray-700 cursor-pointer" to={`/product/${id}`}>
      <div className="overflow-hidden relative">
        <img
          src={image[0]}
          className="hover:scale-110 transition ease-in-out"
          alt=""
        />
        {stock === 0 && (
          <p className="absolute top-2 left-2 bg-red-500 text-white text-[10px] px-2 py-0.5 rounded shadow-sm">
            Out of Stock
          </p>
        )}
        {offerPrice > 0 && stock > 0 && (
          <p className="absolute top-2 right-2 bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm animate-pulse">
            OFFER
          </p>
        )}
      </div>
      <p className="pt-3 pb-1 text-sm">{name}</p>
      <div className="flex items-center gap-2">
        <p className={`text-sm font-medium ${offerPrice > 0 ? "text-orange-600" : ""}`}>
          {currency}
          {offerPrice > 0 ? offerPrice : price}
        </p>
        {offerPrice > 0 && (
          <p className="text-xs text-gray-400 line-through">
            {currency}
            {price}
          </p>
        )}
      </div>
    </Link>
  );
};

export default Productitem;
