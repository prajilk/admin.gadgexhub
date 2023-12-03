import Nav from "@/components/nav/nav";
import { CalendarClock, Package, Users, Wallet } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import SummaryCard from "@/components/dashboard/summary-card";
import RevenueOverview from "@/components/dashboard/revenue-overview";
import { User } from "@nextui-org/react";

const CardDetails = [
  {
    icon: CalendarClock,
    title: "Pending Orders",
    url: "/",
    color: "text-danger",
    bgcolor: "bg-danger",
    value: "120",
  },
  {
    icon: Wallet,
    title: "Total Revenue",
    url: "/",
    color: "text-indigo-500",
    bgcolor: "bg-indigo-500",
    value: formatCurrency(1399),
    percentage: { increased: true, value: 43 },
  },
  {
    icon: Users,
    title: "Total Customers",
    url: "/",
    color: "text-[#23B7E5]",
    bgcolor: "bg-[#23B7E5]",
    value: "1,20,333",
    percentage: { increased: true, value: 43 },
  },
  {
    icon: Package,
    title: "Total Sales",
    url: "/",
    color: "text-[#F5B849]",
    bgcolor: "bg-[#F5B849]",
    value: "120",
    percentage: { increased: true, value: 43 },
  },
];

const RecentSales = [
  {
    image: "https://i.pravatar.cc/150?u=a04258114e29026702d",
    price: 2900,
    name: "Jane Doe",
  },
  {
    image: "https://i.pravatar.cc/150?u=a04258114e29026702",
    price: 1900,
    name: "Regan Keith",
  },
  {
    image: "https://i.pravatar.cc/150?u=a04258114e2902670",
    price: 190,
    name: "Jasmin Morgan",
  },
  {
    image: "https://i.pravatar.cc/150?u=a04258114e290267",
    price: 390,
    name: "Braxton Mcdonald",
  },
  {
    image: "https://i.pravatar.cc/150?u=a04258114e29026",
    price: 3390,
    name: "Maia Hancock",
  },
  {
    image: "https://i.pravatar.cc/150?u=a04258114e2902",
    price: 930,
    name: "Andrew Sims",
  },
  {
    image: "https://i.pravatar.cc/150?u=a04258114e290",
    price: 1290,
    name: "Skyler Powell",
  },
];

export default async function Home() {
  return (
    <Nav>
      <div className="@container">
        <div className="@md:grid-cols-2 @4xl:grid-cols-4 grid grid-cols-1 gap-3 px-3">
          {CardDetails.map((cardDetail, i) => (
            <SummaryCard {...cardDetail} key={i} />
          ))}
        </div>
        <div className="@3xl:grid-cols-3 my-10 grid grid-cols-1 px-3 md:gap-3">
          <div className="col-span-2 rounded-2xl bg-white p-3 shadow-md dark:bg-dark">
            <h1 className="mx-2 mb-5 mt-2 text-lg font-medium">
              Revenue Overview
            </h1>
            <RevenueOverview />
          </div>
          <div className="mt-3 rounded-2xl bg-white p-3 ps-4 shadow-md dark:bg-dark md:mt-0">
            <h1 className="mt-2 text-lg font-medium">Recent Sales</h1>
            <p className="text-xs">Total 230 sales this month</p>
            <div className="mt-4 space-y-3">
              {RecentSales.map((sale, i) => (
                <div className="flex items-center justify-between" key={i}>
                  <User
                    name={sale.name}
                    description="Product Designer"
                    avatarProps={{
                      src: sale.image,
                    }}
                  />
                  <h1 className="text-sm font-medium">
                    + {formatCurrency(sale.price)}
                  </h1>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Nav>
  );
}
