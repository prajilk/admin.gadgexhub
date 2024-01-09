"use client";

import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Pagination,
  Selection,
  SortDescriptor,
  Tooltip,
} from "@nextui-org/react";
import { ChevronDown, Trash2 } from "lucide-react";
import { capitalize, textTruncate } from "@/lib/utils";
import { Address } from "@/lib/types/types";
import { useAddresses } from "@/api-hooks/addresses/get-addresses";
import { toast } from "sonner";
import DeleteAddress from "@/components/dialog/customer/delete-address";

const columns = [
  { name: "ID", uid: "id" },
  { name: "USER ID", uid: "user_id" },
  { name: "NAME", uid: "name", sortable: true },
  { name: "PHONE", uid: "phone" },
  { name: "ADDRESS", uid: "address" },
  { name: "DISTRICT", uid: "district" },
  { name: "STATE", uid: "state" },
  { name: "PINCODE", uid: "pincode" },
  { name: "LAND MARK", uid: "land_mark" },
  { name: "LOCALITY", uid: "locality" },
  { name: "ALT PHONE", uid: "alt_phone" },
  { name: "IS DEFAULT", uid: "is_default" },
  { name: "IS DELETED", uid: "is_deleted", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];

const INITIAL_VISIBLE_COLUMNS = [
  "name",
  "user_id",
  "is_deleted",
  "address",
  "district",
  "state",
  "actions",
];

export default function AddressTable() {
  const { data: addressData } = useAddresses();

  const [filterValue, setFilterValue] = React.useState("");
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS),
  );

  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "name",
    direction: "ascending",
  });

  const [page, setPage] = React.useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid),
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredAddresses = [...addressData?.addresses!];

    if (hasSearchFilter) {
      filteredAddresses = filteredAddresses.filter((address) =>
        address.name.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }

    return filteredAddresses;
  }, [addressData, filterValue]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: Address, b: Address) => {
      const first = a[sortDescriptor.column as keyof Address] as number;
      const second = b[sortDescriptor.column as keyof Address] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback(
    (address: Address, columnKey: React.Key) => {
      const cellValue = address[columnKey as keyof Address];

      switch (columnKey) {
        case "user_id":
          return (
            <Tooltip content="Copy UID" placement="top">
              <span
                className="cursor-pointer"
                onClick={() => {
                  navigator.clipboard.writeText(address.user_id);
                  toast.success("User ID copied to clipboard");
                }}
              >
                {textTruncate(address.user_id, 10)}
              </span>
            </Tooltip>
          );
        case "is_default":
          return <p>{cellValue?.toString()}</p>;
        case "is_deleted":
          return (
            <p className={`${cellValue ? "text-danger" : "text-success"}`}>
              {cellValue?.toString()}
            </p>
          );
        case "actions":
          return <DeleteAddress id={address.id} />;
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

  const topContent = React.useMemo(() => {
    return (
      <div className="mt-6 flex flex-col gap-4">
        <div className="flex items-end justify-end">
          <Dropdown>
            <DropdownTrigger className="hidden sm:flex">
              <Button endContent={<ChevronDown size={20} />} variant="flat">
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
              className="scrollbar-thin max-h-[300px] overflow-y-scroll"
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
            Total {addressData?.addresses.length} addresses
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
    addressData?.addresses.length,
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
  }, [items.length, page, pages, hasSearchFilter]);

  return (
    <Table
      aria-label="Address table"
      isHeaderSticky
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      classNames={{
        wrapper: "max-h-[382px]",
      }}
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
      <TableBody emptyContent={"No addresses found"} items={sortedItems}>
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
