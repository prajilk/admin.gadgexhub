"use client";

import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { Category } from "@/lib/types/types";
import { useCategories } from "@/api-hooks/categories/get-categories";
import DeleteCategory from "../dialog/category/delete-category";
import EditCategory from "../dialog/category/edit-category";

const columns = [
  { name: "ID", uid: "id" },
  { name: "CATEGORY", uid: "name" },
  { name: "PARENT ID", uid: "parentId" },
  { name: "PRODUCTS", uid: "_count" },
  { name: "ACTIONS", uid: "actions" },
];

export default function CategoriesTable() {
  const { data: categories } = useCategories();

  const renderCell = React.useCallback(
    (category: Category, columnKey: React.Key) => {
      const cellValue = category[columnKey as keyof Category];

      switch (columnKey) {
        case "parentId":
          return cellValue === null ? "NULL" : cellValue;
        case "_count":
          return cellValue === 0 ? "" : cellValue;
        case "actions":
          return (
            <div className="relative flex items-center gap-2">
              <EditCategory category={category} />
              <DeleteCategory id={category.id} />
            </div>
          );
        default:
          return cellValue;
      }
    },
    [],
  );

  return (
    <Table aria-label="Example table with custom cells">
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={categories || []}>
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
