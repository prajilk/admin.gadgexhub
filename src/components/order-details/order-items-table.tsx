"use client";

import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
} from "@nextui-org/react";
import { formatCurrency } from "@/lib/utils";
import { OrderItemProps } from "@/lib/types/types";

const columns = [
  { name: "PRODUCT DETAILS", uid: "product-details" },
  { name: "COLOR", uid: "color" },
  { name: "PRICE", uid: "price" },
  { name: "QUANTITY", uid: "quantity" },
  { name: "TOTAL", uid: "total" },
];

export default function OrderItemsTable({ data }: { data: OrderItemProps[] }) {
  const renderCell = React.useCallback(
    (order: OrderItemProps, columnKey: React.Key) => {
      const cellValue = order[columnKey as keyof OrderItemProps];

      switch (columnKey) {
        case "product-details":
          return (
            <User
              avatarProps={{
                size: "lg",
                radius: "none",
                showFallback: true,
                src: process.env.NEXT_PUBLIC_IMAGE_URL + order.Image,
              }}
              description={`Color: ${order.color}`}
              name={order.title}
            />
          );
        case "color":
          return order.color || "Null";
        case "price":
          return (
            <h1 className="font-Roboto">
              {formatCurrency(order.offerPrice / order.quantity)}
            </h1>
          );
        case "total":
          return (
            <h1 className="font-Roboto">{formatCurrency(order.offerPrice)}</h1>
          );
        default:
          return cellValue;
      }
    },
    [],
  );

  return (
    <Table
      aria-label="Product details"
      classNames={{
        wrapper: "px-0 shadow-none",
      }}
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            className={column.uid === "total" ? "text-right" : "text-left"}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={data}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell className="last:text-right">
                {renderCell(item, columnKey)}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
