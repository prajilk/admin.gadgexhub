import { useProducts } from "@/api-hooks/products/get-products";
import SummaryCard from "../dashboard/summary/summary-card";
import { ArchiveX, Boxes } from "lucide-react";

const Analytics = () => {
  const { data } = useProducts();

  return (
    <div className="mt-5 space-y-5 @container">
      <div className="grid grid-cols-1 gap-3 @sm:grid-cols-2 @lg:grid-cols-4">
        <SummaryCard
          bgcolor="bg-[#23B7E5]"
          color="text-[#23B7E5]"
          icon={Boxes}
          title="Total Products"
          value={data?.products.length || 0}
        />
        <SummaryCard
          bgcolor="bg-danger"
          color="text-danger"
          icon={ArchiveX}
          title="Stock out products"
          value={
            data?.products.filter((product) => product.stock === 0).length || 0
          }
        />
      </div>
    </div>
  );
};

export default Analytics;
