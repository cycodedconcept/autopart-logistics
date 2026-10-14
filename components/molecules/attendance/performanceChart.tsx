import { ArrowDown, ArrowUp } from "lucide-react";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface StaffData {
  day: string;
  performance: number;
}

interface StaffPerformanceChartProps {
  data?: StaffData[];
}

const PerformanceChart: React.FC<StaffPerformanceChartProps> = ({
  data = [
    { day: "Mon", performance: 8 },
    { day: "Tue", performance: 7 },
    { day: "Wed", performance: 9 },
    { day: "Thu", performance: 8 },
    { day: "Fri", performance: 7 },
    { day: "Sat", performance: 6 },
    { day: "Sun", performance: 5 },
  ],
}) => {
  const MAX_VALUE = 10;

  // Static total height (10) for the background track
  const chartData = data.map((item) => ({
    ...item,
    maxTrack: MAX_VALUE,
  }));

  const isUp = true;
  return (
    <div className="bg-white border border-agray-border rounded-2xl p-4 w-full">
      <div className="mb-4">
        <h3 className=" font-medium text-dark-gray">Staff Performance</h3>
      </div>

      {/* Pattern Definition */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <pattern
            id="whiteAndLemonOverlay"
            width="12"
            height="12"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(45)"
          >
            <rect width="6" height="12" fill="#ffffff" />
            <rect x="6" width="6" height="12" fill="#7ED321" />
          </pattern>
        </defs>
      </svg>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 0, left: -40, bottom: 0 }}
          /* Forces absolute centering alignment over each other */
          barCategoryGap="35%"
        >
          <CartesianGrid
            strokeDasharray="0"
            stroke="#f3f4f6"
            vertical={false}
            horizontal={false}
          />

          <XAxis
            dataKey="day"
            tick={{ fontSize: 13, fill: "#A5A5A5" }}
            axisLine={false}
            tickLine={false}
            tickMargin={10}

          />

          <YAxis
            domain={[0, MAX_VALUE]}
            ticks={[2, 4, 6, 8, 10]}
            tick={{ fontSize: 13, fill: "#A5A5A5" }}
            axisLine={false}
            tickLine={false}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              padding: "8px 12px",
            }}
            cursor={{ fill: "rgba(0, 0, 0, 0.02)" }}
          />

          {/* Layer 1 (Base): Full 0-10 solid Ash Gray bar */}
          <Bar
            xAxisId={0}
            dataKey="maxTrack"
            fill="#F6F6F7"
            radius={52}
            barSize={28}
            isAnimationActive={false}
            tooltipType="none"
          />

          {/* Layer 2 (Overlay): Placed directly over Layer 1 up to performance metric */}
          <Bar
            xAxisId={1}
            dataKey="performance"
            fill="url(#whiteAndLemonOverlay)"
            barSize={28}
            radius={[0, 0, 52, 52]}
            isAnimationActive={true}
          />
        </BarChart>
      </ResponsiveContainer>

      <div>
        <div className="flex items-center pt-2 justify-between gap-2">
          <span className="text-dark-gray text-[32px] font-medium font-instrument-sans">
            92/100
          </span>
          <span
            className={[
              "inline-flex items-center gap-1 text-sm font-medium px-2 py-1 rounded-full",
              isUp ? "bg-light-green text-white" : "bg-light-red text-white",
            ].join(" ")}
          >
            20%
            {isUp ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
          </span>
        </div>

        <p className="text-light-gray text-xs max-sm pt-1">
          You’re success to upgrade the staff performance by 3 points this
          month. Keep it up!
        </p>
      </div>
    </div>
  );
};

export default PerformanceChart;
