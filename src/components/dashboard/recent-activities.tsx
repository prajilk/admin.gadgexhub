import { Card, CardBody } from "@nextui-org/react";

const recentActivities = [
  "Increased Zeb ZOD-1 product stock",
  "Updated Marquee offer items",
  "Removed expired temporary Users",
  "Deleted Product Stainless Steel Vacuum Insulated Coffee Mug",
  "Created new Admin with role Guest User",
  "Updated Product OnePlus Buds Z2",
  "Added new Product to Category TWS Earbuds",
];

const RecentActivities = () => {
  return (
    <Card className="mt-5 shadow-md md:mt-0">
      <CardBody className="bg-white dark:bg-dark">
        <h1 className="text-lg font-medium text-black dark:text-white">
          Recent Activities
        </h1>
        <div className="mt-3 space-y-[1px] text-sm">
          <RecentItemsList data={recentActivities} />
        </div>
      </CardBody>
    </Card>
  );
};

export default RecentActivities;

function RecentItemsList({ data }: { data: string[] }) {
  const colors = [
    "green-500",
    "primary",
    "cyan-500",
    "red-500",
    "yellow-500",
    "pink-500",
    "fuchsia-500",
  ];

  return (
    <>
      {data.map((item, i) => (
        <div
          className={`relative flex items-start gap-5 ${
            data.indexOf(item) !== data.length - 1 &&
            "relative flex items-start gap-5 before:absolute before:left-2 before:h-full before:w-0.5 before:border-l before:border-dashed before:border-gray-500"
          }`}
          key={i}
        >
          <div
            className={`relative h-4 w-4 rounded-full bg-${colors[i]}/40 before:absolute before:left-[50%] before:top-[50%] before:h-2 before:w-2 before:translate-x-[-50%] before:translate-y-[-50%] before:rounded-full before:bg-${colors[i]}`}
          ></div>
          <div className="max-w-xs pb-5">{item}</div>
        </div>
      ))}
    </>
  );
}
