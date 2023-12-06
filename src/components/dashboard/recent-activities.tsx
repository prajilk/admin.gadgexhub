import { Card, CardBody } from "@nextui-org/react";

const recentActivities = [
  "Added new Product to Category TWS Earbuds",
  "Updated Product OnePlus Buds Z2",
  "Created new Admin with role Guest User",
  "Deleted Product Stainless Steel Vacuum Insulated Coffee Mug",
  "Removed expired temporary Users",
  "Updated Marquee offer items",
  "Increased Zeb ZOD-1 product stock",
];

const RecentActivities = () => {
  return (
    <Card className="mt-5 shadow-md md:mt-0">
      <CardBody className="bg-white dark:bg-dark">
        <h1 className="text-lg font-medium text-black dark:text-white">
          Recent Activities
        </h1>
        <div className="mt-3 space-y-[1px] text-sm">
          <ActivitiesList data={recentActivities} />
        </div>
      </CardBody>
    </Card>
  );
};

export default RecentActivities;

function ActivitiesList({ data }: { data: string[] }) {
  const colors = [
    "34 197 94",
    "99 102 241",
    "6 182 212",
    "239 68 68",
    "234 179 8",
    "236 72 153",
    "217 70 239",
  ];
  return (
    <>
      {data.map((item, i) => (
        <div
          className={`relative flex items-start gap-5 ${
            data.indexOf(item) !== data.length - 1 &&
            "before:absolute before:left-2 before:h-full before:w-0.5 before:border-l before:border-dashed before:border-gray-300 dark:before:border-gray-500"
          }`}
          key={i}
        >
          <div
            className="relative h-4 w-4 flex-shrink-0 rounded-full"
            style={{ backgroundColor: `rgb(${colors[i]} / 0.4)` }}
          >
            <div
              className="absolute left-[50%] top-[50%] h-2 w-2 translate-x-[-50%] translate-y-[-50%] rounded-full bg-red-500"
              style={{ backgroundColor: `rgb(${colors[i]})` }}
            ></div>
          </div>
          <div className="max-w-xs pb-5">{item}</div>
        </div>
      ))}
    </>
  );
}
