import Nav from "@/components/nav/nav";
import BestDeals from "@/components/offers/best-deals";
import HeroBanners from "@/components/offers/hero-banners";
import MarqueeOffers from "@/components/offers/marquee-offers";
import { getDealsAndOffers } from "@/lib/api/get-deals-and-offers";

const Offers = async () => {
  const data = await getDealsAndOffers();

  return (
    <Nav>
      <h1 className="text-zinc-400 md:text-xl">Best Deals & Offers</h1>
      <BestDeals deal={data.deal} />
      <MarqueeOffers offers={data.offers} />
      <HeroBanners banners={data.banners} />
    </Nav>
  );
};

export default Offers;
