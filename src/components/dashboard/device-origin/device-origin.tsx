import { Card, CardBody } from "@nextui-org/react";
import DeviceOriginGraph from "./device-origin-graph";

const DeviceOrigin = () => {
  return (
    <Card className="mt-5 shadow-md md:mt-0">
      <CardBody>
        <h1 className="mx-2 mt-2 text-lg font-medium">
          Device Origin Insights
        </h1>
        <DeviceOriginGraph />
      </CardBody>
    </Card>
  );
};

export default DeviceOrigin;
