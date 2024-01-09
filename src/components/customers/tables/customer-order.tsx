"use client";

import { useCustomerOrders } from "@/api-hooks/customers/get-order";
import { useUpdateOrderStatus } from "@/api-hooks/orders/update-status";
import { OrderProps } from "@/lib/types/types";
import { capitalize, formatCurrency, formateDate } from "@/lib/utils";
import {
  Button,
  Chip,
  ChipProps,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Pagination,
  Select,
  SelectItem,
  Selection,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { ChevronDown, Eye } from "lucide-react";
import Link from "next/link";
import { ChangeEvent, useCallback, useMemo, useState } from "react";
import { motion as m } from "framer-motion";
import CustomerProfile from "../customer-profile";

const statusColorMap: Record<string, ChipProps["color"]> = {
  delivered: "success",
  pending: "danger",
  ongoing: "warning",
};

const columns = [
  { name: "ORDER ID", uid: "oid" },
  { name: "AMOUNT", uid: "amount" },
  { name: "ADDRESS ID", uid: "addressId" },
  { name: "ORDERED DATE", uid: "date" },
  { name: "PAYMENT VERIFIED", uid: "payment" },
  { name: "STATUS", uid: "status" },
  { name: "UPDATE STATUS", uid: "update_status" },
  { name: "ACTIONS", uid: "actions" },
];

const INITIAL_VISIBLE_COLUMNS = [
  "oid",
  "amount",
  "date",
  "payment",
  "status",
  "update_status",
  "actions",
];

export default function CustomerOrder({ customerId }: { customerId: string }) {
  const { data: orders } = useCustomerOrders(customerId);

  const mutation = useUpdateOrderStatus();

  const [visibleColumns, setVisibleColumns] = useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS),
  );
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(1);

  const headerColumns = useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid),
    );
  }, [visibleColumns]);

  const renderCell = useCallback((order: OrderProps, columnKey: React.Key) => {
    const cellValue = order[columnKey as keyof OrderProps];

    switch (columnKey) {
      case "oid":
        return <h1>{order.oid}</h1>;
      case "amount":
        return <h1 className="font-Roboto">{formatCurrency(order.amount)}</h1>;
      case "addressId":
        return <h1>{order.addressId}</h1>;
      case "date":
        return <h1>{order.date}</h1>;
      case "payment":
        return (
          <h1
            className={`${
              order.payment ? "text-success" : "text-danger"
            } ms-10`}
          >
            {order.payment ? "true" : "false"}
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
            onChange={(e) =>
              mutation.mutate({ id: order.oid, status: e.target.value })
            }
            isDisabled={mutation.isPending}
            classNames={{
              trigger: "h-fit min-h-fit p-2",
              value: "text-xs",
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
          <div className="flex items-center justify-center">
            {/* View order */}
            <Button
              isIconOnly
              size="sm"
              variant="light"
              as={Link}
              radius="full"
              href={`/dashboard/customers/${order.oid}`}
            >
              <Eye className="text-zinc-500" />
            </Button>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const onRowsPerPageChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    [],
  );

  const filteredItems = useMemo(() => {
    let filteredOrders = [...orders?.orders!];
    return filteredOrders;
  }, []);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const onNextPage = useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const bottomContent = useMemo(() => {
    return (
      <div className="flex items-center justify-between px-2 py-2">
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden w-[30%] justify-end gap-2 sm:flex">
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
          >
            Previous
          </Button>
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onNextPage}
          >
            Next
          </Button>
        </div>
      </div>
    );
  }, [page, pages, filteredItems.length, onNextPage, onPreviousPage]);

  const topContent = useMemo(() => {
    return (
      <div className="mt-5 flex flex-col gap-4">
        <div className="ms-auto flex items-center gap-3">
          <Dropdown>
            <DropdownTrigger className="z-0 hidden sm:flex">
              <Button
                endContent={<ChevronDown size={20} />}
                size="sm"
                variant="flat"
              >
                Columns
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              aria-label="Table Columns"
              closeOnSelect={false}
              selectedKeys={visibleColumns}
              selectionMode="multiple"
              onSelectionChange={setVisibleColumns}
            >
              {columns.map((column) => (
                <DropdownItem key={column.uid} className="capitalize">
                  {capitalize(column.name)}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-small text-default-400">
            Total {orders?.orders?.length} orders
          </span>
          <label className="flex items-center text-small text-default-400">
            Rows per page:
            <select
              className="bg-transparent text-small text-default-400 outline-none"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [visibleColumns]);

  return (
    <>
      {orders && (
        <CustomerProfile
          customerData={{
            createdAt: orders.customer.createdAt,
            email: orders.customer.email,
            id: orders.customer.id,
            lastLogin: orders.customer.lastLogin,
            name: orders.customer.name,
            phone: orders.customer.phone,
            updatedAt: orders.customer.updatedAt,
            gender: orders.customer.gender,
            image: orders.customer.image,
          }}
        />
      )}
      <h1 className="mt-7 text-xl font-medium text-zinc-400">Orders placed</h1>
      <Table
        aria-label="Guest users table"
        classNames={{ wrapper: "shadow-md" }}
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        topContent={topContent}
        topContentPlacement="outside"
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          emptyContent={"No orders placed"}
          items={orders?.orders || []}
        >
          {(item) => (
            <TableRow key={item.oid}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      {mutation.isPending && (
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed left-0 top-0 z-50 flex min-h-screen w-full items-center justify-center bg-black/30"
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-white dark:bg-dark">
            <Spinner />
          </div>
        </m.div>
      )}
    </>
  );
}
