import { Loader2 } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="space-y-2 rounded-lg bg-white p-5 shadow-lg dark:bg-dark">
        <Loader2 className="mx-auto animate-spin text-primary" size={30} />
      </div>
    </div>
  );
};

export default Loading;
