"use client";

import { Card, CardBody } from "@nextui-org/react";
import { HeroBanner } from "@prisma/client";
import { useState } from "react";
import HeroBannerTable from "./tables/hero-banner-table";

const HeroBanners = ({ banners }: { banners: HeroBanner[] }) => {
  const [bannerData, setBannerData] = useState<HeroBanner[] | null>(banners);
  return (
    <Card className="my-5 shadow-md @container">
      <CardBody className="[&>div]:gap-1">
        <HeroBannerTable data={bannerData} setBannerData={setBannerData} />
      </CardBody>
    </Card>
  );
};

export default HeroBanners;
