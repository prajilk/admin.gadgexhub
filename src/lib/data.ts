import { CalendarClock, Package, Users, Wallet } from "lucide-react";

const cardDetails = [
  {
    icon: CalendarClock,
    title: "Orders Pending",
    url: "/",
    color: "text-danger",
    bgcolor: "bg-danger",
    value: 120,
  },
  {
    icon: Wallet,
    title: "Total Revenue",
    url: "/",
    color: "text-indigo-500",
    bgcolor: "bg-indigo-500",
    value: 1399,
    percentage: { increased: true, value: 43 },
    isCurrency: true,
  },
  {
    icon: Users,
    title: "Total Customers",
    url: "/dashboard/customers",
    color: "text-[#23B7E5]",
    bgcolor: "bg-[#23B7E5]",
    value: 120333,
    percentage: { increased: true, value: 43 },
  },
  {
    icon: Package,
    title: "Total Sales",
    url: "/",
    color: "text-[#F5B849]",
    bgcolor: "bg-[#F5B849]",
    value: 120,
    percentage: { increased: true, value: 43 },
  },
];

const topCustomersData = [
  {
    image: "https://i.pravatar.cc/150?u=a04258114e29026",
    amountSpent: 22390,
    name: "Maia Hancock",
    purchases: 23,
    lastPurchase: "5 days ago",
  },
  {
    image: "https://i.pravatar.cc/150?u=a04258114e29026702d",
    amountSpent: 12900,
    name: "Jane Doe",
    purchases: 16,
    lastPurchase: "1 days ago",
  },
  {
    image: "https://i.pravatar.cc/150?u=a04258114e29026702",
    amountSpent: 10900,
    name: "Regan Keith",
    purchases: 13,
    lastPurchase: "2 days ago",
  },
  {
    image: "https://i.pravatar.cc/150?u=a04258114e290",
    amountSpent: 8990,
    name: "Skyler Powell",
    purchases: 10,
    lastPurchase: "7 days ago",
  },
  {
    image: "https://i.pravatar.cc/150?u=a04258114e2902",
    amountSpent: 8930,
    name: "Andrew Sims",
    purchases: 8,
    lastPurchase: "6 days ago",
  },
  {
    image: "https://i.pravatar.cc/150?u=a04258114e290267",
    amountSpent: 7790,
    name: "Braxton Mcdonald",
    purchases: 8,
    lastPurchase: "4 days ago",
  },
  {
    image: "https://i.pravatar.cc/150?u=a04258114e2902670",
    amountSpent: 5690,
    name: "Jasmin Morgan",
    purchases: 5,
    lastPurchase: "3 days ago",
  },
];

const revenueData = {
  weeklyData: [
    {
      name: "Sat",
      total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: "Sun",
      total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: "Mon",
      total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: "Tue",
      total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: "Wed",
      total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: "Thu",
      total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: "Fri",
      total: Math.floor(Math.random() * 5000) + 1000,
    },
  ],
  monthlyData: [
    {
      name: "1-5",
      total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: "6-10",
      total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: "11-15",
      total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: "16-20",
      total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: "21-25",
      total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: "26-30",
      total: Math.floor(Math.random() * 5000) + 1000,
    },
  ],
  yearlyData: [
    {
      name: "Jan",
      total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: "Feb",
      total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: "Mar",
      total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: "Apr",
      total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: "May",
      total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: "Jun",
      total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: "Jul",
      total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: "Aug",
      total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: "Sep",
      total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: "Oct",
      total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: "Nov",
      total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: "Dec",
      total: Math.floor(Math.random() * 5000) + 1000,
    },
  ],
};

const newCustomerRegisters = {
  weeklyData: [
    {
      name: "Sat",
      uv: 100,
      amt: 2400,
    },
    {
      name: "Sun",
      uv: 200,
      amt: 2210,
    },
    {
      name: "Mon",
      uv: 150,
      amt: 2290,
    },
    {
      name: "Tue",
      uv: 300,
      amt: 2000,
    },
    {
      name: "Wed",
      uv: 200,
      amt: 2181,
    },
    {
      name: "Thu",
      uv: 400,
      amt: 2500,
    },
    {
      name: "Fri",
      uv: 219,
      amt: 2100,
    },
  ],
  monthlyData: [
    {
      name: "1-5",
      uv: 1000,
      amt: 2400,
    },
    {
      name: "6-10",
      uv: 2000,
      amt: 2210,
    },
    {
      name: "11-15",
      uv: 1500,
      amt: 2290,
    },
    {
      name: "16-20",
      uv: 3000,
      amt: 2000,
    },
    {
      name: "21-25",
      uv: 2000,
      amt: 2181,
    },
    {
      name: "26-30",
      uv: 4000,
      amt: 2500,
    },
  ],
  yearlyData: [
    {
      name: "Jan",
      uv: 10000,
      amt: 2400,
    },
    {
      name: "Feb",
      uv: 20000,
      amt: 2210,
    },
    {
      name: "Mar",
      uv: 15000,
      amt: 2290,
    },
    {
      name: "Apr",
      uv: 30000,
      amt: 2000,
    },
    {
      name: "May",
      uv: 20000,
      amt: 2181,
    },
    {
      name: "Jun",
      uv: 40000,
      amt: 2500,
    },
    {
      name: "July",
      uv: 21900,
      amt: 2100,
    },
    {
      name: "Aug",
      uv: 30900,
      amt: 2100,
    },
    {
      name: "Sep",
      uv: 10000,
      amt: 2100,
    },
    {
      name: "Oct",
      uv: 15500,
      amt: 2100,
    },
    {
      name: "Nov",
      uv: 20000,
      amt: 2100,
    },
    {
      name: "Dec",
      uv: 30000,
      amt: 2100,
    },
  ],
};

const productOrders = {
  weeklyData: [
    {
      name: "Sat",
      uv: 10,
      amt: 2400,
    },
    {
      name: "Sun",
      uv: 20,
      amt: 2210,
    },
    {
      name: "Mon",
      uv: 15,
      amt: 2290,
    },
    {
      name: "Tue",
      uv: 30,
      amt: 2000,
    },
    {
      name: "Wed",
      uv: 20,
      amt: 2181,
    },
    {
      name: "Thu",
      uv: 40,
      amt: 2500,
    },
    {
      name: "Fri",
      uv: 21,
      amt: 2100,
    },
  ],
  monthlyData: [
    {
      name: "1-5",
      uv: 100,
      amt: 2400,
    },
    {
      name: "6-10",
      uv: 200,
      amt: 2210,
    },
    {
      name: "11-15",
      uv: 150,
      amt: 2290,
    },
    {
      name: "16-20",
      uv: 300,
      amt: 2000,
    },
    {
      name: "21-25",
      uv: 200,
      amt: 2181,
    },
    {
      name: "26-30",
      uv: 400,
      amt: 2500,
    },
  ],
  yearlyData: [
    {
      name: "Jan",
      uv: 1000,
      amt: 2400,
    },
    {
      name: "Feb",
      uv: 2000,
      amt: 2210,
    },
    {
      name: "Mar",
      uv: 1500,
      amt: 2290,
    },
    {
      name: "Apr",
      uv: 3000,
      amt: 2000,
    },
    {
      name: "May",
      uv: 2000,
      amt: 2181,
    },
    {
      name: "Jun",
      uv: 4000,
      amt: 2500,
    },
    {
      name: "July",
      uv: 2190,
      amt: 2100,
    },
    {
      name: "Aug",
      uv: 3000,
      amt: 2100,
    },
    {
      name: "Sep",
      uv: 1000,
      amt: 2100,
    },
    {
      name: "Oct",
      uv: 1550,
      amt: 2100,
    },
    {
      name: "Nov",
      uv: 2000,
      amt: 2100,
    },
    {
      name: "Dec",
      uv: 3000,
      amt: 2100,
    },
  ],
};

export {
  cardDetails,
  revenueData,
  topCustomersData,
  newCustomerRegisters,
  productOrders,
};
