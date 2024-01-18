import { Card, CardBody } from "@nextui-org/react";
import OrderItemsTable from "./order-items-table";
import PriceDetails from "./price-details";
import { SingleOrder } from "@/lib/types/types";

const ProductDetails = ({ data }: { data: SingleOrder }) => {
  function calculateSubtotal() {
    return data.OrderItem.reduce((acc, curr) => curr.basePrice + acc, 0);
  }

  return (
    <Card className="mt-7 rounded-sm shadow-sm">
      <CardBody className="px-3 py-0">
        <OrderItemsTable data={data.OrderItem} />
        <hr />
        <PriceDetails total={data.total} subtotal={calculateSubtotal()} />
      </CardBody>
    </Card>
  );
};

export default ProductDetails;
