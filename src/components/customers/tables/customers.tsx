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
  User,
  Pagination,
  Selection,
  SortDescriptor,
} from "@nextui-org/react";
import { ChevronDown, Eye, Pencil, PlusIcon, Search } from "lucide-react";
import { capitalize } from "@/lib/utils";
import { useCustomers } from "@/api-hooks/customers/get-customers";
import { Customer } from "@/lib/types/types";
import DefaultSheet from "@/components/sheets/default-sheet";
import CreateCustomerForm from "@/components/forms/create-customer";
import EditCustomerForm from "@/components/forms/edit-customer";
import DeleteCustomer from "@/components/dialog/customer/delete-customer";
import Link from "next/link";

const columns = [
  { name: "ID", uid: "id" },
  { name: "NAME", uid: "name", sortable: true },
  { name: "EMAIL", uid: "email" },
  { name: "GENDER", uid: "gender" },
  { name: "PHONE", uid: "phone" },
  { name: "CREATED AT", uid: "createdAt", sortable: true },
  { name: "UPDATED AT", uid: "updatedAt", sortable: true },
  { name: "LAST LOGIN", uid: "lastLogin", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];

const INITIAL_VISIBLE_COLUMNS = [
  "name",
  "email",
  "createdAt",
  "updatedAt",
  "lastLogin",
  "actions",
];

export default function Customers() {
  const { data: customers } = useCustomers();

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
    let filteredUsers = [...customers?.customers!];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.name.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }

    return filteredUsers;
  }, [filterValue, hasSearchFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column as keyof Customer];
      const second = b[sortDescriptor.column as keyof Customer];
      if (first && second) {
        const cmp = first < second ? -1 : first > second ? 1 : 0;
        return sortDescriptor.direction === "descending" ? -cmp : cmp;
      } else return 0;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback(
    (customer: Customer, columnKey: React.Key) => {
      const cellValue = customer[columnKey as keyof Customer];

      switch (columnKey) {
        case "name":
          return (
            <User
              avatarProps={{
                radius: "lg",
                src: customer.image,
                name: "",
                showFallback: true,
              }}
              name={cellValue}
            >
              {customer.email}
            </User>
          );
        case "email":
          return <p className="text-bold text-small">{cellValue}</p>;
        case "phone":
          return <p className="text-bold text-small">{cellValue}</p>;
        case "actions":
          return (
            <div className="flex items-center justify-center">
              {/* View customer */}
              <Button
                isIconOnly
                size="sm"
                variant="light"
                as={Link}
                radius="full"
                href={`/dashboard/customers/${customer.id}`}
              >
                <Eye size={20} className="text-zinc-500" />
              </Button>

              {/* Edit customer */}
              <DefaultSheet
                title="Edit Customer"
                trigger={
                  <Button isIconOnly size="sm" variant="light" radius="full">
                    <Pencil size={20} className="text-zinc-500" />
                  </Button>
                }
                classNames={{
                  content: "min-w-[40%]",
                }}
              >
                <div className="px-5">
                  <EditCustomerForm customer={customer} />
                </div>
              </DefaultSheet>

              {/* Delete customer */}
              <DeleteCustomer id={customer.id} />
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
      <div className="mt-5 flex flex-col gap-4">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by name..."
            size="sm"
            classNames={{
              inputWrapper:
                "bg-default-200 dark:bg-default-100 group-data-[focus=true]:bg-default-200 dark:group-data-[focus=true]:bg-default-100",
            }}
            startContent={<Search />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="ms-auto flex items-center gap-3 md:ms-0">
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
                className="scrollbar-thin max-h-[250px] overflow-y-scroll"
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
            <DefaultSheet
              title="Add Customer"
              trigger={
                <Button
                  color="primary"
                  size="sm"
                  endContent={<PlusIcon size={20} />}
                >
                  Add New
                </Button>
              }
              classNames={{
                content: "min-w-[40%]",
              }}
            >
              <div className="px-5">
                <CreateCustomerForm />
              </div>
            </DefaultSheet>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-small text-default-400">
            Total {customers?.customers.length} Customers
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
    onClear,
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
  }, [page, pages, filteredItems.length, onNextPage, onPreviousPage]);

  return (
    <Table
      aria-label="Customer table"
      isHeaderSticky
      classNames={{
        wrapper: "shadow-md",
      }}
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
      <TableBody emptyContent={"No Customers found"} items={sortedItems}>
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
