import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import axios from "axios";
import { toast } from "react-toastify";

const Profile = () => {
  const { token, userProfile, fetchUserProfile, backendUrl, setUserProfile } =
    useContext(ShopContext);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    address: {
      street: "",
      city: "",
      state: "",
      zip: "",
      country: "",
    },
    paymentPreferences: {
      method: "",
      details: "",
    },
  });

  useEffect(() => {
    if (userProfile) {
      setFormData({
        name: userProfile.name || "",
        phoneNumber: userProfile.phoneNumber || "",
        address: {
          street: userProfile.address?.street || "",
          city: userProfile.address?.city || "",
          state: userProfile.address?.state || "",
          zip: userProfile.address?.zip || "",
          country: userProfile.address?.country || "",
        },
        paymentPreferences: {
          method: userProfile.paymentPreferences?.method || "",
          details: userProfile.paymentPreferences?.details || "",
        },
      });
    }
  }, [userProfile]);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    if (name.includes("address.")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        address: { ...prev.address, [field]: value },
      }));
    } else if (name.includes("paymentPreferences.")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        paymentPreferences: { ...prev.paymentPreferences, [field]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const onSubmitHandler = async () => {
    // e.preventDefault(); // Removed because we are not using a form submit event
    try {
      const response = await axios.post(
        backendUrl + "/api/user/update-profile",
        formData,
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        setIsEditing(false);
        fetchUserProfile(token);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  if (!userProfile) {
    return <div className="text-center py-10">Loading profile...</div>;
  }

  return (
    <div className="border-t pt-10">
      <div className="text-2xl">
        <Title text1={"MY "} text2={"PROFILE"} />
      </div>

      <div className="mt-10 flex flex-col md:flex-row gap-10">
        <div className="flex-1">
          <div
            className="flex flex-col gap-4 max-w-lg"
          >
            <div className="flex flex-col gap-1">
              <label className="text-gray-600">Full Name</label>
              <input
                name="name"
                value={formData.name}
                onChange={onChangeHandler}
                readOnly={!isEditing}
                className={`border rounded px-3 py-2 ${
                  !isEditing ? "bg-gray-50 text-gray-400 cursor-not-allowed" : ""
                }`}
                type="text"
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-gray-600">Email (Read-only)</label>
              <input
                value={userProfile.email}
                readOnly
                className="border rounded px-3 py-2 bg-gray-50 text-gray-400 cursor-not-allowed"
                type="email"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-gray-600">Phone Number</label>
              <input
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={onChangeHandler}
                readOnly={!isEditing}
                className={`border rounded px-3 py-2 ${
                  !isEditing ? "bg-gray-50 text-gray-400 cursor-not-allowed" : ""
                }`}
                type="text"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-gray-600">Street</label>
              <input
                name="address.street"
                value={formData.address.street}
                onChange={onChangeHandler}
                readOnly={!isEditing}
                className={`border rounded px-3 py-2 ${
                  !isEditing ? "bg-gray-50 text-gray-400 cursor-not-allowed" : ""
                }`}
                type="text"
              />
            </div>

            <div className="flex flex-row gap-4">
              <div className="flex-1 flex flex-col gap-1">
                <label className="text-gray-600">City</label>
                <input
                  name="address.city"
                  value={formData.address.city}
                  onChange={onChangeHandler}
                  readOnly={!isEditing}
                  className={`border rounded px-3 py-2 ${
                    !isEditing
                      ? "bg-gray-50 text-gray-400 cursor-not-allowed"
                      : ""
                  }`}
                  type="text"
                />
              </div>
              <div className="flex-1 flex flex-col gap-1">
                <label className="text-gray-600">State</label>
                <input
                  name="address.state"
                  value={formData.address.state}
                  onChange={onChangeHandler}
                  readOnly={!isEditing}
                  className={`border rounded px-3 py-2 ${
                    !isEditing
                      ? "bg-gray-50 text-gray-400 cursor-not-allowed"
                      : ""
                  }`}
                  type="text"
                />
              </div>
            </div>

            <div className="flex flex-row gap-4">
              <div className="flex-1 flex flex-col gap-1">
                <label className="text-gray-600">Zip Code</label>
                <input
                  name="address.zip"
                  value={formData.address.zip}
                  onChange={onChangeHandler}
                  readOnly={!isEditing}
                  className={`border rounded px-3 py-2 ${
                    !isEditing
                      ? "bg-gray-50 text-gray-400 cursor-not-allowed"
                      : ""
                  }`}
                  type="text"
                />
              </div>
              <div className="flex-1 flex flex-col gap-1">
                <label className="text-gray-600">Country</label>
                <input
                  name="address.country"
                  value={formData.address.country}
                  onChange={onChangeHandler}
                  readOnly={!isEditing}
                  className={`border rounded px-3 py-2 ${
                    !isEditing
                      ? "bg-gray-50 text-gray-400 cursor-not-allowed"
                      : ""
                  }`}
                  type="text"
                />
              </div>
            </div>
            
            <div className="flex flex-col gap-1">
              <label className="text-gray-600 font-medium">Payment Preferences</label>
              <div className="flex flex-row gap-4">
                <div className="flex-1 flex flex-col gap-1">
                  <label className="text-xs text-gray-500">Method (e.g. Card, PayPal)</label>
                  <input
                    name="paymentPreferences.method"
                    value={formData.paymentPreferences.method}
                    onChange={onChangeHandler}
                    readOnly={!isEditing}
                    className={`border rounded px-3 py-2 ${
                      !isEditing
                        ? "bg-gray-50 text-gray-400 cursor-not-allowed"
                        : ""
                    }`}
                    type="text"
                    placeholder="Payment Method"
                  />
                </div>
                <div className="flex-1 flex flex-col gap-1">
                  <label className="text-xs text-gray-500">Details (e.g. Last 4 digits)</label>
                  <input
                    name="paymentPreferences.details"
                    value={formData.paymentPreferences.details}
                    onChange={onChangeHandler}
                    readOnly={!isEditing}
                    className={`border rounded px-3 py-2 ${
                      !isEditing
                        ? "bg-gray-50 text-gray-400 cursor-not-allowed"
                        : ""
                    }`}
                    type="text"
                    placeholder="Account Details"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-4 mt-4">
              {isEditing ? (
                <>
                  <button
                    type="button"
                    onClick={onSubmitHandler}
                    className="bg-black text-white px-8 py-2 text-sm active:bg-gray-700"
                  >
                    SAVE CHANGES
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="border px-8 py-2 text-sm active:bg-gray-100"
                  >
                    CANCEL
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="bg-black text-white px-8 py-2 text-sm active:bg-gray-700"
                >
                  EDIT PROFILE
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="flex-1">
          <h2 className="text-xl font-medium mb-4">Account Information</h2>
          <div className="border p-6 rounded-lg bg-gray-50">
            <p className="mb-2">
              <span className="font-semibold">Role:</span>{" "}
              <span className="capitalize">{userProfile.role}</span>
            </p>
            <p className="mb-2">
              <span className="font-semibold">Member Since:</span>{" "}
              {new Date(userProfile.createdAt || Date.now()).toLocaleDateString()}
            </p>
            <div className="mt-6">
              <h3 className="font-semibold mb-2">Order Summary</h3>
              <p className="text-gray-600 text-sm">
                View your complete order history in the "Orders" section.
              </p>
              <button 
                onClick={() => setFormData({ ...formData, name: "test-update" })} // Debug
                className="hidden"
              ></button> 
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
