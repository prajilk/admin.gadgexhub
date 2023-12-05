"use client";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Tooltip,
  ChipProps,
  Button,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { Trash2, Eye, ChevronRight } from "lucide-react";
import { recentOrderColumns, recentOrders } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";
import { useCallback } from "react";

const statusColorMap: Record<string, ChipProps["color"]> = {
  delivered: "success",
  pending: "danger",
  ongoing: "warning",
};

type Order = (typeof recentOrders)[0];

const RecentOrders = () => {
  const renderCell = useCallback((order: Order, columnKey: React.Key) => {
    const cellValue = order[columnKey as keyof Order];

    switch (columnKey) {
      case "oid":
        return <h1>{order.oid}</h1>;
      case "user":
        return (
          <Link href="/dashboard/users" className="hover:text-primary">
            {order.user}
          </Link>
        );
      case "amount":
        return <h1>{formatCurrency(order.amount)}</h1>;
      case "date":
        return <h1>{order.date}</h1>;
      case "payment":
        return (
          <h1
            className={`${
              order.payment === "true" ? "text-success" : "text-danger"
            } ms-10`}
          >
            {order.payment}
          </h1>
        );
      case "status":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[order.status]}
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
        );
      case "update_status":
        return (
          <Select
            placeholder="Update status"
            className="max-w-xs"
            defaultSelectedKeys={[order.status]}
            classNames={{
              trigger:
                "bg-zinc-100 dark:bg-zinc-800 h-fit min-h-fit p-2 data-[hover=true]:bg-zinc-200 data-[hover=true]:dark:bg-zinc-700",
              value:
                "text-black text-xs dark:text-zinc-200 dark:group-data-[has-value=true]:text-zinc-200 group-data-[has-value=true]:text-black",
              popoverContent: "bg-white dark:bg-zinc-800",
            }}
            aria-label="Update status"
            size="sm"
          >
            {["pending", "ongoing", "delivered"].map((value) => (
              <SelectItem
                key={value}
                value={value}
                className="capitalize"
                classNames={{
                  title: "text-xs",
                }}
              >
                {value}
              </SelectItem>
            ))}
          </Select>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip
              content="View Details"
              className="bg-white dark:bg-zinc-700"
            >
              <span className="cursor-pointer text-lg text-default-400 active:opacity-50">
                <Eye />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete Order">
              <span className="cursor-pointer text-lg text-danger active:opacity-50">
                <Trash2 />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <div className="mx-3 my-10 rounded-2xl bg-white px-4 pt-4 shadow-md dark:bg-dark">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-medium text-black dark:text-white">
          Recent Orders
        </h1>
        <Button
          variant="flat"
          size="sm"
          className="bg-indigo-100 text-primary dark:bg-zinc-800 dark:text-white"
          endContent={<ChevronRight size={15} />}
        >
          View All
        </Button>
      </div>
      <Table
        aria-label="Recent Orders table"
        classNames={{
          wrapper: "px-0 shadow-none bg-white dark:bg-dark",
          th: "bg-zinc-100 text-dark dark:bg-zinc-800 dark:text-zinc-200",
        }}
      >
        <TableHeader columns={recentOrderColumns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={recentOrders}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default RecentOrders;
