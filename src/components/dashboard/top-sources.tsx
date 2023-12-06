import { Avatar, Button, Card, CardBody } from "@nextui-org/react";
import { ChevronRight, Link } from "lucide-react";

const topSources = [
  { source: "instagram.com", value: "1232", progressPercentage: 95 },
  { source: "whatsapp.com", value: "932", progressPercentage: 72 },
  { source: "google.com", value: "789", progressPercentage: 61 },
  { source: "Direct / None", value: "636", progressPercentage: 49 },
  { source: "youtube.com", value: "611", progressPercentage: 47 },
];

const TopSources = () => {
  return (
    <Card className="shadow-md">
      <CardBody className="bg-white dark:bg-dark">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-medium text-black dark:text-white">
            Top Sources
          </h1>
          <Button
            variant="flat"
            size="sm"
            className="bg-indigo-100 text-primary dark:bg-zinc-800 dark:text-white"
            endContent={<ChevronRight size={15} />}
          >
            View All
          </Button>
        </div>
        <ul className="mt-4 space-y-3 ps-1">
          {topSources.map((data, i) => (
            <SourceList {...data} key={i} />
          ))}
        </ul>
      </CardBody>
    </Card>
  );
};

export default TopSources;

function SourceList({
  source,
  progressPercentage,
  value,
}: {
  source: string;
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
        <span className="z-10 flex items-center gap-3 text-black dark:text-white">
          {source !== "Direct / None" ? (
            <Avatar
              src={`https://s2.googleusercontent.com/s2/favicons?domain=${source}`}
              className="h-4 w-4 bg-transparent text-tiny"
            />
          ) : (
            <Link size={16} />
          )}
          {source}
        </span>
        <span>{value}</span>
      </li>
    </>
  );
}
