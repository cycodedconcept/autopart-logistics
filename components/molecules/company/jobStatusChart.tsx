"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { JobStatusSlice } from "@/types/company";

const JobStatusChart: React.FC<{ data: JobStatusSlice[] }> = ({ data }) => {
  return (
    <div className="flex h-full flex-col rounded-xl border border-alight-gray-border bg-white p-4">
      <h3 className="text-sm font-semibold text-dark-gray">Job Status</h3>
      <p className="text-xs text-agray">All jobs by status</p>

      <div className="mx-auto my-4 size-36">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="label"
              innerRadius="62%"
              outerRadius="100%"
              paddingAngle={2}
              stroke="none"
            >
              {data.map((slice) => (
                <Cell key={slice.label} fill={slice.color} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ borderRadius: 8, borderColor: "#EDEDED", fontSize: 12 }} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <ul className="mt-auto space-y-2">
        {data.map((slice) => (
          <li key={slice.label} className="flex items-center justify-between text-xs">
            <span className="flex items-center gap-2 text-light-gray">
              <span className="size-2 rounded-full" style={{ backgroundColor: slice.color }} />
              {slice.label}
            </span>
            <span className="font-semibold text-dark-gray">{slice.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobStatusChart;
