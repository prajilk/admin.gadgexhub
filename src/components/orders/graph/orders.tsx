"use client";

import { Button, Card, CardBody } from "@nextui-org/react";
import OrdersGraph from "./orders-graph";
import { Dispatch, SetStateAction, useState } from "react";

type FilterButtonProps = {
  children: string;
  data: any[];
  filter: string;
  activeFilter: string;
  setGraphData: Dispatch<SetStateAction<any[]>>;
  setActiveFilter: Dispatch<SetStateAction<string>>;
};

const Orders = ({
  data,
}: {
  data: { weeklyData: any[]; monthlyData: any[]; yearlyData: any[] };
}) => {
  const [graphData, setGraphData] = useState(data.yearlyData);
  const [activeFilter, setActiveFilter] = useState("year");
  return (
    <Card className="col-span-2 shadow-md">
      <CardBody>
        <div className="mb-10 grid grid-cols-1 items-center space-y-2 @sm:grid-cols-2">
          <h1 className="mx-2 mt-2 text-lg font-medium">Orders details</h1>
          <div className="@sm:justify-self-end">
            <FilterButton
              data={data.weeklyData}
              filter="week"
              activeFilter={activeFilter}
              setGraphData={setGraphData}
              setActiveFilter={setActiveFilter}
            >
              Week
            </FilterButton>
            <FilterButton
              data={data.monthlyData}
              filter="month"
              activeFilter={activeFilter}
              setGraphData={setGraphData}
              setActiveFilter={setActiveFilter}
            >
              Month
            </FilterButton>
            <FilterButton
              data={data.yearlyData}
              filter="year"
              activeFilter={activeFilter}
              setGraphData={setGraphData}
              setActiveFilter={setActiveFilter}
            >
              Year
            </FilterButton>
          </div>
        </div>
        <OrdersGraph data={graphData} />
      </CardBody>
    </Card>
  );
};

export default Orders;

const FilterButton = ({
  children,
  data,
  filter,
  activeFilter,
  setGraphData,
  setActiveFilter,
}: FilterButtonProps) => (
  <Button
    size="sm"
    onClick={() => {
      setGraphData(data);
      setActiveFilter(filter);
    }}
    className={`
      ${
        activeFilter === filter
          ? "bg-indigo-100 text-primary dark:bg-zinc-800 dark:text-white"
          : "bg-transparent text-black dark:text-white"
      }
      hover:bg-indigo-100 hover:text-primary hover:dark:bg-zinc-800
    `}
  >
    {children}
  </Button>
);
