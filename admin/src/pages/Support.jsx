import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Support = ({ token, backendUrl }) => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [responseMsg, setResponseMsg] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  const fetchAllInquiries = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/inquiry/all", {
        headers: { token },
      });
      if (response.data.success) {
        setInquiries(response.data.inquiries);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const submitResponse = async (id) => {
    if (!responseMsg) return;
    try {
      const response = await axios.post(
        backendUrl + "/api/inquiry/respond",
        { inquiryId: id, response: responseMsg, status: "Resolved" },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success("Response sent");
        setResponseMsg("");
        setSelectedId(null);
        fetchAllInquiries();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchAllInquiries();
  }, [token]);

  return (
    <div className="w-full">
      <h2 className="text-xl font-medium mb-6">Customer Support & Inquiries</h2>
      {loading ? (
        <p>Loading inquiries...</p>
      ) : (
        <div className="flex flex-col gap-4">
          {inquiries.length > 0 ? (
            inquiries.map((item, index) => (
              <div key={index} className="border p-4 rounded bg-white shadow-sm">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold">{item.userId?.name}</span>
                    <span className="text-xs text-gray-400">({item.userId?.email})</span>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${item.status === 'Open' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'}`}>
                    {item.status}
                  </span>
                </div>
                <p className="text-sm font-semibold text-gray-700 underline mb-1">{item.subject}</p>
                <p className="text-sm text-gray-600 mb-4">{item.message}</p>
                
                {item.response ? (
                  <div className="bg-gray-50 p-3 rounded text-sm italic border-l-4 border-gray-300">
                    <span className="font-bold not-italic">Admin:</span> {item.response}
                  </div>
                ) : (
                  <div>
                    {selectedId === item._id ? (
                      <div className="flex flex-col gap-2 mt-2">
                        <textarea
                          value={responseMsg}
                          onChange={(e) => setResponseMsg(e.target.value)}
                          className="border p-2 rounded text-sm h-20"
                          placeholder="Type your response here..."
                        />
                        <div className="flex gap-2">
                          <button 
                            onClick={() => submitResponse(item._id)}
                            className="bg-black text-white px-4 py-1 text-xs"
                          >
                            SEND RESPONSE
                          </button>
                          <button 
                            onClick={() => setSelectedId(null)}
                            className="border px-4 py-1 text-xs"
                          >
                            CANCEL
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button 
                        onClick={() => setSelectedId(item._id)}
                        className="bg-slate-700 text-white px-4 py-1.5 text-xs rounded"
                      >
                        REPLY
                      </button>
                    )}
                  </div>
                )}
                <p className="text-[10px] text-gray-400 mt-4">Date: {new Date(item.date).toLocaleString()}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 italic">No inquiries found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Support;
