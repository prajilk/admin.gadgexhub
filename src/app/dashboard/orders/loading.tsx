import { Card, CardBody } from "@nextui-org/react";
import { Loader2 } from "lucide-react";

const Loading = () => {
  return (
    <div className="fixed z-[9999] flex min-h-screen min-w-full items-center justify-center bg-black/50">
      <Card className="rounded-md">
        <CardBody>
          <Loader2 className="animate-spin" />
        </CardBody>
      </Card>
    </div>
  );
};

export default Loading;
