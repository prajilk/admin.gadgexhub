"use client";

import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Pagination,
  Selection,
  SortDescriptor,
  Chip,
  ChipProps,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { ChevronDown, Eye, Search } from "lucide-react";
import { capitalize, formatCurrency } from "@/lib/utils";
import Link from "next/link";
import { OrderProps } from "@/lib/types/types";
import { useUpdateOrderStatus } from "@/api-hooks/orders/update-status";
import { toast } from "sonner";

const statusColorMap: Record<string, ChipProps["color"]> = {
  delivered: "success",
  pending: "danger",
  ongoing: "warning",
};

const columns = [
  { name: "ORDER ID", uid: "id" },
  { name: "USER ID", uid: "userId" },
  { name: "AMOUNT", uid: "total", sortable: true },
  { name: "ORDERED DATE", uid: "orderDate", sortable: true },
  { name: "PAYMENT VERIFIED", uid: "payment_verified", sortable: true },
  { name: "STATUS", uid: "status" },
  { name: "ITEMS COUNT", uid: "itemsCount" },
  { name: "ADDRESS ID", uid: "addressId" },
  { name: "UPDATE STATUS", uid: "update_status" },
  { name: "ACTIONS", uid: "actions" },
];

const INITIAL_VISIBLE_COLUMNS = [
  "id",
  "total",
  "orderDate",
  "payment_verified",
  "status",
  "itemsCount",
  "update_status",
  "actions",
];

export default function OrdersTable({ orders }: { orders?: OrderProps[] }) {
  const [filterValue, setFilterValue] = React.useState("");
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS),
  );
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "total",
    direction: "ascending",
  });
  const [page, setPage] = React.useState(1);

  const mutation = useUpdateOrderStatus(); // Update order mutation

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid),
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredOrders = [...orders!];

    if (hasSearchFilter) {
      filteredOrders = filteredOrders?.filter((order) =>
        order.id.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }

    return filteredOrders;
  }, [orders, filterValue]);

  const pages = Math.ceil(filteredItems?.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems?.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items]?.sort((a: OrderProps, b: OrderProps) => {
      const first = a[sortDescriptor.column as keyof OrderProps] as number;
      const second = b[sortDescriptor.column as keyof OrderProps] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback(
    (order: OrderProps, columnKey: React.Key) => {
      const cellValue = order[columnKey as keyof OrderProps];

      switch (columnKey) {
        case "total":
          return formatCurrency(order.total);
        case "payment_verified":
          return (
            <h1
              className={`${
                order.payment_verified ? "text-success" : "text-danger"
              } ms-10`}
            >
              {order.payment_verified ? "true" : "false"}
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
        case "itemsCount":
          return <h1 className="text-center">{cellValue}</h1>;
        case "update_status":
          return (
            <Select
              placeholder="Update status"
              className="max-w-xs"
              defaultSelectedKeys={[order.status]}
              onChange={(e) =>
                mutation.mutate({ id: order.id, status: e.target.value })
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
                href={`/dashboard/orders/${order.id}`}
              >
                <Eye className="text-zinc-500" />
              </Button>
            </div>
          );
        default:
          return cellValue;
      }
    },
    [],
  );

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    [],
  );

  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-3">
          <Input
            isClearable
            size="sm"
            className="w-full sm:max-w-[44%]"
            placeholder="Search by order id..."
            startContent={<Search />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
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
                className="max-h-[250px] overflow-y-scroll scrollbar-hide"
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
        </div>
        <div className="flex items-center justify-between">
          <span className="text-small text-default-400">
            Total {orders?.length || 0} orders
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
  }, [
    filterValue,
    visibleColumns,
    onSearchChange,
    onRowsPerPageChange,
    orders?.length,
    hasSearchFilter,
  ]);

  const bottomContent = React.useMemo(() => {
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
  }, [items?.length, page, pages, hasSearchFilter]);

  return (
    <Table
      aria-label="Orders table"
      isHeaderSticky
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      onSortChange={setSortDescriptor}
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={"No Orders found"} items={sortedItems || []}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
