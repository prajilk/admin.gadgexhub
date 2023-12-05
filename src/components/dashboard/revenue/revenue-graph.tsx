"use client";

import { formatCurrency } from "@/lib/utils";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="min-w-[100px] rounded-lg border bg-white px-2 py-3 text-xs text-black dark:bg-dark dark:text-zinc-200">
        <p>
          {label}:{" "}
          <span className="font-medium">
            {formatCurrency(payload[0].value)}
          </span>
        </p>
      </div>
    );
  }
  return null;
};

const RevenueGraph = ({ data }: { data: any[] }) => {
  return (
    <>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data}>
          <XAxis
            dataKey="name"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `$${value}`}
          />
          {/* adfa1d */}
          <Bar dataKey="total" fill="#adfa1d" radius={[4, 4, 0, 0]} />
          <Tooltip content={<CustomTooltip />} cursor={false} />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default RevenueGraph;
