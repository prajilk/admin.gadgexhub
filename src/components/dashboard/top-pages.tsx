import { Button, Card, CardBody } from "@nextui-org/react";
import { ChevronRight } from "lucide-react";

const topPages = [
  { page: "/", value: "2117", progressPercentage: 96 },
  { page: "/store", value: "697", progressPercentage: 32 },
  {
    page: "/store/c/audio-video/earphones",
    value: "789",
    progressPercentage: 36,
  },
  { page: "/store/oneplus-buds-z2", value: "586", progressPercentage: 27 },
  { page: "/store/zeb-pods-1", value: "516", progressPercentage: 23 },
  { page: "/authentication", value: "163", progressPercentage: 7 },
  { page: "/account", value: "121", progressPercentage: 6 },
];

const TopPages = () => {
  return (
    <Card className="mt-5 shadow-md md:mt-0">
      <CardBody>
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-medium">Top Pages</h1>
          {/* <Button
            variant="flat"
            size="sm"
            color="primary"
            className="dark:bg-zinc-800 dark:text-white"
            endContent={<ChevronRight size={15} />}
          >
            View All
          </Button> */}
        </div>
        <ul className="mt-4 space-y-3 ps-1">
          {topPages.map((data, i) => (
            <SourceList {...data} key={i} />
          ))}
        </ul>
      </CardBody>
    </Card>
  );
};

export default TopPages;

function SourceList({
  page,
  progressPercentage,
  value,
}: {
  page: string;
  value: string;
  progressPercentage: string | number;
}) {
  return (
    <>
      <li className="relative flex items-center justify-between rounded-md border px-3 py-2 text-sm">
        <div
          className="absolute left-0 h-full rounded-md bg-primary/30"
          style={{ width: `${progressPercentage}%` }}
        ></div>
        <span className="z-10">{page}</span>
        <span>{value}</span>
      </li>
    </>
  );
}
