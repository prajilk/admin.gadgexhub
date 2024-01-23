"use client";

import { Card, CardBody } from "@nextui-org/react";
import MarqueeOffersTable from "./tables/marquee-offers-table";
import { MarqueeOffers } from "@prisma/client";
import CreateOffers from "../dialog/marquee-offers/create-offers";
import { useState } from "react";

const MarqueeOffers = ({ offers }: { offers: MarqueeOffers[] }) => {
  const [offersData, setOffersData] = useState<MarqueeOffers[] | null>(offers);

  return (
    <Card className="my-5 shadow-md @container">
      <CardBody>
        <div className="mb-4 flex items-center justify-between">
          <h1 className="font-medium md:text-lg">Marquee Offers</h1>
          <CreateOffers setOffersData={setOffersData} />
        </div>
        <MarqueeOffersTable data={offersData} setOffersData={setOffersData} />
      </CardBody>
    </Card>
  );
};

export default MarqueeOffers;
