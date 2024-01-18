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
    pid: "closj4d760001u5tgmqc112q3",
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

export { topSellingProducts, topSellingProductsColumns };
