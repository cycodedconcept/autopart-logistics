import { ArrowDown, ArrowUp } from "lucide-react";
import React, { useMemo, useState } from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";


const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const TIMES = ["07:00", "09:00", "11:00", "13:00", "15:00", "17:00", "19:00"];

const SHADES = ["#EAF6DE", "#D3ECB4", "#B7DD7C", "#8FC93D", "#5FA623"];

function shadeFor(value) {
  const idx = Math.min(SHADES.length - 1, Math.floor(value * SHADES.length));
  return SHADES[idx];
}

function seededRandom(seed) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

function generateDefaultPoints() {
  const rand = seededRandom(42);
  const points = [];
  TIMES.forEach((t) => {
    DAYS.forEach((d) => {
      points.push({ day: d, time: t, value: Math.round(rand() * 100) / 100 });
    });
  });
  return points;
}

// Custom square shape for each cell — Recharts calls this per data point
function CellShape(props) {
  const { cx, cy, payload, size } = props;
  const side = Math.sqrt(size) * 1.6; // scale ZAxis "size" into a pixel square
  return (
    <rect
      x={cx - side / 2}
      y={cy - side / 2}
      width={side}
      height={side}
      rx={2}
      fill={shadeFor(payload.value)}
    />
  );
}

function CustomTooltip({ active, payload }) {
  if (!active || !payload || !payload.length) return null;
  const p = payload[0].payload;
  return (
    <div
      style={{
        background: "#1A1D1F",
        color: "#fff",
        padding: "6px 10px",
        borderRadius: 8,
        fontSize: 12,
      }}
    >
      {p.day} {p.time} — {Math.round(p.value * 100)}% attendance
    </div>
  );
}

export default function AttendanceOverviewRecharts({
  data,
  attendanceRate = 98.3,
  changePercent = 45,
  subtitle = "of employee is attend to work this month!",
}) {
  const points = useMemo(() => data || generateDefaultPoints(), [data]);
  // Constant "size" so every square renders the same dimensions
  const withSize = points.map((p) => ({ ...p, size: 400 }));
  const isUp = true

  return (
    <div
       
      className="p-4 bg-white border border-agray-border rounded-2xl"
    >
      {/* Header */}
      <div
       
      >
        <h2 className="font-medium text-dark-gray">
          Attendance Overview
        </h2>
        
      </div>

      {/* Stat row */}
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
      <p style={{ margin: "6px 0 20px", fontSize: 14, color: "#6F767E" }}>{subtitle}</p>

      {/* Heatmap */}
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <ScatterChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
            <XAxis
              type="category"
              dataKey="day"
              allowDuplicatedCategory={false}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 13, fill: "#6F767E" }}
              padding={{ left: 0, right: 0 }}
            />
            <YAxis
              type="category"
              dataKey="time"
              allowDuplicatedCategory={false}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 12, fill: "#9A9FA5" }}
              width={"auto"}
            />
            <ZAxis dataKey="size" range={[400, 400]} />
            <Tooltip cursor={false} content={<CustomTooltip />} />
            <Scatter data={withSize} shape={<CellShape />} />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}