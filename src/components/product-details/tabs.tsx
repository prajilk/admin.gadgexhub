"use client";

import { Button, Tabs as NextUITabs, Tab } from "@nextui-org/react";
import { BarChart3, Box, Pencil, Trash2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import Analytics from "./analytics";
import { Image, Product } from "@prisma/client";
import DeleteProduct from "../dialog/products/delete-product";

const Tabs = ({
  children,
  pid,
  product,
}: {
  children: React.ReactNode;
  pid: string;
  product: Product & { Image: Image[] };
}) => {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");
  const [selected, setSelected] = useState(tab || "product");

  useEffect(() => {
    setSelected(tab || "product");
  }, [tab]);

  return (
    <NextUITabs
      variant="underlined"
      aria-label="Product details"
      color="primary"
      className="max-w-full overflow-x-scroll md:overflow-hidden"
      selectedKey={selected}
    >
      <Tab
        key="product"
        as={Link}
        href={`/dashboard/products/${pid}`}
        title={
          <div className="flex items-center gap-2">
            <Box size={20} />
            <span>Product</span>
          </div>
        }
      >
        <div className="mb-5 flex items-center justify-between">
          <h1 className="my-5 text-xl text-zinc-400">Product Details</h1>
          <div className="flex items-center gap-3">
            <Button
              size="sm"
              startContent={<Pencil size={15} />}
              color="primary"
              as={Link}
              href={`/dashboard/products/edit?pid=${pid}`}
            >
              Edit Product
            </Button>
            <DeleteProduct id={pid}>
              {(onOpen) => (
                <Button
                  size="sm"
                  color="danger"
                  startContent={<Trash2 size={15} />}
                  onClick={onOpen}
                >
                  Delete Product
                </Button>
              )}
            </DeleteProduct>
          </div>
        </div>
        {children}
      </Tab>
      <Tab
        key="analytics"
        href={`/dashboard/products/${pid}?tab=analytics`}
        as={Link}
        title={
          <div className="flex items-center gap-2">
            <BarChart3 size={20} />
            <span>Analytics</span>
          </div>
        }
      >
        <Analytics product={product} />
      </Tab>
    </NextUITabs>
  );
};

export default Tabs;
