"use client";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  ChipProps,
} from "@nextui-org/react";
import { useCallback } from "react";
import { useGetGuestUsers } from "@/api-hooks/guest-users/get-guest-users";
import { GuestUserProps } from "@/lib/types/types";
import DeleteGuest from "@/components/dialog/customer/delete-guest";

const statusColorMap: Record<string, ChipProps["color"]> = {
  active: "success",
  expired: "danger",
};

const columns = [
  { name: "USER ID", uid: "user_id" },
  { name: "EXPIRATION DATE", uid: "expiration_date" },
  { name: "STATUS", uid: "status" },
  { name: "ACTIONS", uid: "actions" },
];

export default function GuestUsers() {
  const { data: guestUsers } = useGetGuestUsers();

  const renderCell = useCallback(
    (user: GuestUserProps, columnKey: React.Key) => {
      const cellValue = user[columnKey as keyof GuestUserProps];

      switch (columnKey) {
        case "user_id":
          return <p className="text-sm">{cellValue}</p>;
        case "expiration_date":
          return <p className="text-sm">{cellValue}</p>;
        case "status":
          return (
            <Chip
              className="capitalize"
              color={statusColorMap[user.status]}
              size="sm"
              variant="flat"
            >
              {cellValue}
            </Chip>
          );
        case "actions":
          return <DeleteGuest id={user.user_id} />;
        default:
          return cellValue;
      }
    },
    [],
  );

  return (
    <Table aria-label="Guest users table" classNames={{ wrapper: "shadow-md" }}>
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
      <TableBody items={guestUsers?.guest_users}>
        {(item) => (
          <TableRow key={item.user_id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
