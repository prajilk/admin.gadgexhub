import RevenueOverview from "@/components/dashboard/revenue/revenue-overview";
import SummaryCard from "@/components/dashboard/summary/summary-card";
import Nav from "@/components/nav/nav";
import TopSales from "@/components/revenue/top-sales";
import { revenueData, topSalesData } from "@/lib/data";
import { Package, Wallet } from "lucide-react";

const Revenue = async () => {
  return (
    <Nav>
      <h1 className="text-zinc-400 md:text-xl">Revenue</h1>
      <div className="mb-10 mt-5 @container">
        <div className="grid grid-cols-1 gap-3 @md:grid-cols-2 @4xl:grid-cols-4">
          <SummaryCard
            bgcolor="bg-indigo-500"
            color="text-indigo-500"
            icon={Wallet}
            title="Total Revenue"
            value={1399}
            isCurrency
            percentage={{ increased: true, value: 12 }}
          />
          <SummaryCard
            bgcolor="bg-yellow-500"
            color="text-yellow-500"
            icon={Package}
            title="Total Sales"
            value={120}
            percentage={{ increased: true, value: 5 }}
          />
          <SummaryCard
            bgcolor="bg-[#23B7E5]"
            color="text-[#23B7E5]"
            icon={Wallet}
            title="Pending Revenue"
            value={1099}
            isCurrency
            percentage={{ increased: true, value: 9 }}
          />
        </div>
        <div className="my-10 grid grid-cols-1 @3xl:grid-cols-5 md:gap-3">
          <RevenueOverview data={revenueData} />
          <TopSales data={topSalesData} />
        </div>
      </div>
    </Nav>
  );
};

export default Revenue;
