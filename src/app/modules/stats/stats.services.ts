import Order from "../order/order.model";
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
  const result: { date: string; orderCount: number }[] = [];
  for (let i = 0; i < 30; i++) {
    const date = new Date(past30Days);
    date.setDate(date.getDate() + i);
    const dateString = date.toISOString().split("T")[0]; // Format YYYY-MM-DD

    result.push({
      date: dateString,
      orderCount: 0, // Default order count
    });
  }

  // Fill in actual counts from aggregation
  orderCounts.forEach(({ date, orderCount }) => {
    const index = result.findIndex((item) => item.date === date);
    if (index !== -1) {
      result[index].orderCount = orderCount;
    }
  });

  return result;
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
