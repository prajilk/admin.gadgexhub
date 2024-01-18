import { productOrders } from "@/lib/data";
import Orders from "./graph/orders";
import OrdersSummary from "./graph/orders-summary";

const Analytics = () => {
  return (
    <div className="@container">
      <div className="mt-5 grid grid-cols-1 @3xl:grid-cols-3 md:gap-3">
        <Orders data={productOrders} />
        <OrdersSummary />
      </div>
    </div>
  );
};

export default Analytics;
