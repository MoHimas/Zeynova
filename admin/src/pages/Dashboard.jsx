import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Dashboard = ({ token, backendUrl, currency }) => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/dashboard/stats", {
        headers: { token },
      });
      if (response.data.success) {
        setStats(response.data.stats);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const downloadCSV = () => {
    if (!stats || !stats.recentOrders) return;

    const headers = ["Order ID", "Customer", "Date", "Amount", "Status", "Payment Method"].join(",");
    const rows = stats.recentOrders.map(order => {
      return [
        order._id,
        `"${order.address?.firstName} ${order.address?.lastName}"`,
        new Date(order.date).toLocaleDateString(),
        order.amount,
        order.status,
        order.paymentMethod
      ].join(",");
    });

    const csvContent = [headers, ...rows].join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `sales_report_${new Date().toLocaleDateString()}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    fetchStats();
  }, [token]);

  if (loading) return <p>Loading reports...</p>;

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-medium">Business Overview & Reports</h2>
        <button 
          onClick={downloadCSV}
          className="bg-black text-white px-4 py-2 text-sm rounded hover:bg-gray-800 transition-colors"
        >
          GENERATE SALES REPORT (CSV)
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <div className="bg-white p-6 rounded shadow-sm border-l-4 border-blue-500">
          <p className="text-gray-500 text-sm uppercase font-bold">Total Revenue</p>
          <p className="text-2xl font-bold mt-1">{currency}{stats?.totalRevenue?.toFixed(2)}</p>
        </div>
        <div className="bg-white p-6 rounded shadow-sm border-l-4 border-orange-500">
          <p className="text-gray-500 text-sm uppercase font-bold">Total Orders</p>
          <p className="text-2xl font-bold mt-1">{stats?.totalOrders}</p>
        </div>
        <div className="bg-white p-6 rounded shadow-sm border-l-4 border-green-500">
          <p className="text-gray-500 text-sm uppercase font-bold">Total Products</p>
          <p className="text-2xl font-bold mt-1">{stats?.totalProducts}</p>
        </div>
        <div className="bg-white p-6 rounded shadow-sm border-l-4 border-purple-500">
          <p className="text-gray-500 text-sm uppercase font-bold">Total Customers</p>
          <p className="text-2xl font-bold mt-1">{stats?.totalUsers}</p>
        </div>
      </div>

      {/* Revenue Trend Chart */}
      <div className="bg-white rounded shadow-sm p-6 mb-10">
        <h3 className="text-lg font-medium mb-6">Revenue Trend (Last 30 Days)</h3>
        <div className="h-[300px] w-full">
          {stats?.trendData?.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={stats.trendData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis 
                  dataKey="date" 
                  tick={{ fontSize: 10 }}
                  tickFormatter={(str) => {
                    const date = new Date(str);
                    return `${date.getMonth() + 1}/${date.getDate()}`;
                  }}
                />
                <YAxis tick={{ fontSize: 10 }} tickFormatter={(val) => `${currency}${val}`} />
                <Tooltip 
                  labelFormatter={(str) => new Date(str).toDateString()}
                  formatter={(value) => [`${currency}${value}`, 'Revenue']}
                />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#3b82f6" 
                  strokeWidth={2} 
                  dot={{ r: 4, fill: '#3b82f6' }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400 italic">
              No sales data available for the last 30 days to generate trends.
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded shadow-sm p-6">
        <h3 className="text-lg font-medium mb-4">Recent Orders</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b">
                <th className="py-2">Order ID</th>
                <th className="py-2">Customer</th>
                <th className="py-2">Amount</th>
                <th className="py-2">Status</th>
                <th className="py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {stats?.recentOrders?.map((order, index) => (
                <tr key={index} className="border-b">
                  <td className="py-3 text-xs font-mono">{order._id}</td>
                  <td className="py-3">{order.address?.firstName} {order.address?.lastName}</td>
                  <td className="py-3">{currency}{order.amount}</td>
                  <td className="py-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3 text-gray-400">{new Date(order.date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
