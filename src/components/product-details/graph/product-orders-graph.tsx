"use client";

import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="min-w-[100px] rounded-lg border bg-white px-2 py-3 text-xs text-black dark:bg-dark dark:text-zinc-200">
        <p>
          {label}: <span className="font-medium">{payload[0].value}</span>
        </p>
      </div>
    );
  }
  return null;
};

const ProductOrdersGraph = ({ data }: { data: any[] }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#463acb" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#463acb" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="name"
          fontSize={12}
          stroke="#888888"
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          fontSize={12}
          stroke="#888888"
          tickLine={false}
          axisLine={false}
        />
        <Tooltip content={<CustomTooltip />} cursor={false} />
        <Area
          type="monotone"
          dataKey="uv"
          stroke="#463acb"
          fillOpacity={1}
          fill="url(#colorUv)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default ProductOrdersGraph;
