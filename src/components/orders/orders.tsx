"use client";

import { useOrders } from "@/api-hooks/orders/get-orders";
import SummaryCard from "@/components/dashboard/summary/summary-card";
import { OrderProps } from "@/lib/types/types";
import { Boxes, CalendarClock } from "lucide-react";
import OrdersTable from "./orders-table";

const OrdersPage = () => {
  const { data } = useOrders();

  function findPendingOrders(orders?: OrderProps[]) {
    if (!orders) return 0;
    return orders.filter((order) => order.status === "pending").length;
  }

  function findOngoingOrders(orders?: OrderProps[]) {
    if (!orders) return 0;
    return orders.filter((order) => order.status === "ongoing").length;
  }

  function findTodaysOrders(orders?: OrderProps[]) {
    if (!orders) return 0;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return orders.filter((order) => {
      const inputDate = new Date(order.orderDate);
      inputDate.setHours(0, 0, 0, 0);
      return today.getTime() === inputDate.getTime();
    }).length;
  }

  return (
    <>
      <div className="mb-10 @container">
        <div className="grid grid-cols-1 gap-3 @md:grid-cols-2 @4xl:grid-cols-4">
          <SummaryCard
            bgcolor="bg-danger"
            color="text-danger"
            icon={CalendarClock}
            title="Orders Pending"
            value={findPendingOrders(data?.orders)}
          />
          <SummaryCard
            bgcolor="bg-indigo-500"
            color="text-indigo-500"
            icon={Boxes}
            title="Total Orders"
            value={data?.orders.length || 0}
            percentage={{ increased: true, value: 3 }}
          />
          <SummaryCard
            bgcolor="bg-success"
            color="text-success"
            icon={Boxes}
            title="Today's Orders"
            value={findTodaysOrders(data?.orders)}
          />
          <SummaryCard
            bgcolor="bg-[#23B7E5]"
            color="text-[#23B7E5]"
            icon={CalendarClock}
            title="Ongoing Orders"
            value={findOngoingOrders(data?.orders)}
          />
        </div>
      </div>
      <OrdersTable orders={data?.orders} />
    </>
  );
};

export default OrdersPage;
