import React from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Route, Routes } from "react-router-dom";
import Add from "./pages/Add";
import List from "./pages/List";
import Edit from "./pages/Edit";
import Orders from "./pages/Orders";
import Support from "./pages/Support";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users"; // Added import for Users
import { useState } from "react";
import Login from "./components/Login";
import { ToastContainer, toast } from "react-toastify";
import { useEffect } from "react";

export const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const currency = "$";

const App = () => {
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : ""
  );
  const [role, setRole] = useState(
    localStorage.getItem("role") ? localStorage.getItem("role") : ""
  );

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  useEffect(() => {
    localStorage.setItem("role", role);
  }, [role]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <ToastContainer />
      {token === "" ? (
        <Login setToken={setToken} setRole={setRole} />
      ) : (
        <>
          <Navbar setToken={setToken} />
          <hr />
          <div className="flex w-full">
            <Sidebar role={role} />
            <div className="flex-1 mx-auto px-4 sm:px-8 ml-[max(2vw,10px)] sm:ml-[max(5vw,25px)] my-8 text-gray-600 text-base overflow-x-hidden">
              <Routes>
                {/* Routes accessible to both Admin and Support */}
                <Route path="/orders" element={<Orders token={token} />} />
                <Route path="/users" element={<Users token={token} backendUrl={backendUrl} />} />
                <Route path="/support" element={<Support token={token} backendUrl={backendUrl} />} />
                
                {/* Admin-only routes */}
                {role !== "support" && (
                  <>
                    <Route path="/add" element={<Add token={token} />} />
                    <Route path="/list" element={<List token={token} />} />
                    <Route path="/edit/:id" element={<Edit token={token} />} />
                    <Route path="/dashboard" element={<Dashboard token={token} backendUrl={backendUrl} currency={currency} />} />
                  </>
                )}
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
