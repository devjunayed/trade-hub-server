import Order from "../order/order.model";
import Product from "../product/product.model";
import { UiConfig } from "../uiconfig/uiconfig.model";
import User from "../user/user.model";

const orderStatsService = async () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Start of today

  const past30Days = new Date();
  past30Days.setDate(today.getDate() - 30); // 30 days ago

  const orderCounts = await Order.aggregate([
    {
      $match: {
        createdAt: { $gte: past30Days, $lt: today },
      },
    },
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
        orderCount: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } }, // Sort by date
    { $project: { _id: 0, date: "$_id", orderCount: 1 } },
  ]);

  // Ensure all 30 days exist in the data
  const data: { date: string; orderCount: number }[] = [];
  for (let i = 0; i < 30; i++) {
    const date = new Date(past30Days);
    date.setDate(date.getDate() + i);
    const dateString = date.toISOString().split("T")[0]; // Format YYYY-MM-DD

    data.push({
      date: dateString,
      orderCount: 0, // Default order count
    });
  }

  // Fill in actual counts from aggregation
  orderCounts.forEach(({ date, orderCount }) => {
    const index = data.findIndex((item) => item.date === date);
    if (index !== -1) {
      data[index].orderCount = orderCount;
    }
  });

  const totalOrders = await Order.countDocuments();
  const totalRevenue = await Order.aggregate([
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: "$totalPrice" },
      },
    },
    {
      $project: { _id: 0, totalRevenue: 1 },
    },
  ]);

  const totalUsers = await User.countDocuments();
  const totalProducts = await Product.countDocuments();
  const totalVisitors = await UiConfig.find().select("views");

  return {
    data,
    totalOrders,
    totalProducts,
    totalUsers,
    totalRevenue: totalRevenue[0].totalRevenue,
    totalVisitors: totalVisitors[0].views,
  };
};

const usersStatsService = async () => {
  const now = new Date();
  const firstDay = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 1);

  const users = await User.find({
    createdAt: { $gte: firstDay, $lt: lastDay },
  });

  return { totalUsers: users.length };
};

export const StatsServices = {
  orderStatsService,
  usersStatsService,
};
