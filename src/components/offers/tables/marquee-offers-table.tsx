"use client";

import React, { Dispatch, SetStateAction } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { MarqueeOffers } from "@prisma/client";
import DeleteMarqueeOffer from "@/components/dialog/marquee-offers/delete-offer";
import EditMarqueeOffer from "@/components/dialog/marquee-offers/edit-offers";

const columns = [
  { name: "ID", uid: "id" },
  { name: "TITLE", uid: "title" },
  { name: "URL", uid: "url" },
  { name: "ACTIONS", uid: "actions" },
];

export default function MarqueeOffersTable({
  data,
  setOffersData,
}: {
  data: MarqueeOffers[] | null;
  setOffersData: Dispatch<SetStateAction<MarqueeOffers[] | null>>;
}) {
  const renderCell = React.useCallback(
    (offer: MarqueeOffers, columnKey: React.Key) => {
      const cellValue = offer[columnKey as keyof MarqueeOffers];

      switch (columnKey) {
        case "actions":
          return (
            <div className="flex justify-end">
              <EditMarqueeOffer setOffersData={setOffersData} offer={offer} />
              <DeleteMarqueeOffer id={offer.id} setOffersData={setOffersData} />
            </div>
          );
        default:
          return cellValue;
      }
    },
    [],
  );

  return (
    <Table
      aria-label="Marquee offers details"
      classNames={{
        wrapper: "px-0 shadow-none",
      }}
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            className={column.uid === "actions" ? "text-right" : "text-left"}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={data || []} emptyContent={"No offers to display."}>
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
