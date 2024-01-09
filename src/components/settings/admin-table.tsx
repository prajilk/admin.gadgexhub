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
import { useGetAdmins } from "@/api-hooks/admins/get-admins";
import { AdminProps } from "@/lib/types/types";
import EditAdmin from "@/components/dialog/admin/edit-admin";
import CreateAdmin from "../dialog/admin/create-admin";
import DeleteAdmin from "../dialog/admin/delete-admin";

const columns = [
  { name: "NAME", uid: "name" },
  { name: "ROLE", uid: "role" },
  { name: "EMAIL", uid: "email" },
  { name: "ACTIONS", uid: "actions" },
];

export default function AdminTable() {
  const { data: admins } = useGetAdmins();

  const renderCell = React.useCallback(
    (admin: AdminProps, columnKey: React.Key) => {
      const cellValue = admin[columnKey as keyof AdminProps];

      switch (columnKey) {
        case "name":
          return (
            <User
              avatarProps={{
                radius: "full",
                src: "/",
                showFallback: true,
                name: "",
              }}
              name={cellValue}
            >
              {admin.email}
            </User>
          );
        case "role":
          return <p className="text-bold text-sm capitalize">{cellValue}</p>;
        case "email":
          return <p className="text-bold text-sm">{cellValue}</p>;
        case "actions":
          return (
            <div className="relative flex items-center gap-4">
              <EditAdmin admin={admin} />
              <DeleteAdmin id={admin.id} />
            </div>
          );
        default:
          return cellValue;
      }
    },
    [],
  );

  return (
    <div className="my-5 rounded-2xl bg-white px-4 pt-4 shadow-md dark:bg-dark">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-medium">Admin List</h1>
        <CreateAdmin />
      </div>
      <Table
        aria-label="Admin Details Table"
        classNames={{
          wrapper: "px-0 shadow-none",
        }}
      >
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
        <TableBody items={admins?.admins}>
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
