"use client";
import CurrencyFormat from "@/components/atoms/currencyFormat";
import { ArrowDown, ArrowUp, ChevronDown } from "lucide-react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);
interface Trend {
  value: number;
  percent: number;
}
const ShipmentChart = ({ trend }: { trend: Trend }) => {
  const isUp = trend.percent > 30;
  const data = {
    labels: ["Delivered", "In Transit", "Returned"],
    datasets: [
      {
        data: [6, 3, 1],
        backgroundColor: ["#17B26A", "#FDB022", "#F04438"],
        borderWidth: 0,
        borderRadius: 4, // Curves the edges
        spacing: 5,
      },
    ],
  };

  const options = {
    rotation: -90, // Start the circle from the left side (-90 degrees)
    circumference: 180, // Cut the circle in half (180 degrees)
    cutout: "60%", // Controls the thickness of the doughnut ring
    plugins: {
      legend: {
        display: false,
        // position: "top",
      },
    },
    aspectRatio: 2, // Makes the container fit a half-circle perfectly without extra whitespace
  };
  return (
    <div className="rounded-2xl px-4 pt-4 w-full h-full border bg-white border-alight-gray-border flex flex-col">
      <div className="grid grid-cols-2">
        <h3 className="font-medium text-dark-gray">Shipment Status</h3>
        <div className="relative ml-auto w-fit">
          <ChevronDown size={17} className="absolute top-3.5 right-4" />
          <select className="text-light-gray">
            <option>Monthly</option>
            <option>Yearly</option>
          </select>
        </div>
      </div>
      <div className="flex items-center pt-4 justify-between gap-2">
        <span className="text-dark-gray text-[32px] font-medium font-instrument-sans">
          {CurrencyFormat().format(trend.value)}K
        </span>
        <span
          className={[
            "inline-flex items-center gap-1 text-sm font-medium px-2 py-1 rounded-full",
            isUp ? "bg-light-green text-white" : "bg-light-red text-white",
          ].join(" ")}
        >
          {trend.percent}%
          {isUp ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
        </span>
      </div>

      <p className="text-agray text-sm max-sm">
        The total shipment value this month increased by{" "}
        {CurrencyFormat().format(1540)} compared to last month.
      </p>

      <div className="w-full mt-auto max-w-75 2xl:max-w-100 mx-auto" >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "8px",
            marginTop: "16px",
            
          }}
        >
          {data.labels.map((label, index) => (
            <div key={label} className="flex w-full justify-between">
              <div
                className=""
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                {/* The Dot */}
                <span
                  style={{
                    width: "15px",
                    height: "15px",
                    backgroundColor: data.datasets[0].backgroundColor[index],
                    borderRadius: "50%",
                    display: "inline-block",
                  }}
                />
                {/* The Label Text */}
                <span
                  style={{
                    fontSize: "16px",
                    fontWeight: 500,
                    fontFamily: "inter",
                    color: "#151515",
                  }}
                >
                  {label}
                </span>
              </div>
              <div className="text-right text-agray">
                <span>
                  {CurrencyFormat().format(data.datasets[0].data[index])} (
                  {data.datasets[0].data[index]}%)
                </span>
              </div>
            </div>
          ))}
        </div>
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
};

export default ShipmentChart;
