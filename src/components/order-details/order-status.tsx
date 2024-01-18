"use client";

import { Button, Card, CardBody, Chip } from "@nextui-org/react";
import {
  Box,
  Gift,
  LucideIcon,
  PackageOpen,
  ShieldAlert,
  ShieldCheck,
  Truck,
} from "lucide-react";
import UpdateOrderStatus from "../dialog/update-order-status";
import { useState } from "react";
import UndoOrderStatus from "../dialog/undo-order-status";

type OrderStatusProps = {
  oid: string;
  status: string;
  payment_verified: boolean;
  orderDate: string;
  packedDate: string | null;
  deliveredDate: string | null;
};

const OrderStatus = ({
  oid,
  status,
  payment_verified,
  orderDate,
  packedDate,
  deliveredDate,
}: OrderStatusProps) => {
  const [currStatus, setCurrStatus] = useState(status);

  return (
    <Card className="mt-5 rounded-sm shadow-sm">
      <CardBody className="p-0">
        <div className="flex items-center justify-between p-3">
          <h1>Order Status</h1>
          <div className="space-x-1">
            <UndoOrderStatus
              oid={oid}
              status={currStatus}
              setStatus={setCurrStatus}
            />
            <UpdateOrderStatus
              oid={oid}
              status={currStatus}
              setStatus={setCurrStatus}
            />
          </div>
        </div>
        <hr />
        <div className="p-3">
          <ul className="space-y-4">
            <StatusList
              icon={Box}
              isActive={
                currStatus === "pending" ||
                currStatus === "ongoing" ||
                currStatus === "delivered"
              }
            >
              <div className="text-sm font-semibold">
                Order Placed{" "}
                <span className="font-normal text-zinc-400">- {orderDate}</span>{" "}
                {payment_verified ? (
                  <Chip
                    size="sm"
                    color="success"
                    className="text-white"
                    startContent={<ShieldCheck size={15} />}
                  >
                    Payment Verified
                  </Chip>
                ) : (
                  <Chip
                    size="sm"
                    color="danger"
                    className="text-white"
                    startContent={<ShieldAlert size={15} />}
                  >
                    Payment Not Verified
                  </Chip>
                )}
              </div>
            </StatusList>
            <StatusList
              icon={Gift}
              isActive={currStatus === "ongoing" || currStatus === "delivered"}
            >
              <p className="text-sm font-semibold">
                Packed{" "}
                <span className="font-normal text-zinc-400">
                  {packedDate && `- ${packedDate}`}
                </span>
              </p>
            </StatusList>
            <StatusList
              icon={Truck}
              isActive={currStatus === "ongoing" || currStatus === "delivered"}
            >
              <p className="text-sm font-semibold">Shipping</p>
            </StatusList>
            <StatusList
              icon={PackageOpen}
              isActive={currStatus === "delivered"}
            >
              <p className="text-sm font-semibold">
                Delivered{" "}
                <span className="font-normal text-zinc-400">
                  {deliveredDate && `- ${deliveredDate}`}
                </span>
              </p>
            </StatusList>
          </ul>
        </div>
      </CardBody>
    </Card>
  );
};

export default OrderStatus;

function StatusList(data: {
  icon: LucideIcon;
  children: React.ReactNode;
  isActive: boolean;
}) {
  return (
    <li className="flex items-center gap-3">
      <div
        className={`relative z-10 rounded-full p-2 ${
          data.icon === PackageOpen ? "after:hidden" : ""
        } after:absolute after:left-[50%] after:top-[100%] after:h-full after:-translate-x-[50%] after:border after:border-dashed
          ${
            data.isActive
              ? "bg-[#46D483] after:border-[#46D483]"
              : "bg-zinc-200 after:border-zinc-200 dark:bg-zinc-700 dark:after:border-zinc-700"
          }
        `}
      >
        <data.icon
          className={data.isActive ? "text-white" : "text-[#46D483]"}
          size={20}
        />
      </div>
      {data.children}
    </li>
  );
}
