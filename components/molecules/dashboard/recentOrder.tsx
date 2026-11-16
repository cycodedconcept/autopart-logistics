import { CalendarDays, ChevronDown } from "lucide-react";
import filter from "@/public/images/filter2.png";
import sort from "@/public/images/sort.png";
import Image from "next/image";

const RecentOrder = () => {
  const users = [
    {
      id: 1,
      shipment_id: "#SHP00123",
      courier: "Segun Adeyemi",
      departure_time: "09:15 AM",
      destination: "Lagos",
      eta: "2 Days",
      status: "in transit",
    },
    {
      id: 2,
      shipment_id: "#SHP00124",
      courier: "Segun Adeyemi",
      departure_time: "09:15 AM",
      destination: "Lagos",
      eta: "2 Days",
      status: "delivered",
    },
    {
      id: 3,
      shipment_id: "#SHP00123",
      courier: "Segun Adeyemi",
      departure_time: "09:15 AM",
      destination: "Lagos",
      eta: "2 Days",
      status: "pending",
    },
    {
      id: 4,
      shipment_id: "#SHP00123",
      courier: "Segun Adeyemi",
      departure_time: "09:15 AM",
      destination: "Lagos",
      eta: "2 Days",
      status: "failed",
    },
    {
      id: 5,
      shipment_id: "#SHP00123",
      courier: "Segun Adeyemi",
      departure_time: "09:15 AM",
      destination: "Lagos",
      eta: "2 Days",
      status: "returned",
    },
    {
      id: 6,
      shipment_id: "#SHP00123",
      courier: "Segun Adeyemi",
      departure_time: "09:15 AM",
      destination: "Lagos",
      eta: "2 Days",
      status: "cancelled",
    },
  ];
  const getStatus = (status: string) => {
    const inTransit = "bg-aorange";
    const delivered = "bg-agreen";
    const pending = "bg-ayellow";
    const failed = "bg-apurple";
    const cancel = "bg-ared";
    return status === "in transit"
      ? inTransit
      : status === "pending"
        ? pending
        : status === "failed"
          ? failed
          : status === "cancelled"
            ? cancel
            : delivered;
  };
  return (
    <div className="lg:w-4/6 border border-agray-border bg-white rounded-2xl p-4 max-h-125 overflow-y-auto">
      <p className="font-medium text-dark-gray pb-4">Recent Order Activity</p>
      {/* upper part of the table */}
      <section className="flex justify-between gap-2 xl:gap-0 text-dark-gray text-sm flex-col lg:flex-row">
        <div className=" flex  gap-2 items-center">
          <div className="relative w-fit">
            <ChevronDown size={17} className="absolute top-3.5 right-4" />
            <select className="text-dark-gray">
              <option>Last 7 Days</option>
            </select>
          </div>
          <div className="relative w-fit">
            <ChevronDown size={17} className="absolute top-3.5 right-3" />
            <CalendarDays size={15} className="absolute top-3.5 left-3" />
            <select id="order-cal" className="text-dark-gray">
              <option>1 Jan - 7 Jan</option>
            </select>
          </div>
        </div>
        <div className=" flex gap-2 items-center">
          <div className="flex w-20 items-center gap-2 border border-agray-border rounded-lg px-3 py-2">
            <Image src={filter} alt="" className="w-4" />
            <span>Filter</span>
          </div>
          <div className="flex w-[6.2rem] lg:w-[5.7rem] xl:w-[6.2rem] items-center gap-1 border border-agray-border rounded-lg px-3 lg:px-2 xl:px-3 py-2">
            <Image src={sort} alt="" className="w-5" />
            <span>Sort By</span>
          </div>
        </div>
      </section>
<div className="w-full">

      <div className="w-full mt-4 rounded-lg border border-agray-border overflow-x-auto min-w-xl">
        <table className="w-full border-separate border-spacing-0">
          <thead className="bg-background">
            <tr className="text-light-gray text-sm">
              <th className="py-3 border-b border-agray-border">
                <span className="block mx-2 rounded w-4 h-4 bg-white border border-agray-border m-auto" ></span>
              </th>
              <th className="text-left font-normal py-3 border-b border-agray-border">
                Shipment ID
              </th>
              <th className="text-left font-normal py-3 border-b border-agray-border">
                Courier
              </th>
              <th className="text-left font-normal py-3 border-b border-agray-border">
                Departure Time
              </th>
              <th className="text-left font-normal py-3 border-b border-agray-border">
                Destination
              </th>
              <th className="text-left font-normal py-3 border-b border-agray-border">
                ETA
              </th>
              <th className="text-left font-normal py-3 border-b border-agray-border">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((each, index) => {
              const isLast = index === users.length - 1;
              const cellClass = `py-2 text-dark-gray text-sm ${!isLast ? "border-b border-agray-border" : ""}`;

              return (
                <tr key={each.id}>
                  <td className={cellClass}>
                    <span className="block mx-2 w-4 h-4 bg-white border border-agray-border rounded m-auto"></span>
                  </td>
                  <td className={cellClass}>{each.shipment_id}</td>
                  <td className={cellClass}>{each.courier}</td>
                  <td className={cellClass}>{each.departure_time}</td>
                  <td className={cellClass}>{each.destination}</td>
                  <td className={cellClass}>{each.eta}</td>
                  <td className={cellClass}>
                    <span
                      className={`capitalize text-white py-2 rounded font-medium block w-full px-1 xl:w-11/12 2xl:w-4/5 text-center ${getStatus(each.status)}`}
                    >
                      {each.status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
</div>
    </div>
  );
};

export default RecentOrder;
