import CountUpValue from "@/components/countup-value";
import VisitOptions from "./visit-options";

const VisitDetails = () => {
  return (
    <div className="mx-3 mt-5 grid grid-cols-1 gap-3 rounded-xl bg-white px-3 shadow-md @md:grid-cols-3 dark:bg-dark">
      <div className="relative h-32 ps-3 pt-5 after:absolute after:bottom-0 after:left-[50%] after:h-0 after:w-[80%] after:translate-x-[-50%] after:border after:border-zinc-200 @md:after:left-auto @md:after:right-0 @md:after:top-[50%] @md:after:h-[80%] @md:after:w-0 @md:after:translate-y-[-50%] dark:after:border-zinc-700">
        <div className="flex items-center justify-between">
          <h1 className="font-medium uppercase text-muted-foreground">
            Unique Visitors
          </h1>
          <VisitOptions />
        </div>
        <h2 className="text-lg font-semibold">
          <CountUpValue value={5264} />
        </h2>
        <span className="text-xs text-muted-foreground">Today</span>
      </div>
      <div className="relative h-32 ps-3 pt-5 after:absolute after:bottom-0 after:left-[50%] after:h-0 after:w-[80%] after:translate-x-[-50%] after:border after:border-zinc-200 @md:after:left-auto @md:after:right-0 @md:after:top-[50%] @md:after:h-[80%] @md:after:w-0 @md:after:translate-y-[-50%] dark:after:border-zinc-700">
        <div className="flex items-center justify-between">
          <h1 className="font-medium uppercase text-muted-foreground">
            Total Visit
          </h1>
          <VisitOptions />
        </div>
        <h2 className="text-lg font-semibold">
          <CountUpValue value={10937} />
        </h2>
        <span className="text-xs text-muted-foreground">Today</span>
      </div>
      <div className="h-32 ps-3 pt-5">
        <div className="flex items-center justify-between">
          <h1 className="font-medium uppercase text-muted-foreground">
            Bounce Rate
          </h1>
          <VisitOptions />
        </div>
        <h2 className="text-lg font-semibold">
          <CountUpValue value={60} />%
        </h2>
        <span className="text-xs text-muted-foreground">Today</span>
      </div>
    </div>
  );
};

export default VisitDetails;
