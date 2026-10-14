"use client";

import { useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatNaira, formatNairaCompact } from "@/lib/format";
import { EarningsSeriesPoint } from "@/types/company";

type Range = "week" | "month";

const RANGES: { key: Range; label: string }[] = [
  { key: "week", label: "Last 7 Days" },
  { key: "month", label: "Last 30 Days" },
];

const SERIES = [
  { key: "gross", label: "Delivery Fees", color: "#17b26a", fill: true },
  { key: "net", label: "Your Share", color: "#079455", fill: false },
] as const;

const EarningsChart: React.FC<{ data: Record<Range, EarningsSeriesPoint[]> }> = ({ data }) => {
  const [range, setRange] = useState<Range>("week");

  return (
    <div className="rounded-xl border border-alight-gray-border bg-white p-4">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <h3 className="text-sm font-semibold text-dark-gray">Earnings Over Time</h3>
          <p className="text-xs text-agray">Delivery fees vs your share, from completed jobs</p>
        </div>
        <div className="flex rounded-lg border border-alight-gray-border p-0.5">
          {RANGES.map(({ key, label }) => (
            <button
              key={key}
              type="button"
              onClick={() => setRange(key)}
              aria-pressed={range === key}
              className={`rounded-md px-2.5 py-1 text-xs font-medium ${
                range === key ? "bg-background text-dark-gray" : "text-agray hover:text-dark-gray"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 h-60">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data[range]} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="grossFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#17b26a" stopOpacity={0.2} />
                <stop offset="100%" stopColor="#17b26a" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="#EDEDED" />
            <XAxis
              dataKey="label"
              axisLine={false}
              tickLine={false}
              // 30 daily labels don't fit; show every 5th day for the month view
              interval={range === "month" ? 4 : 0}
              padding={{ left: 12, right: 12 }}
              tick={{ fontSize: 11, fill: "#A5A5A5" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              width={52}
              tickFormatter={(v) => formatNairaCompact(Number(v))}
              tick={{ fontSize: 11, fill: "#A5A5A5" }}
            />
            <Tooltip
              formatter={(value, name) => [
                formatNaira(Number(value)),
                SERIES.find((s) => s.key === name)?.label ?? name,
              ]}
              contentStyle={{ borderRadius: 8, borderColor: "#EDEDED", fontSize: 12 }}
            />
            {SERIES.map((s) => (
              <Area
                key={s.key}
                type="monotone"
                dataKey={s.key}
                stroke={s.color}
                strokeWidth={2}
                strokeDasharray={s.fill ? undefined : "4 4"}
                fill={s.fill ? "url(#grossFill)" : "transparent"}
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-2 flex justify-end gap-4 text-xs text-light-gray">
        {SERIES.map((s) => (
          <span key={s.key} className="flex items-center gap-1.5">
            <span
              className="h-0.5 w-4 rounded-full"
              style={{ backgroundColor: s.color, opacity: s.fill ? 1 : 0.6 }}
            />
            {s.label}
          </span>
        ))}
      </div>
    </div>
  );
};

export default EarningsChart;
