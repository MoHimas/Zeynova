import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import Productitem from "../components/Productitem";
import { ChevronRight } from "lucide-react";

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [brand, setBrand] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [sortType, setSortType] = useState("relevent");
  const [inStockOnly, setInStockOnly] = useState(false);

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setSubCategory((prev) => [...prev, e.target.value]);
    }
  };

  const toggleBrand = (e) => {
    if (brand.includes(e.target.value)) {
      setBrand((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setBrand((prev) => [...prev, e.target.value]);
    }
  };

  const applyFilter = () => {
    if (!products) return;
    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category)
      );
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }

    if (brand.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        brand.includes(item.brand)
      );
    }

    productsCopy = productsCopy.filter(
      (item) => item.price >= priceRange.min && item.price <= priceRange.max
    );
    
    if (inStockOnly) {
      productsCopy = productsCopy.filter((item) => item.stock > 0);
    }

    setFilterProducts(productsCopy);
  };

  const sortProduct = () => {
    let fpCopy = filterProducts.slice();

    switch (sortType) {
      case "low-high":
        setFilterProducts(fpCopy.sort((a, b) => a.price - b.price));
        break;
      case "high-low":
        setFilterProducts(fpCopy.sort((a, b) => b.price - a.price));
        break;
      default:
        applyFilter();
        break;
    }
  };

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, brand, priceRange, search, showSearch, products, inStockOnly]);

  useEffect(() => {
    sortProduct();
  }, [sortType]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* filter options */}
      <div className="min-w-60">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
        >
          FILTERS
          <ChevronRight
            className={`h-4 w-4 sm:hidden transition-transform ${showFilter ? "rotate-90" : ""}`}
          />
        </p>
        {/* category filter */}
        <div
          className={`border border-gray-300 pl-3 py-3 mt-6 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium ">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Men"}
                onChange={toggleCategory}
              />{" "}
              Men
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Women"}
                onChange={toggleCategory}
              />{" "}
              Women
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Kids"}
                onChange={toggleCategory}
              />{" "}
              Kids
            </p>
          </div>
        </div>
        {/* Brand filter */}
        <div
          className={`border border-gray-300 pl-3 py-3 mt-6 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium ">BRANDS</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            {products && [...new Set(products.map((item) => item.brand))].filter(Boolean).map((b, index) => (
              <p key={index} className="flex gap-2">
                <input
                  className="w-3"
                  type="checkbox"
                  value={b}
                  onChange={toggleBrand}
                />{" "}
                {b}
              </p>
            ))}
          </div>
        </div>
        {/* Availability filter */}
        <div
          className={`border border-gray-300 pl-3 py-3 mt-6 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium ">AVAILABILITY</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                checked={inStockOnly}
                onChange={() => setInStockOnly(!inStockOnly)}
              />{" "}
              In Stock Only
            </p>
          </div>
        </div>

        {/* Price filter */}
        <div
          className={`border border-gray-300 pl-3 py-3 mt-6 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium ">PRICE RANGE</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700 pr-3">
             <div className="flex justify-between text-xs">
                <span>${priceRange.min}</span>
                <span>${priceRange.max}</span>
             </div>
             <input 
                type="range" 
                min="0" 
                max="5000" 
                step="10"
                value={priceRange.max}
                onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
                className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black"
             />
          </div>
        </div>
        {/* sub-category filter */}
        <div
          className={`border border-gray-300 pl-3 py-3 my-5 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium ">TYPE</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Topwear"}
                onChange={toggleSubCategory}
              />{" "}
              Topwear
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"BottomWear"}
                onChange={toggleSubCategory}
              />{" "}
              Bottomwear
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Winterwear"}
                onChange={toggleSubCategory}
              />{" "}
              Winterwear
            </p>
          </div>
        </div>
      </div>
      {/* Right side */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={"ALL "} text2={"COLLECTIONS"} />
          {/* product sort */}
          <select
            onChange={(e) => setSortType(e.target.value)}
            className="border-2 border-gray-300 text-sm px-2"
          >
            <option value="relevent">Sort by: Relvent</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>
        {/* Map products */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filterProducts.map((item, index) => (
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
    </div>
  );
};

export default Collection;
