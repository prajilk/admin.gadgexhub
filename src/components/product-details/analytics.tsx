import { Image, Order, OrderItem, Product } from "@prisma/client";
import SummaryCard from "../dashboard/summary/summary-card";
import { Boxes, CalendarClock, PackageCheck, Wallet } from "lucide-react";
import { useProductOrders } from "@/api-hooks/products/get-product-orders";
import NewProductOrders from "./graph/new-product-orders";
import { productOrders } from "@/lib/data";
import VisitDetails from "./visit-details/visit-details";

const Analytics = ({ product }: { product: Product & { Image: Image[] } }) => {
  const { data, isLoading } = useProductOrders(product.id);

  return (
    <div className="mt-5 space-y-5 @container">
      <div className="grid grid-cols-1 gap-3 @sm:grid-cols-2 @lg:grid-cols-4">
        <SummaryCard
          bgcolor="bg-indigo-500"
          color="text-indigo-500"
          icon={Wallet}
          title="Total Earnings"
          // value={product.earnings}
          value={10299}
          isCurrency={true}
        />
        <SummaryCard
          bgcolor="bg-[#23B7E5]"
          color="text-[#23B7E5]"
          icon={PackageCheck}
          title="Total Units Sold"
          // value={product.purchases}
          value={21}
        />
        <SummaryCard
          bgcolor="bg-[#F5B849]"
          color="text-[#F5B849]"
          icon={Boxes}
          title="Available Stocks"
          value={product.stock}
        />
        <SummaryCard
          bgcolor="bg-danger"
          color="text-danger"
          icon={CalendarClock}
          title="Ongoing Orders"
          value={calculateOngoingOrders(data?.orders)}
          isLoading={isLoading}
        />
      </div>
      <VisitDetails />
      <NewProductOrders data={productOrders} />
    </div>
  );
};

export default Analytics;

function calculateOngoingOrders(orders?: (OrderItem & { Order: Order })[]) {
  if (!orders) return 0;
  return (
    orders.filter((order) => order.Order.status !== "delivered").length || 0
  );
}
