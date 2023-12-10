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

export { recentOrderColumns, recentOrders };
