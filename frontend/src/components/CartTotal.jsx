import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";

const CartTotal = () => {
  const { currency, delivery_fee, getCartAmount, products, cartItems } = useContext(ShopContext);

  let originalAmount = 0;
  for (const items in cartItems) {
    let itemInfo = products.find((product) => product._id === items);
    if (!itemInfo) continue;
    for (const item in cartItems[items]) {
      try {
        if (cartItems[items][item] > 0) {
          originalAmount += itemInfo.price * cartItems[items][item];
        }
      } catch (error) {}
    }
  }

  const cartAmount = getCartAmount();
  const discount = originalAmount - cartAmount;

  return (
    <div className="w-full">
      <div className="text-2xl">
        <Title text1={"CART "} text2={"TOTALS"} />
      </div>
      <div className="flex flex-col gap-2 mt-2 text-sm">
        <div className="flex justify-between">
          <p>Subtotal</p>
          <p>
            {currency}
            {originalAmount}.00
          </p>
        </div>
        {discount > 0 && (
          <>
            <hr />
            <div className="flex justify-between text-orange-600">
              <p>Discount</p>
              <p>
                -{currency}
                {discount}.00
              </p>
            </div>
          </>
        )}
        <hr />
        <div className="flex justify-between">
          <p>Shipping Fee</p>
          <p>
            {currency}
            {delivery_fee}.00
          </p>
        </div>
        <hr />
        <div className="flex justify-between">
          <b>Total</b>
          <b>
            {currency}
            {cartAmount === 0 ? 0 : cartAmount + delivery_fee}.00
          </b>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
