import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const List = ({ token }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");

      if (response.data.success) {
        setList(response.data.products || []);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/product/remove",
        { id },
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <p className="mb-2">All Products List</p>
      <div className="flex flex-col gap-2">
        {/* list table title - Hidden on mobile */}
        <div className="hidden md:grid grid-cols-[1fr_3.5fr_1.5fr_1fr_1fr_0.5fr_0.5fr_0.5fr] items-center py-2 px-4 border bg-gray-100 text-sm font-semibold rounded-t">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Offer</b>
          <b className="text-center">Stock</b>
          <b className="text-center">Edit</b>
          <b className="text-center">Remove</b>
        </div>

        {/* product list */}
        {list.map((item, index) => (
          <div
            className="grid grid-cols-1 md:grid-cols-[1fr_3.5fr_1.5fr_1fr_1fr_0.5fr_0.5fr_0.5fr] items-center gap-3 md:gap-4 py-4 px-4 border text-[13px] md:text-sm bg-white md:bg-transparent rounded-lg md:rounded-none shadow-sm md:shadow-none mb-4 md:mb-0"
            key={index}
          >
            {/* Image - Centered on mobile */}
            <div className="flex md:block flex-col items-center gap-2">
              <img className="w-20 md:w-full rounded shadow-sm md:shadow-none" src={item.image[0]} alt={item.name} />
            </div>

            {/* Name */}
            <div className="flex md:block items-center justify-between">
              <span className="md:hidden font-bold text-gray-500">Name:</span>
              <p className="font-medium md:font-normal text-right md:text-left truncate max-w-[200px] md:max-w-none">{item.name}</p>
            </div>

            {/* Category */}
            <div className="flex md:block items-center justify-between">
              <span className="md:hidden font-bold text-gray-500">Category:</span>
              <p className="text-right md:text-left">{item.category}</p>
            </div>

            {/* Price */}
            <div className="flex md:block items-center justify-between text-black font-semibold md:font-normal">
              <span className="md:hidden font-bold text-gray-500">Price:</span>
              <p className="text-right md:text-left">{currency}{item.price}</p>
            </div>

            {/* Offer */}
            <div className="flex md:block items-center justify-between text-green-600 md:text-inherit">
              <span className="md:hidden font-bold text-gray-500">Offer:</span>
              <p className="text-right md:text-left">{item.offerPrice ? `${currency}${item.offerPrice}` : "-"}</p>
            </div>

            {/* Stock */}
            <div className="flex md:block items-center justify-between">
              <span className="md:hidden font-bold text-gray-500">Stock:</span>
              <p className="text-right md:text-center">{item.stock ?? 0}</p>
            </div>

            {/* Edit Action */}
            <div className="flex md:block items-center justify-between border-t md:border-t-0 pt-3 md:pt-0">
               <span className="md:hidden font-bold text-gray-500">Update:</span>
               <Link to={`/edit/${item._id}`} className="text-blue-500 hover:text-blue-700 font-medium md:text-center block md:w-full">
                Edit
              </Link>
            </div>

            {/* Remove Action */}
            <div className="flex md:block items-center justify-between">
               <span className="md:hidden font-bold text-gray-500">Delete:</span>
               <p
                  onClick={() => removeProduct(item._id)}
                  className="text-right md:text-center cursor-pointer text-lg text-red-500 hover:text-red-700 font-bold md:w-full"
                >
                  X
                </p>
            </div>
          </div>
        ))}
      </div>
    </>
  )
};

export default List;
