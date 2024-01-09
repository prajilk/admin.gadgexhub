"use client";

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { MoreVertical } from "lucide-react";

const VisitOptions = () => {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          variant="light"
          isIconOnly
          size="sm"
          radius="full"
          className="me-3"
        >
          <MoreVertical size={15} />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem key="toady">Today</DropdownItem>
        <DropdownItem key="week">Last week</DropdownItem>
        <DropdownItem key="month">Last month</DropdownItem>
        <DropdownItem key="time">All Time</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default VisitOptions;
