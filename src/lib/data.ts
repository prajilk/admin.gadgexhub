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
  },
  {
    icon: Users,
    title: "Total Customers",
    url: "/",
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

const recentOrderColumns = [
  { name: "ORDER ID", uid: "oid" },
  { name: "USER", uid: "user" },
  { name: "AMOUNT", uid: "amount" },
  { name: "ORDERED DATE", uid: "date" },
  { name: "PAYMENT VERIFIED", uid: "payment" },
  { name: "STATUS", uid: "status" },
  { name: "UPDATE STATUS", uid: "update_status" },
  { name: "ACTIONS", uid: "actions" },
];

const recentOrders = [
  {
    id: 1,
    oid: "N2C6VP8PZSGDDT",
    user: "Tony Reichert",
    amount: 1499,
    date: "04-12-2023",
    payment: "true",
    status: "pending",
  },
  {
    id: 2,
    oid: "YTC6VP8PZSGDMR",
    user: "Zoey Lang",
    amount: 2099,
    date: "04-12-2023",
    payment: "false",
    status: "pending",
  },
  {
    id: 3,
    oid: "R2C6VP8PZSSDT",
    user: "Jane Fisher",
    amount: 199,
    date: "03-12-2023",
    payment: "true",
    status: "ongoing",
  },
  {
    id: 4,
    oid: "FR56VP8PZSGDDT",
    user: "William Howard",
    amount: 1199,
    date: "03-12-2023",
    payment: "true",
    status: "delivered",
  },
  {
    id: 5,
    oid: "VY66VP8PZSGDDT",
    user: "Kristen Copper",
    amount: 5500,
    date: "03-12-2023",
    payment: "true",
    status: "ongoing",
  },
];

const topSellingProductsColumns = [
  { name: "PRODUCT ID", uid: "pid" },
  { name: "PRODUCT", uid: "product" },
  { name: "BASE PRICE", uid: "base_p" },
  { name: "OFFER PRICE", uid: "offer_p" },
  { name: "STOCK", uid: "stock" },
  { name: "UNIT SOLD", uid: "sold" },
  { name: "TOTAL EARNINGS", uid: "earnings" },
  { name: "ACTIONS", uid: "actions" },
];

const topSellingProducts = [
  {
    id: 1,
    pid: "clnoqj7rg0001u55w3pjttd84",
    product: "OnePlus Buds Z2",
    image:
      "https://res.cloudinary.com/dndgaxb4k/image/upload/v1699615391/products/oneplus-buds-z2/Matte%20Black/a3e60f3ce4b-thumb.png",
    base_p: 5999,
    offer_p: 3999,
    stock: 10,
    sold: 13,
    earnings: 51987,
  },
  {
    id: 2,
    pid: "clovw532m0003u5dom60m4ize",
    product: "Zeb-PODS 1",
    image:
      "https://res.cloudinary.com/dndgaxb4k/image/upload/v1699818658/products/zeb-pods-1/Default/4740bd80f63-thumb.png",
    base_p: 4499,
    offer_p: 1499,
    stock: 14,
    sold: 10,
    earnings: 14990,
  },
  {
    id: 3,
    pid: "closja9m60003u5tggqhsvqmf",
    product: "WaterScience Kitchen Tap Extender",
    image:
      "https://res.cloudinary.com/dndgaxb4k/image/upload/v1699615662/products/waterscience-kitchen-tap-extender/Default/3ce4b4db297-thumb.jpg",
    base_p: 1295,
    offer_p: 795,
    stock: 4,
    sold: 7,
    earnings: 5565,
  },
  {
    id: 4,
    pid: "closjfrkj0005u5tg7k5mrx1w",
    product: "OnePlus Keyboard 81 Pro",
    image:
      "https://res.cloudinary.com/dndgaxb4k/image/upload/v1699615923/products/oneplus-keyboard-81-pro/Summer%20Breeze/7c8a38629fb-thumb.png",
    base_p: 17999,
    offer_p: 16999,
    stock: 0,
    sold: 4,
    earnings: 67996,
  },
  {
    id: 5,
    pid: "closjfrkj0005u5tg7k5mrx1w",
    product: "Zeb-Juke Bar 9520WS Pro Dolby 5.1",
    image:
      "https://res.cloudinary.com/dndgaxb4k/image/upload/v1699818294/products/zeb-juke-bar-9520ws-pro-dolby-5.1/Default/1128db7c4dd-thumb.png",
    base_p: 34999,
    offer_p: 14999,
    stock: 2,
    sold: 2,
    earnings: 29998,
  },
];

export {
  cardDetails,
  revenueData,
  topCustomersData,
  recentOrderColumns,
  recentOrders,
  topSellingProducts,
  topSellingProductsColumns,
  newCustomerRegisters,
};
