import { Package, Truck, Globe2, RotateCcw, ArrowUp, ArrowDown } from "lucide-react";

function StatCard({
  icon: Icon = Package,
  title = "Total Shipments",
  value = "6,986",
  unit = "Shipments",
  trend = { direction: "up", value: "45%" },
  caption = "Compared to last month",
  highlighted = false,
  accent = "orange",
}) {
  const isUp = trend.direction === "up";

  const accentMap = {
    orange: { bg: "bg-orange-100", text: "text-orange-500" },
    blue: { bg: "bg-blue-100", text: "text-blue-500" },
    teal: { bg: "bg-teal-100", text: "text-teal-500" },
    purple: { bg: "bg-purple-100", text: "text-purple-500" },
  };
  const iconColors = accentMap[accent  as keyof typeof accentMap] ?? accentMap.orange;

  return (
    <div
      className={[
        "rounded-2xl p-6 w-full max-w-xs shadow-sm border",
        highlighted
          ? "bg-orange-500 border-orange-500 text-white"
          : "bg-white border-gray-100 text-gray-900",
      ].join(" ")}
    >
      {/* Icon */}
      <div
        className={[
          "w-10 h-10 rounded-xl flex items-center justify-center mb-4",
          highlighted ? "bg-white/20" : iconColors.bg,
        ].join(" ")}
      >
        <Icon
          size={20}
          strokeWidth={2}
          className={highlighted ? "text-white" : iconColors.text}
        />
      </div>

      {/* Title */}
      <div
        className={[
          "text-sm font-medium mb-2",
          highlighted ? "text-white/90" : "text-gray-500",
        ].join(" ")}
      >
        {title}
      </div>

      {/* Value + unit */}
      <div className="flex items-baseline gap-2 mb-3">
        <span className="text-3xl font-semibold tracking-tight">{value}</span>
        <span
          className={[
            "text-sm font-medium",
            highlighted ? "text-white/80" : "text-gray-400",
          ].join(" ")}
        >
          {unit}
        </span>
      </div>

      {/* Trend + caption */}
      <div className="flex items-center gap-2 flex-wrap">
        <span
          className={[
            "inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full",
            highlighted
              ? "bg-white/20 text-white"
              : isUp
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-red-500",
          ].join(" ")}
        >
          {isUp ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
          {trend.value}
        </span>
        <span
          className={[
            "text-xs",
            highlighted ? "text-white/80" : "text-gray-400",
          ].join(" ")}
        >
          {caption}
        </span>
      </div>
    </div>
  );
}

export default StatCard
// // Demo: the four dashboard cards as instances of the one component
// export default function DashboardCardsDemo() {
//   return (
//     <div className="bg-gray-50 min-h-screen p-8">
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
//         <StatCard
//           icon={Package}
//           title="Total Shipments"
//           value="6,986"
//           unit="Shipments"
//           trend={{ direction: "up", value: "45%" }}
//           caption="Compared to last month"
//           highlighted
//         />
//         <StatCard
//           icon={Truck}
//           title="Delayed Shipments"
//           value="1,235"
//           unit="Shipments Delayed"
//           trend={{ direction: "down", value: "25%" }}
//           caption="Compared to last month"
//           accent="orange"
//         />
//         <StatCard
//           icon={Globe2}
//           title="Total Destinations"
//           value="946"
//           unit="Destinations"
//           trend={{ direction: "up", value: "45%" }}
//           caption="Compared to last month"
//           accent="blue"
//         />
//         <StatCard
//           icon={RotateCcw}
//           title="Returned Packages"
//           value="219"
//           unit="Returned Packages"
//           trend={{ direction: "down", value: "15%" }}
//           caption="Compared to last month"
//           accent="purple"
//         />
//       </div>
//     </div>
//   );
// }