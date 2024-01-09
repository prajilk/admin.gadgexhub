import Tabs from "@/components/customers/tabs";
import Nav from "@/components/nav/nav";
import { dehydrate } from "@tanstack/query-core";
import Hydrate from "@/lib/query-utils/hydrate-client";
import { QueryClient } from "@tanstack/react-query";
import { getGuestUsersServer } from "@/lib/api/customers/get-guest-users";
import CustomersTable from "@/components/customers/tables/customers";
import GuestUsersTable from "@/components/customers/tables/guest-users";
import { getCustomersServer } from "@/lib/api/customers/get-customers";

const Customers = async () => {
  const guestQueryClient = new QueryClient();
  await guestQueryClient.prefetchQuery({
    queryKey: ["guest-users"],
    queryFn: getGuestUsersServer,
  });
  const guestDehydratedState = dehydrate(guestQueryClient);

  const customersQueryClient = new QueryClient();
  await customersQueryClient.prefetchQuery({
    queryKey: ["customers"],
    queryFn: getCustomersServer,
  });
  const customersHydratedState = dehydrate(customersQueryClient);

  return (
    <Nav>
      <Tabs>
        <Hydrate state={customersHydratedState}>
          <CustomersTable />
        </Hydrate>
        <Hydrate state={guestDehydratedState}>
          <GuestUsersTable />
        </Hydrate>
      </Tabs>
    </Nav>
  );
};

export default Customers;
