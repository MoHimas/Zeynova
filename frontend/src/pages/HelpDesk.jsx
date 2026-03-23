import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import axios from "axios";
import { toast } from "react-toastify";

const HelpDesk = () => {
  const { token, backendUrl } = useContext(ShopContext);
  const [inquiries, setInquiries] = useState([]);
  const [formData, setFormData] = useState({ subject: "", message: "" });
  const [loading, setLoading] = useState(false);

  const fetchMyInquiries = async () => {
    if (!token) return;
    try {
      const response = await axios.get(backendUrl + "/api/inquiry/my-inquiries", {
        headers: { token },
      });
      if (response.data.success) {
        setInquiries(response.data.inquiries);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        backendUrl + "/api/inquiry/submit",
        formData,
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        setFormData({ subject: "", message: "" });
        fetchMyInquiries();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyInquiries();
  }, [token]);

  if (!token) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500">Please login to access the Help Desk.</p>
      </div>
    );
  }

  return (
    <div className="border-t pt-10">
      <div className="text-2xl">
        <Title text1={"HELP"} text2={"DESK"} />
      </div>

      <div className="flex flex-col lg:flex-row gap-12 mt-10">
        {/* inquiry form */}
        <div className="flex-1">
          <h2 className="text-xl font-medium mb-4">Submit an Inquiry</h2>
          <form onSubmit={onSubmitHandler} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-gray-600">Subject</label>
              <input
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="border rounded px-3 py-2"
                type="text"
                placeholder="e.g., Order tracking, Return request"
                required
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-gray-600">Message</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="border rounded px-3 py-2 h-32"
                placeholder="Describe your issue in detail..."
                required
              ></textarea>
            </div>
            <button
              disabled={loading}
              className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700 disabled:bg-gray-400"
            >
              {loading ? "SUBMITTING..." : "SUBMIT INQUIRY"}
            </button>
          </form>
        </div>

        {/* inquiry list */}
        <div className="flex-1">
          <h2 className="text-xl font-medium mb-4">My Inquiries</h2>
          <div className="flex flex-col gap-4">
            {inquiries.length > 0 ? (
              inquiries.map((item, index) => (
                <div key={index} className="border p-4 rounded-lg bg-gray-50">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold">{item.subject}</h3>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        item.status === "Open"
                          ? "bg-blue-100 text-blue-700"
                          : item.status === "Resolved"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{item.message}</p>
                  {item.response && (
                    <div className="mt-3 pt-3 border-t">
                      <p className="text-xs font-bold text-gray-400 uppercase">Support Response:</p>
                      <p className="text-sm text-gray-800 italic">{item.response}</p>
                    </div>
                  )}
                  <p className="text-[10px] text-gray-400 mt-2">
                    Submitted on: {new Date(item.date).toLocaleString()}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 italic">You haven't submitted any inquiries yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpDesk;
