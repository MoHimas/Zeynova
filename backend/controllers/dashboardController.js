import productModel from "../models/productModel.js";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

const getDashboardStats = async (req, res) => {
  try {
    const totalProducts = await productModel.countDocuments();
    const totalUsers = await userModel.countDocuments();
    const allOrders = await orderModel.find({});
    
    const totalOrders = allOrders.length;
    const totalRevenue = allOrders.reduce((acc, order) => acc + (order.amount || 0), 0);
    
    // Monthly/Daily Trends
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const recentOrdersForTrends = await orderModel.find({
      date: { $gte: thirtyDaysAgo.getTime() }
    });

    const salesTrend = recentOrdersForTrends.reduce((acc, order) => {
      const date = new Date(order.date).toLocaleDateString();
      acc[date] = (acc[date] || 0) + order.amount;
      return acc;
    }, {});

    // Format for charts: [{date: 'MM/DD/YYYY', revenue: 120}, ...]
    const trendData = Object.keys(salesTrend).map(date => ({
      date,
      revenue: salesTrend[date]
    })).sort((a, b) => new Date(a.date) - new Date(b.date));

    const recentOrders = await orderModel.find({}).sort({ date: -1 }).limit(5);

    res.json({
      success: true,
      stats: {
        totalProducts,
        totalUsers,
        totalOrders,
        totalRevenue,
        recentOrders,
        trendData
      }
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { getDashboardStats };
