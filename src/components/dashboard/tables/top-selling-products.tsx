"use client";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Button,
  Tooltip,
  Chip,
} from "@nextui-org/react";
import { formatCurrency, textTruncate } from "@/lib/utils";
import { useCallback } from "react";
import { ChevronRight, Eye } from "lucide-react";
import { toast } from "sonner";
import {
  topSellingProducts,
  topSellingProductsColumns,
} from "@/lib/table-data/top-selling";
import Link from "next/link";
import DeleteProduct from "@/components/dialog/products/delete-product";

type Product = (typeof topSellingProducts)[0];

export default function TopSellingProducts() {
  const renderCell = useCallback((product: Product, columnKey: React.Key) => {
    const cellValue = product[columnKey as keyof Product];

    switch (columnKey) {
      case "pid":
        return (
          <Tooltip content="Copy PID" placement="top">
            <span
              className="cursor-pointer"
              onClick={() => {
                navigator.clipboard.writeText(product.pid);
                toast.success("Product ID copied to clipboard");
              }}
            >
              {textTruncate(product.pid, 10)}
            </span>
          </Tooltip>
        );
      case "product":
        return (
          <User
            avatarProps={{
              radius: "full",
              src: product.image,
              classNames: { img: "bg-zinc-200 dark:bg-zinc-500" },
            }}
            classNames={{
              name: "whitespace-pre",
            }}
            name={textTruncate(product.product, 17)}
          >
            {product.product}
          </User>
        );
      case "base_p":
        return <h1>{formatCurrency(product.base_p)}</h1>;
      case "offer_p":
        return <h1>{formatCurrency(product.offer_p)}</h1>;
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
      case "sold":
        return <h1 className="text-center">{product.sold}</h1>;
      case "earnings":
        return (
          <h1 className="font-medium text-success">
            {formatCurrency(product.earnings)}
          </h1>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="View Details">
              <Button
                isIconOnly
                size="sm"
                variant="light"
                as={Link}
                radius="full"
                href={`/dashboard/products/${product.pid}`}
              >
                <Eye className="text-zinc-500" />
              </Button>
            </Tooltip>
            <DeleteProduct id={product.pid} />
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <div className="mx-3 rounded-2xl bg-white px-4 pt-4 shadow-md dark:bg-dark">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-medium">Top Selling Products</h1>
        <Button
          variant="flat"
          size="sm"
          as={Link}
          href="/dashboard/products"
          color="primary"
          className="dark:bg-zinc-800 dark:text-white"
          endContent={<ChevronRight size={15} />}
        >
          View All
        </Button>
      </div>
      <Table
        aria-label="Top Selling Products"
        classNames={{
          wrapper: "px-0 shadow-none",
        }}
      >
        <TableHeader columns={topSellingProductsColumns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={topSellingProducts}>
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
}
