import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { PlusCircle, LayoutDashboard, ClipboardList, Package, LifeBuoy, Users } from "lucide-react";

const Sidebar = () => {
  return (
    <div className="w-[18%] min-h-screen border-r-2">
      <div className="flex flex-col gap-4 pt-6 pl-[20%] text-[15px]">
        <NavLink
          className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l"
          to="/dashboard"
        >
          <LayoutDashboard className="w-5 h-5 text-gray-700" />
          <p className="hidden md:block">Dashboard</p>
        </NavLink>
        <NavLink
          className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l"
          to="/add"
        >
          <PlusCircle className="w-5 h-5 text-gray-700" />
          <p className="hidden md:block">Add Items</p>
        </NavLink>
        <NavLink
          className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l"
          to="/list"
        >
          <ClipboardList className="w-5 h-5 text-gray-700" />
          <p className="hidden md:block">List Items</p>
        </NavLink>
        <NavLink
          className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l"
          to="/orders"
        >
          <Package className="w-5 h-5 text-gray-700" />
          <p className="hidden md:block">Orders</p>
        </NavLink>
        <NavLink
          className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l"
          to="/support"
        >
          <LifeBuoy className="w-5 h-5 text-gray-700" />
          <p className="hidden md:block">Support</p>
        </NavLink>
        <NavLink
          className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l"
          to="/users"
        >
          <Users className="w-5 h-5 text-gray-700" />
          <p className="hidden md:block">Users</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
