import StatCard from "@/components/molecules/dashboard/statCard";
import { Ellipsis, Globe2, Package, RotateCcw, Truck } from "lucide-react";
import statpack from "@/public/images/statpack.png";
import stathouse from "@/public/images/stathouse.png";
import statcube from "@/public/images/statcube.png";
import statworld from "@/public/images/statworld.png";
import ShipmentChart from "@/components/molecules/dashboard/chart";
import RecentOrder from "@/components/molecules/dashboard/recentOrder";
import Image from "next/image";
import profpix from "@/public/images/profpix.png";

const Dashboard = () => {
  const people = [
    {
      id: "1",
      name: "Ethan Ramirez",
      points: 2330,
    },
    {
      id: "2",
      name: "Liam Chen",
      points: 2330,
    },
    {
      id: "3",
      name: "Maya Thompsoncccccccc",
      points: 2330,
    },
    
    
  ];
  return (
    <div>
      <div className="flex flex-col lg:flex-row pt-4 gap-4">
        <div className="w-full grid grid-cols-1 sm:grid-cols-2  gap-4">
          <StatCard
            icon={statpack}
            title="Total Shipments"
            value="6,986"
            unit="Shipments"
            trend={{ direction: "up", value: "45%" }}
            caption="Compared to last month"
            highlighted
          />

          <StatCard
            icon={stathouse}
            title="Delayed Shipments"
            value="1,235"
            unit="Shipments Delayed"
            trend={{ direction: "down", value: "25%" }}
            caption="Compared to last month"
            accent="orange"
          />
          <StatCard
            icon={statworld}
            title="Total Destinations"
            value="946"
            unit="Destinations"
            trend={{ direction: "up", value: "45%" }}
            caption="Compared to last month"
            accent="blue"
          />
          <StatCard
            icon={statcube}
            title="Returned Packages"
            value="219"
            unit="Returned Packages"
            trend={{ direction: "down", value: "15%" }}
            caption="Compared to last month"
            accent="purple"
          />
        </div>
        <div className="lg:w-[35%] xl:w-[55%]">
          <ShipmentChart trend={{ value: 7320, percent: 45 }} />
        </div>
      </div>

      <div className="pt-5 flex flex-col lg:flex-row w-full gap-3">
        <RecentOrder />
        <div className="lg:w-2/6 border border-agray-border bg-white rounded-2xl py-4 my-2 lg:my-0 px-3 max-h-124 overflow-y-auto">
          <div className="flex justify-between ">
            <span className="font-medium text-dark-gray pb-4">
              Weekly Top Driver
            </span>
            <Ellipsis size={20} />
          </div>
          <div>
            {people.map((each) => {
              return (
                <div key={each.id} className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-2">
                    <Image src={profpix} alt="" className="w-14" />
                    <p className="truncate text-ellipsis w-full lg:max-w-20 xl:max-w-sm text-dark-gray font-medium">{each.name}</p>
                  </div>

                  <p className="w-24 text-right text-agray text-sm">{each.points}{" "}
                    <span>points</span>
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
