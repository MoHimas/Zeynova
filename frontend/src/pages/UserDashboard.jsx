import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import Productitem from "../components/Productitem";
import PersonalizedRecommendations from "../components/PersonalizedRecommendations";
import axios from "axios";
import { Link } from "react-router-dom";

const UserDashboard = () => {
  const { backendUrl, token, currency, products, userProfile } = useContext(ShopContext);
  const [recentOrders, setRecentOrders] = useState([]);
  const [wishlistPreview, setWishlistPreview] = useState([]);
  const [promotions, setPromotions] = useState([]);

  const loadDashboardData = async () => {
    try {
      if (!token) return;

      // Fetch Orders
      const orderResponse = await axios.post(
        backendUrl + "/api/order/userorders",
        {},
        { headers: { token } }
      );
      if (orderResponse.data.success) {
        let allItems = [];
        orderResponse.data.orders.slice(0, 3).forEach(order => {
          order.items.forEach(item => {
            allItems.push({ ...item, status: order.status, date: order.date });
          });
        });
        setRecentOrders(allItems.slice(0, 4));
      }

      // Wishlist Preview
      if (userProfile && userProfile.wishlist && products.length > 0) {
        const items = products.filter(p => userProfile.wishlist.includes(p._id));
        setWishlistPreview(items.slice(0, 4));
      }

      // Promotions
      if (products.length > 0) {
        const offerProducts = products.filter(p => p.offerPrice > 0);
        setPromotions(offerProducts.slice(0, 4));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, [token, userProfile, products]);

  if (!token) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500">Please login to view your Dashboard.</p>
      </div>
    );
  }

  return (
    <div className="border-t pt-10">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-10">
        <div className="text-3xl">
          <Title text1={"WELCOME,"} text2={userProfile?.name?.toUpperCase()} />
          <p className="text-sm text-gray-500 mt-2 italic">Your personalized shopping overview</p>
        </div>
        <Link to="/profile" className="bg-black text-white px-6 py-2 text-sm mt-4 sm:mt-0">
          EDIT PROFILE
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Recent Orders Section */}
        <div className="bg-gray-50 p-4 sm:p-6 rounded-lg border">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-medium">Recent Orders</h2>
            <Link to="/orders" className="text-sm text-blue-600 hover:underline">View All</Link>
          </div>
          {recentOrders.length > 0 ? (
            <div className="flex flex-col gap-4">
              {recentOrders.map((item, index) => (
                <div key={index} className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 bg-white p-3 rounded border">
                  <div className="flex items-center gap-3 sm:gap-4 flex-1 overflow-hidden">
                    <img src={item.image[0]} className="w-12 h-12 object-cover flex-shrink-0" alt="" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{item.name}</p>
                      <p className="text-xs text-gray-500">{new Date(item.date).toDateString()}</p>
                    </div>
                  </div>
                  <div className="flex justify-between sm:block mt-2 sm:mt-0 text-left sm:text-right border-t sm:border-0 pt-2 sm:pt-0">
                    <p className="text-sm font-semibold">{currency}{item.price}</p>
                    <p className="text-[10px] text-green-600 font-bold uppercase">{item.status}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic text-sm py-4">No recent orders found.</p>
          )}
        </div>

        {/* Wishlist Preview */}
        <div className="bg-gray-50 p-6 rounded-lg border">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-medium">My Wishlist</h2>
            <Link to="/wishlist" className="text-sm text-blue-600 hover:underline">View All</Link>
          </div>
          {wishlistPreview.length > 0 ? (
            <div className="grid grid-cols-2 gap-4">
              {wishlistPreview.map((item, index) => (
                <div key={index} className="bg-white p-2 rounded border flex items-center gap-3">
                   <img src={item.image[0]} className="w-10 h-10 object-cover" alt="" />
                   <p className="text-xs truncate">{item.name}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic text-sm py-4">Your wishlist is empty.</p>
          )}
        </div>
      </div>

      {/* Promotions Section */}
      <div className="mt-16">
        <div className="text-2xl mb-6">
          <Title text1={"ACTIVE "} text2={"PROMOTIONS"} />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {promotions.map((item, index) => (
            <Productitem
              key={index}
              id={item._id}
              name={item.name}
              price={item.price}
              image={item.image}
              offerPrice={item.offerPrice}
            />
          ))}
        </div>
      </div>

      {/* Recommendations Section */}
      <PersonalizedRecommendations />
    </div>
  );
};

export default UserDashboard;
