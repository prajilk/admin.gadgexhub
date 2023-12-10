import Tabs from "@/components/customers/tabs";
import Nav from "@/components/nav/nav";
import { dehydrate } from "@tanstack/query-core";
import Hydrate from "@/lib/query-utils/hydrate-client";
import { QueryClient } from "@tanstack/react-query";
import { getGuestUsersServer } from "@/lib/api/get-guest-users";
import GuestUsers from "@/components/customers/tables/guest-users";

const Customers = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["guest-users"],
    queryFn: getGuestUsersServer,
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <Nav>
      <div className="px-3">
        <Hydrate state={dehydratedState}>
          <Tabs />
        </Hydrate>
      </div>
    </Nav>
  );
};

export default Customers;
