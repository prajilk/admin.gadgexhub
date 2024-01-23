import DeviceOrigin from "@/components/dashboard/device-origin/device-origin";
import TopPages from "@/components/dashboard/top-pages";
import TopSources from "@/components/dashboard/top-sources";
import TopStateBySales from "@/components/dashboard/top-state-by-sales";
import VisitDetails from "@/components/dashboard/visit-details/visit-details";
import Nav from "@/components/nav/nav";

const SiteTraffic = () => {
  return (
    <Nav>
      <div className="@container">
        <h1 className="text-zinc-400 md:text-xl">Traffic</h1>
        <VisitDetails />
        <div className="my-10 grid grid-cols-1 px-3 @3xl:grid-cols-2 md:gap-3">
          <TopSources />
          <TopPages />
        </div>
        <div className="my-10 grid grid-cols-1 px-3 @3xl:grid-cols-2 md:gap-3">
          <TopStateBySales />
          <DeviceOrigin />
        </div>
      </div>
    </Nav>
  );
};

export default SiteTraffic;
