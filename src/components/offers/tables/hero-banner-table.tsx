"use client";

import React, { Dispatch, SetStateAction } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Selection,
  Dropdown,
  DropdownTrigger,
  Button,
  DropdownMenu,
  DropdownItem,
  User,
} from "@nextui-org/react";
import { HeroBanner } from "@prisma/client";
import { ChevronDown } from "lucide-react";
import { capitalize, formatCurrency } from "@/lib/utils";
import AddBanner from "@/components/dialog/hero-banner/add-banner";
import EditHeroBanner from "@/components/dialog/hero-banner/edit-banner";
import DeleteHeroBanner from "@/components/dialog/hero-banner/delete-banner";

const columns = [
  { name: "ID", uid: "id" },
  { name: "IMAGES", uid: "images" },
  { name: "TITLE", uid: "title" },
  { name: "DESCRIPTION", uid: "description" },
  { name: "BASE PRICE", uid: "basePrice" },
  { name: "OFFER PRICE", uid: "offerPrice" },
  { name: "URL", uid: "url" },
  { name: "ACTIONS", uid: "actions" },
];

const INITIAL_VISIBLE_COLUMNS = [
  "title",
  "basePrice",
  "offerPrice",
  "description",
  "images",
  "actions",
];

export default function HeroBannerTable({
  data,
  setBannerData,
}: {
  data: HeroBanner[] | null;
  setBannerData: Dispatch<SetStateAction<HeroBanner[] | null>>;
}) {
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS),
  );

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid),
    );
  }, [visibleColumns]);

  const topContent = React.useMemo(() => {
    return (
      <>
        <div className="flex items-center justify-between">
          <h1 className="font-medium md:text-lg">Hero Banners</h1>
          <div className="flex items-center gap-2">
            <Dropdown>
              <DropdownTrigger className="z-0 hidden sm:flex">
                <Button
                  endContent={<ChevronDown size={20} />}
                  variant="flat"
                  size="sm"
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
                aria-label="banner-table-column-select"
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <AddBanner setBannerData={setBannerData} />
          </div>
        </div>
        <span className="text-small text-default-400">
          Total {data?.length} banners
        </span>
      </>
    );
  }, [visibleColumns, data?.length]);

  const renderCell = React.useCallback(
    (banner: HeroBanner, columnKey: React.Key) => {
      const cellValue = banner[columnKey as keyof HeroBanner];

      switch (columnKey) {
        case "images":
          return (
            <User
              avatarProps={{
                src: banner.imageUrlSm,
              }}
              name=""
            />
          );
        case "offerPrice":
          return formatCurrency(banner.offerPrice);
        case "basePrice":
          return formatCurrency(banner.basePrice);
        case "actions":
          return (
            <div className="flex justify-end">
              <EditHeroBanner banner={banner} setBannerData={setBannerData} />
              <DeleteHeroBanner
                id={banner.id}
                setBannerData={setBannerData}
                publicId={banner.imageUrl.split(".").at(-2)!.split("/").at(-1)!}
              />
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
      topContent={topContent}
      topContentPlacement="outside"
      aria-label="Marquee offers details"
      classNames={{
        wrapper: "px-0 shadow-none",
      }}
    >
      <TableHeader /* columns={columns} */ columns={headerColumns}>
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
