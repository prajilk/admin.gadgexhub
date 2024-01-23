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
  Chip,
  User,
  Pagination,
  Selection,
  SortDescriptor,
} from "@nextui-org/react";
import { ChevronDown, Eye, Pencil, Plus, Search } from "lucide-react";
import { capitalize, formatCurrency, textTruncate } from "@/lib/utils";
import { useProducts } from "@/api-hooks/products/get-products";
import { ProductProps } from "@/lib/types/types";
import Link from "next/link";
import DeleteProduct from "../dialog/products/delete-product";

const columns = [
  { name: "ID", uid: "id" },
  { name: "SLUG", uid: "slug" },
  { name: "TITLE", uid: "title", sortable: true },
  { name: "DESCRIPTION", uid: "description" },
  { name: "SHORT DESC", uid: "shortDescription" },
  { name: "BASE PRICE", uid: "basePrice", sortable: true },
  { name: "OFFER PRICE", uid: "offerPrice", sortable: true },
  { name: "CATEGORY", uid: "category", sortable: true },
  { name: "STOCK", uid: "stock", sortable: true },
  { name: "UNIT SOLD", uid: "purchases", sortable: true },
  { name: "EARNINGS", uid: "earnings", sortable: true },
  { name: "COLOR", uid: "color" },
  { name: "VARIANT NAME", uid: "variantName" },
  { name: "VARIANT VALUES", uid: "variantValues" },
  { name: "KEYWORDS", uid: "keywords" },
  { name: "CREATED AT", uid: "createdAt" },
  { name: "ACTIONS", uid: "actions" },
];

const INITIAL_VISIBLE_COLUMNS = [
  "title",
  "basePrice",
  "offerPrice",
  "stock",
  "purchases",
  "earnings",
  "actions",
];

export default function ProductsTable() {
  const [filterValue, setFilterValue] = React.useState("");
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS),
  );
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "offerPrice",
    direction: "ascending",
  });
  const [page, setPage] = React.useState(1);

  const { data } = useProducts();

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid),
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredProducts = [...data?.products!];

    if (hasSearchFilter) {
      filteredProducts = filteredProducts.filter((product) =>
        product.title.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }

    return filteredProducts;
  }, [data, filterValue]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: ProductProps, b: ProductProps) => {
      const first = a[sortDescriptor.column as keyof ProductProps] as number;
      const second = b[sortDescriptor.column as keyof ProductProps] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback(
    (product: ProductProps, columnKey: React.Key) => {
      const cellValue = product[columnKey as keyof ProductProps];

      switch (columnKey) {
        case "title":
          return (
            <User
              avatarProps={{
                radius: "full",
                src: process.env.NEXT_PUBLIC_IMAGE_URL + product.image,
                classNames: { img: "bg-zinc-200 dark:bg-zinc-500" },
              }}
              classNames={{
                name: "whitespace-pre",
              }}
              name={textTruncate(product.title, 17)}
            >
              {product.title}
            </User>
          );
        case "offerPrice":
          return formatCurrency(product.offerPrice);
        case "basePrice":
          return formatCurrency(product.basePrice);
        case "stock":
          return (
            <Chip
              className="capitalize"
              color={product.stock === 0 ? "danger" : "success"}
              size="sm"
              variant="flat"
            >
              {product.stock === 0
                ? "out of stock"
                : `in stock (${product.stock})`}
            </Chip>
          );
        case "earnings":
          return (
            <h1 className="font-medium text-success">
              {formatCurrency(product.earnings)}
            </h1>
          );
        case "actions":
          return (
            <div className="flex items-center justify-center">
              {/* View product */}
              <Button
                isIconOnly
                size="sm"
                variant="light"
                as={Link}
                radius="full"
                href={`/dashboard/products/${product.id}`}
              >
                <Eye size={20} className="text-zinc-500" />
              </Button>

              {/* Edit product */}
              <Button
                isIconOnly
                size="sm"
                variant="light"
                as={Link}
                radius="full"
                href={`/dashboard/products/edit?pid=${product.id}`}
              >
                <Pencil size={20} className="text-zinc-500" />
              </Button>

              {/* Delete product */}
              <DeleteProduct id={product.id} />
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
            placeholder="Search by name..."
            startContent={<Search />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="z-0 hidden sm:flex">
                <Button endContent={<ChevronDown size={20} />} variant="flat">
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                className="max-h-[250px] overflow-y-scroll scrollbar-hide"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                aria-label="product-table-column-select"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Button
              as={Link}
              href="/dashboard/products/add "
              color="primary"
              endContent={<Plus size={20} />}
            >
              Add New
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-small text-default-400">
            Total {data?.products.length} products
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
    data?.products.length,
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
      aria-label="Products table"
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
      <TableBody emptyContent={"No Products found"} items={sortedItems || []}>
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
