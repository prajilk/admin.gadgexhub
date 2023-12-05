import { Button, Card, CardBody } from "@nextui-org/react";
import { ChevronRight } from "lucide-react";

const topStateData = [
  { state: "Kerala", value: "1221", progressPercentage: 85 },
  { state: "Karnataka", value: "1017", progressPercentage: 75 },
  { state: "Tamil Nadu", value: "798", progressPercentage: 50 },
  { state: "Telangana", value: "567", progressPercentage: 30 },
  { state: "Goa", value: "436", progressPercentage: 21 },
  { state: "Maharashtra", value: "129", progressPercentage: 15 },
];

const TopStateBySales = () => {
  return (
    <Card className="shadow-md">
      <CardBody className="bg-white dark:bg-dark">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-medium text-black dark:text-white">
            Top States By Sales
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
          {topStateData.map((data, i) => (
            <StateList
              state={data.state}
              value={data.value}
              progressPercentage={data.progressPercentage}
              key={i}
            />
          ))}
        </ul>
      </CardBody>
    </Card>
  );
};

export default TopStateBySales;

function StateList({
  state,
  progressPercentage,
  value,
}: {
  state: string;
  value: string;
  progressPercentage: string | number;
}) {
  return (
    <>
      <li className="relative flex items-center justify-between rounded-md border bg-primary/20 px-3 py-2 text-sm">
        <div
          className="absolute left-0 h-full rounded-md bg-primary/70"
          style={{ width: `${progressPercentage}%` }}
        ></div>
        <span className="z-10 text-white">{state}</span>
        <span>{value}</span>
      </li>
    </>
  );
}
