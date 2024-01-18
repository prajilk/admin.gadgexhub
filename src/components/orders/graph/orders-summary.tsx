import { Card, CardBody } from "@nextui-org/react";
import OrdersSummaryGraph from "./orders-summary-graph";

const OrdersSummary = () => {
  return (
    <Card className="mt-5 shadow-md md:mt-0">
      <CardBody className="min-h-[400px]">
        <h1 className="mx-2 mt-2 text-lg font-medium">Orders Summary</h1>
        <OrdersSummaryGraph />
      </CardBody>
    </Card>
  );
};

export default OrdersSummary;
