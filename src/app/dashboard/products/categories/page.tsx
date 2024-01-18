import CategoriesTable from "@/components/categories/table";
import CreateCategory from "@/components/dialog/category/create-category";
import Nav from "@/components/nav/nav";
import { getCategoriesServer } from "@/lib/api/get-categories";
import Hydrate from "@/lib/query-utils/hydrate-client";
import { QueryClient, dehydrate } from "@tanstack/react-query";

const Categories = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["products", "categories"],
    queryFn: getCategoriesServer,
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <Nav>
      <div className="flex items-center justify-between">
        <h1 className="my-5 text-xl text-zinc-400">Categories</h1>
        <CreateCategory />
      </div>
      <Hydrate state={dehydratedState}>
        <CategoriesTable />
      </Hydrate>
    </Nav>
  );
};

export default Categories;
