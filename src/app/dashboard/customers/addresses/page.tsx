import Nav from "@/components/nav/nav";
import { dehydrate } from "@tanstack/query-core";
import Hydrate from "@/lib/query-utils/hydrate-client";
import { QueryClient } from "@tanstack/react-query";
import AddressTable from "@/components/customers/tables/address-table";
import { getAddressesServer } from "@/lib/api/get-addresses";

const page = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["addresses"],
    queryFn: getAddressesServer,
  });
  const dehydratedState = dehydrate(queryClient);
  return (
    <Nav>
      <h1 className="text-xl text-zinc-400">All Addresses</h1>
      <Hydrate state={dehydratedState}>
        <AddressTable />
      </Hydrate>
    </Nav>
  );
};

export default page;
