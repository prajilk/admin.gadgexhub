"use client";

import { Card, CardBody, Tabs as NextUITabs, Tab } from "@nextui-org/react";
import { BarChart3, UserMinus, Users } from "lucide-react";
import Customers from "./tables/customers";
import GuestUsers from "./tables/guest-users";

const Tabs = () => {
  return (
    <NextUITabs
      variant="underlined"
      aria-label="NextUITabs variants"
      color="primary"
    >
      <Tab
        key="customers"
        title={
          <div className="flex items-center gap-2">
            <Users size={20} />
            <span>Customers</span>
          </div>
        }
      >
        <h1 className="mt-5 text-xl text-zinc-400">All Customers</h1>
        <Customers />
      </Tab>
      <Tab
        key="guest"
        title={
          <div className="flex items-center gap-2">
            <UserMinus size={20} />
            <span>Guest Users</span>
          </div>
        }
      >
        <h1 className="my-5 text-xl text-zinc-400">All Guest Users</h1>
        <GuestUsers />
      </Tab>
      <Tab
        key="analytics"
        title={
          <div className="flex items-center gap-2">
            <BarChart3 size={20} />
            <span>Analytics</span>
          </div>
        }
      >
        <Card>
          <CardBody>
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
            officia deserunt mollit anim id est laborum.
          </CardBody>
        </Card>
      </Tab>
    </NextUITabs>
  );
};

export default Tabs;
