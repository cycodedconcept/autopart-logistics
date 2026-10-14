"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Avatar from "@/components/atoms/avatar";
import CurrencyFormat from "@/components/atoms/currencyFormat";
import { Rider } from "@/types/company";

const PAGE_SIZE = 5;

const RANK_STYLES: Record<number, string> = {
  1: "bg-aorange text-white",
  2: "bg-dark-gray text-white",
  3: "bg-abrown text-white",
};

const TopRidersTable: React.FC<{ riders: Rider[] }> = ({ riders }) => {
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(riders.length / PAGE_SIZE));
  const start = (page - 1) * PAGE_SIZE;
  const visible = riders.slice(start, start + PAGE_SIZE);

  return (
    <div className="rounded-xl border border-alight-gray-border bg-white p-4">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-sm font-semibold text-dark-gray">
            Top Riders Today
          </h3>
          <p className="text-xs text-agray">
            {riders.length} riders · ranked by deliveries
          </p>
        </div>
        <Link
          href="/company/riders"
          className="flex items-center gap-0.5 text-xs font-medium text-aorange"
        >
          View all <ChevronRight size={14} />
        </Link>
      </div>

      <div className="relative mt-4 overflow-x-auto">
        <table className="w-full min-w-140 text-left text-sm">
          <thead>
            <tr className="border-b border-alight-gray-border text-xs text-agray">
              <th className="py-2 font-medium w-10">#</th>
              <th className="py-2 font-medium">Rider</th>
              <th className="py-2 font-medium">Jobs</th>
              <th className="py-2 font-medium">Delivered</th>
              <th className="py-2 font-medium">Success Rate</th>
              <th className="py-2 font-medium">Earnings Today</th>
            </tr>
          </thead>
          <tbody>
            {visible.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="py-10 text-center text-sm text-agray"
                >
                  No rider activity yet.
                </td>
              </tr>
            )}
            {visible.map((rider, i) => {
              const rank = start + i + 1;
              const successRate = Math.round(
                (rider.delivered / rider.jobs) * 100,
              );
              return (
                <tr
                  key={rider.id}
                  className="border-b border-alight-gray-border last:border-0"
                >
                  <td className="py-3">
                    <span
                      className={`flex items-center justify-center size-5 rounded-full text-[10px] font-semibold ${
                        RANK_STYLES[rank] ?? "text-light-gray"
                      }`}
                    >
                      {rank}
                    </span>
                  </td>
                  <td className="py-3">
                    <span className="flex items-center gap-2.5">
                      <Avatar name={rider.name} size="sm" />
                      <span className="font-medium text-dark-gray">
                        {rider.name}
                      </span>
                    </span>
                  </td>
                  <td className="py-3 text-light-gray">{rider.jobs}</td>
                  <td className="py-3 text-light-gray">{rider.delivered}</td>
                  <td className="py-3 font-medium text-agreen">
                    {successRate ? successRate : 0}%
                  </td>
                  <td className="py-3 font-medium text-aorange">
                    {CurrencyFormat().format(rider.earnings)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-agray">
        <p>
          Showing {visible.length ? start + 1 : 0}–{start + visible.length} of{" "}
          {riders.length}
        </p>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setPage((p) => p - 1)}
            disabled={page === 1}
            className="flex items-center gap-0.5 px-2 py-1 disabled:opacity-40"
          >
            <ChevronLeft size={14} /> Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setPage(n)}
              aria-current={n === page ? "page" : undefined}
              className={`size-6 rounded-md font-medium ${
                n === page
                  ? "bg-aorange text-white"
                  : "text-dark-gray hover:bg-background"
              }`}
            >
              {n}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setPage((p) => p + 1)}
            disabled={page === totalPages}
            className="flex items-center gap-0.5 px-2 py-1 disabled:opacity-40"
          >
            Next <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopRidersTable;
