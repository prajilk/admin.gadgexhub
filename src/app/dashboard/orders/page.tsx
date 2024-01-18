import Nav from "@/components/nav/nav";
import OrdersPage from "@/components/orders/orders";
import Tabs from "@/components/orders/tabs";
import { getOrdersServer } from "@/lib/api/orders/get-orders";
import Hydrate from "@/lib/query-utils/hydrate-client";
import { QueryClient, dehydrate } from "@tanstack/react-query";

const Orders = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["orders"],
    queryFn: getOrdersServer,
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <Nav>
      <Tabs>
        <Hydrate state={dehydratedState}>
          <OrdersPage />
        </Hydrate>
      </Tabs>
    </Nav>
  );
};

export default Orders;
