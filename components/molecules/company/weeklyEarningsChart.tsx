"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";
import CurrencyFormat from "@/components/atoms/currencyFormat";
import { EarningsPoint } from "@/types/company";

const WeeklyEarningsChart: React.FC<{ data: EarningsPoint[] }> = ({ data }) => {
  return (
    <div className="flex h-full flex-col rounded-xl border border-alight-gray-border bg-white p-4">
      <h3 className="text-sm font-semibold text-dark-gray">Weekly Earnings</h3>
      <p className="text-xs text-agray">Delivery fees from completed jobs · last 7 days</p>

      <div className="mt-4 h-52 flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 8, right: 8, left: 8, bottom: 0 }}>
            <defs>
              <linearGradient id="earningsFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ff7101" stopOpacity={0.25} />
                <stop offset="100%" stopColor="#ff7101" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="#EDEDED" />
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              interval={0}
              padding={{ left: 12, right: 12 }}
              tick={{ fontSize: 11, fill: "#A5A5A5" }}
            />
            <Tooltip
              formatter={(value) => [CurrencyFormat().format(Number(value)), "Earnings"]}
              contentStyle={{ borderRadius: 8, borderColor: "#EDEDED", fontSize: 12 }}
            />
            <Area
              type="monotone"
              dataKey="amount"
              stroke="#ff7101"
              strokeWidth={2}
              fill="url(#earningsFill)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default WeeklyEarningsChart;
