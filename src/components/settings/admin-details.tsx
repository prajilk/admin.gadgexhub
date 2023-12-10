import AdminTable from "./admin-table";
import { dehydrate } from "@tanstack/query-core";
import Hydrate from "@/lib/query-utils/hydrate-client";
import { QueryClient } from "@tanstack/react-query";
import { getAdminsServer } from "@/lib/api/get-admins";

const AdminDetails = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["admins"],
    queryFn: getAdminsServer,
  });
  const dehydratedState = dehydrate(queryClient);
  return (
    <>
      <h1 className="mt-6 text-xl font-medium text-zinc-400">Admins</h1>
      <Hydrate state={dehydratedState}>
        <AdminTable />
      </Hydrate>
    </>
  );
};

export default AdminDetails;
