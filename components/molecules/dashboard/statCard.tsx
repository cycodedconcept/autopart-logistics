import { StatType } from "@/types/stattype";
import {  ArrowUp, ArrowDown } from "lucide-react";
import Image from "next/image";

function StatCard({
  icon,
  title = "Total Shipments",
  value = "6,986",
  unit = "Shipments",
  trend = { direction: "up", value: "45%" },
  caption = "Compared to last month",
  highlighted = false,
  accent = "orange",
}: StatType) {
  const isUp = trend.direction === "up";

  const accentMap = {
    orange: { bg: "bg-orange-100", text: "text-orange-500" },
    blue: { bg: "bg-blue-100", text: "text-blue-500" },
    teal: { bg: "bg-teal-100", text: "text-teal-500" },
    purple: { bg: "bg-purple-100", text: "text-purple-500" },
  };
  const iconColors =
    accentMap[accent as keyof typeof accentMap] ?? accentMap.orange;

  return (
    <div
      className={[
        "rounded-[20px] px-4 py-6 2xl:px-6 w-full flex flex-col max-w-xs border",
        highlighted
          ? "bg-aorange border-aorange text-white"
          : "bg-white border-alight-gray-border",
      ].join(" ")}
    >
      {/* Icon */}
      <div className="flex items-center gap-2 mb-4">
        <div
          className={[
            "w-10 h-10 rounded-full flex items-center justify-center ",
            highlighted ? "bg-[#FBFBFE]" : "bg-aorange",
          ].join(" ")}
        >
          <Image src={icon} alt="" className="w-6" />
        </div>

        {/* Title */}
        <div
          className={[
            "text-lg font-medium  font-instrument-sans",
            highlighted ? "text-[#F5F5F5]" : "text-dark-gray",
          ].join(" ")}
        >
          {title}
        </div>
      </div>

      {/* Value + unit */}
      <div className="flex items-baseline gap-2 mb-3 font-instrument-sans">
        <span
          className={`text-[40px] font-medium ${highlighted ? "text-white" : "text-dark-gray"}`}
        >
          {value}
        </span>
        <span
          className={[
            "text-lg font-medium",
            highlighted ? "text-white" : "text-light-gray",
          ].join(" ")}
        >
          {unit}
        </span>
      </div>

      {/* Trend + caption */}
      <div className="flex items-center gap-2 mt-auto ">
        <span
          className={[
            "inline-flex items-center gap-1 text-sm font-medium px-2 py-1 rounded-full",
            isUp ? "bg-light-green text-white" : "bg-light-red text-white",
          ].join(" ")}
        >
          {trend.value}
          {isUp ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
        </span>
        <span
          className={[
            "text-xs",
            highlighted ? "text-[#F7F7F7]" : "text-dark-gray",
          ].join(" ")}
        >
          {caption}
        </span>
      </div>
    </div>
  );
}

export default StatCard;

