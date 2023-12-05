"use client";

import { Button } from "@nextui-org/react";
import RevenueGraph from "./revenue-graph";
import { Dispatch, SetStateAction, useState } from "react";

type FilterButtonProps = {
  children: string;
  data: any[];
  filter: string;
  activeFilter: string;
  setGraphData: Dispatch<SetStateAction<any[]>>;
  setActiveFilter: Dispatch<SetStateAction<string>>;
};

const RevenueOverview = ({
  data,
}: {
  data: { weeklyData: any[]; monthlyData: any[]; yearlyData: any[] };
}) => {
  const [graphData, setGraphData] = useState(data.weeklyData);
  const [activeFilter, setActiveFilter] = useState("week");

  return (
    <div className="col-span-3 rounded-2xl bg-white p-3 shadow-md @container dark:bg-dark">
      <div className="mb-5 grid grid-cols-1 items-center space-y-2 @sm:grid-cols-2">
        <h1 className="mx-2 mt-2 text-lg font-medium">Revenue Overview</h1>
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
      <RevenueGraph data={graphData} />
    </div>
  );
};

export default RevenueOverview;

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
