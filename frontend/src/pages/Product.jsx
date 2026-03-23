import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import RelatedProducts from "../components/RelatedProducts";
import axios from "axios";
import { toast } from "react-toastify";
import { Star } from "lucide-react";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart, backendUrl, token, userProfile, toggleWishlist } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");
  const [reviews, setReviews] = useState([]);
  const [activeTab, setActiveTab] = useState("description");
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: "" });

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]);
        return null;
      }
    });
  };

  const fetchReviews = async () => {
    try {
       const response = await axios.get(backendUrl + "/api/review/product/" + productId);
       if (response.data.success) {
          setReviews(response.data.reviews);
       }
    } catch (error) {
       console.log(error);
    }
  }

  const submitReview = async (e) => {
    e.preventDefault();
    if (!token) {
      toast.error("Please login to submit a review");
      return;
    }
    try {
      const response = await axios.post(
        backendUrl + "/api/review/add",
        { productId, ...reviewForm },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        setReviewForm({ rating: 5, comment: "" });
        fetchReviews();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  useEffect(() => {
    fetchProductData();
    fetchReviews();
  }, [productId, products]);

  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      <div className="flex sm:gap-12 flex-col sm:flex-row">
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData.image.map((item, index) => (
              <img onClick={() => setImage(item)} src={item} key={index} className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer" alt="" />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img className="w-full h-auto" src={image} alt="" />
          </div>
        </div>
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`w-3.5 h-3.5 ${i < Math.floor(productData.ratings) ? "fill-orange-500 text-orange-500" : "text-gray-300"}`}
              />
            ))}
            <p className="pl-2">({productData.numReviews || 0})</p>
          </div>
          <div className="flex items-center gap-3 mt-5">
            <p className="text-3xl font-medium text-orange-600">
              {currency}
              {productData.offerPrice > 0 ? productData.offerPrice : productData.price}
            </p>
            {productData.offerPrice > 0 && (
              <>
                <p className="text-xl text-gray-400 line-through">
                  {currency}
                  {productData.price}
                </p>
                <p className="text-sm font-bold text-green-600 bg-green-50 px-2 py-1 rounded">
                  {Math.round(((productData.price - productData.offerPrice) / productData.price) * 100)}% OFF
                </p>
              </>
            )}
          </div>
          <p className="mt-5 text-gray-500 md:w-4/5">{productData.description}</p>
          
          <div className="mt-4">
             <p className="text-sm">Brand: <span className="font-medium">{productData.brand}</span></p>
             <p className="text-sm">Availability: <span className={productData.stock > 0 ? "text-green-600" : "text-red-600"}>{productData.stock > 0 ? "In Stock" : "Out of Stock"}</span></p>
          </div>

          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {productData.Sizes.map((item, index) => (
                <button onClick={() => setSize(item)} key={index} className={`border py-2 px-4 bg-gray-100 ${item === size ? "border-orange-500" : ""}`}>{item}</button>
              ))}
            </div>
          </div>
          
          <div className="flex gap-4">
            <button onClick={() => addToCart(productData._id, size)} className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700">ADD TO CART</button>
            <button 
              onClick={() => toggleWishlist(productData._id)} 
              className={`border px-8 py-3 text-sm flex items-center gap-2 ${userProfile?.wishlist?.includes(productData._id) ? "bg-red-50 border-red-200" : ""}`}
            >
              <span className={userProfile?.wishlist?.includes(productData._id) ? "text-red-500" : ""}>❤</span>
              {userProfile?.wishlist?.includes(productData._id) ? "WISHLISTED" : "WISHLIST"}
            </button>
          </div>

          <hr className="mt-8 smh:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Orginal Product.</p>
            <p>Cash on Delivery is availble on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>

      <div className="mt-20">
        <div className="flex">
          <button 
            onClick={() => setActiveTab("description")}
            className={`border px-5 py-3 text-sm font-bold ${activeTab === "description" ? "bg-gray-100" : ""}`}
          >
            Description
          </button>
          <button 
            onClick={() => setActiveTab("reviews")}
            className={`border px-5 py-3 text-sm font-bold ${activeTab === "reviews" ? "bg-gray-100" : ""}`}
          >
            Reviews ({reviews.length})
          </button>
        </div>
        
        {activeTab === "description" ? (
          <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
            <p>{productData.description}</p>
            <p>
              High-quality {productData.category} from {productData.brand}. Suitable for {productData.subCategory}.
            </p>
          </div>
        ) : (
          <div className="border px-6 py-6 text-sm">
            <div className="flex flex-col gap-6 mb-10">
              {reviews.length > 0 ? reviews.map((rev, index) => (
                <div key={index} className="border-b pb-4">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-bold">{rev.userId?.name}</p>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={i < rev.rating ? "text-orange-500" : "text-gray-300"}>★</span>
                      ))}
                    </div>
                    <p className="text-gray-400 text-xs ml-auto">{new Date(rev.date).toLocaleDateString()}</p>
                  </div>
                  <p className="text-gray-600">{rev.comment}</p>
                </div>
              )) : (
                <p className="text-gray-500 italic">No reviews yet. Be the first to review!</p>
              )}
            </div>

            {token && (
              <form onSubmit={submitReview} className="max-w-xl bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-medium mb-4">Write a Review</h3>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <label>Rating</label>
                    <div className="flex gap-2 text-2xl">
                      {[1, 2, 3, 4, 5].map((num) => (
                        <span
                          key={num}
                          onClick={() => setReviewForm({ ...reviewForm, rating: num })}
                          className={`cursor-pointer ${
                            num <= reviewForm.rating ? "text-orange-500" : "text-gray-300"
                          }`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label>Comment</label>
                    <textarea 
                      value={reviewForm.comment}
                      onChange={(e) => setReviewForm({...reviewForm, comment: e.target.value})}
                      className="border p-2 rounded h-24"
                      placeholder="Share your experience..."
                      required
                    ></textarea>
                  </div>
                  <button type="submit" className="bg-black text-white py-2 px-6 text-sm self-start">SUBMIT REVIEW</button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>

      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
