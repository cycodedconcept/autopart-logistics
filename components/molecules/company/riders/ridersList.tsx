"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Plus, Search } from "lucide-react";
import Avatar from "@/components/atoms/avatar";
import CurrencyFormat from "@/components/atoms/currencyFormat";
import { performanceById, toRiderDetails } from "@/app/libs/mappers";
import { useAllRiders, useCompanyJobs } from "@/app/libs/queries";
import QueryState from "@/components/molecules/queryState";
import { RiderDetails, RiderStatus } from "@/types/company";
import CreateRiderModal from "./createRiderModal";
import RiderActionsMenu from "./riderActionsMenu";
import RiderStatusConfirm from "./riderStatusConfirm";
import StatusBadge from "./statusBadge";

const PAGE_SIZE = 8;
const HIGHLIGHT_MS = 6000;

const TABS: { key: RiderStatus | "all"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "active", label: "Active" },
  { key: "on_delivery", label: "On delivery" },
  { key: "offline", label: "Offline" },
  { key: "suspended", label: "Suspended" },
];

const RidersList = () => {
  const ridersQuery = useAllRiders();
  // Job counts and earnings per rider come from the jobs summary
  const { data: jobsData } = useCompanyJobs();
  const [newRiderId, setNewRiderId] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState<RiderStatus | "all">("all");
  const [page, setPage] = useState(1);
  const [createOpen, setCreateOpen] = useState(false);
  const [suspending, setSuspending] = useState<RiderDetails | null>(null);

  const riders = useMemo(() => {
    const perf = performanceById(jobsData?.summary?.riderPerformance.riders);
    return (ridersQuery.data?.riders ?? [])
      .map((r) => toRiderDetails(r, perf.get(r.id)))
      .sort((a, b) => Number(b.id) - Number(a.id));
  }, [ridersQuery.data, jobsData]);

  // Fade the "just created" highlight after a few seconds
  useEffect(() => {
    if (!newRiderId) return;
    const timer = setTimeout(() => setNewRiderId(null), HIGHLIGHT_MS);
    return () => clearTimeout(timer);
  }, [newRiderId]);

  const counts = useMemo(() => {
    const byStatus: Record<string, number> = { all: riders.length };
    riders.forEach((r) => (byStatus[r.status] = (byStatus[r.status] ?? 0) + 1));
    return byStatus;
  }, [riders]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return riders.filter(
      (r) =>
        (tab === "all" || r.status === tab) &&
        (!q || [r.name, r.code, r.phone, r.zone].some((v) => v.toLowerCase().includes(q)))
    );
  }, [riders, query, tab]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * PAGE_SIZE;
  const visible = filtered.slice(start, start + PAGE_SIZE);
  const onDuty = (counts.active ?? 0) + (counts.on_delivery ?? 0);

  return (
    <div className="space-y-4 p-4 lg:py-5 2xl:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="font-instrument-sans text-[22px] font-bold text-dark-gray">Riders</h1>
          <p className="text-[13px] text-subtitle-gray">
            {riders.length} riders · {onDuty} on duty
          </p>
        </div>
        <button
          type="button"
          onClick={() => setCreateOpen(true)}
          className="flex h-9 items-center gap-1.5 rounded-lg bg-aorange px-3.5 text-sm font-medium text-white hover:bg-orange-600"
        >
          <Plus size={16} /> Create Rider
        </button>
      </div>

      <QueryState
        isLoading={ridersQuery.isLoading}
        error={ridersQuery.error}
        onRetry={() => ridersQuery.refetch()}
      >
      <div className="rounded-xl border border-alight-gray-border bg-white p-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <label className="flex h-9 w-full items-center gap-2 rounded-lg border border-alight-gray-border bg-background px-3 focus-within:border-aorange md:max-w-64">
            <Search size={16} className="shrink-0 text-agray" />
            <input
              type="search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
              placeholder="Search riders..."
              className="w-full min-w-0 bg-transparent text-sm text-dark-gray outline-none placeholder:text-agray"
            />
          </label>

          <div role="tablist" className="flex gap-1.5 overflow-x-auto">
            {TABS.map(({ key, label }) => (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={tab === key}
                onClick={() => {
                  setTab(key);
                  setPage(1);
                }}
                className={`shrink-0 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                  tab === key
                    ? "bg-aorange text-white"
                    : "border border-alight-gray-border text-light-gray hover:text-dark-gray"
                }`}
              >
                {label} ({counts[key] ?? 0})
              </button>
            ))}
          </div>
        </div>

        <div className="relative mt-4 overflow-x-auto">
          <table className="w-full min-w-200 text-left text-sm">
            <thead>
              <tr className="border-b border-alight-gray-border text-xs text-agray">
                <th className="py-2 font-medium">Rider</th>
                <th className="py-2 font-medium">Phone</th>
                <th className="py-2 font-medium">Zone</th>
                <th className="py-2 font-medium">Vehicle</th>
                <th className="py-2 font-medium">Jobs</th>
                <th className="py-2 font-medium">Delivered</th>
                <th className="py-2 font-medium">Earnings</th>
                <th className="py-2 font-medium">Status</th>
                <th className="py-2 font-medium w-10">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {visible.map((rider) => (
                <tr
                  key={rider.id}
                  className={`border-b border-alight-gray-border last:border-0 transition-colors duration-700 ${
                    rider.id === newRiderId ? "bg-green-50" : ""
                  }`}
                >
                  <td className="py-3">
                    <Link
                      href={`/company/riders/${rider.id}`}
                      className="flex items-center gap-2.5 hover:underline"
                    >
                      <Avatar name={rider.name} src={rider.photo} size="sm" />
                      <span>
                        <span className="block font-medium text-dark-gray">{rider.name}</span>
                        <span className="block text-xs text-agray">{rider.code}</span>
                      </span>
                    </Link>
                  </td>
                  <td className="py-3 text-light-gray whitespace-nowrap">{rider.phone}</td>
                  <td className="py-3 text-light-gray">{rider.zone}</td>
                  <td className="py-3 text-light-gray">{rider.vehicle}</td>
                  <td className="py-3 text-light-gray">{rider.jobs}</td>
                  <td className="py-3 text-light-gray">{rider.delivered}</td>
                  <td className="py-3 font-medium text-aorange">
                    {CurrencyFormat().format(rider.earnings)}
                  </td>
                  <td className="py-3">
                    <StatusBadge status={rider.status} />
                  </td>
                  <td className="py-3">
                    <RiderActionsMenu rider={rider} onSuspend={() => setSuspending(rider)} />
                  </td>
                </tr>
              ))}
              {visible.length === 0 && (
                <tr>
                  <td colSpan={9} className="py-10 text-center text-sm text-agray">
                    {riders.length ? "No riders match your search." : "No riders yet. Create your first rider."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-agray">
          <p>
            Showing {filtered.length ? start + 1 : 0}–{start + visible.length} of {filtered.length}
          </p>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="flex items-center gap-0.5 px-2 py-1 disabled:opacity-40"
            >
              <ChevronLeft size={14} /> Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setPage(n)}
                aria-current={n === currentPage ? "page" : undefined}
                className={`size-6 rounded-md font-medium ${
                  n === currentPage ? "bg-aorange text-white" : "text-dark-gray hover:bg-background"
                }`}
              >
                {n}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="flex items-center gap-0.5 px-2 py-1 disabled:opacity-40"
            >
              Next <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
      </QueryState>

      <CreateRiderModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onCreated={(id) => {
          // Newest riders are listed first, so show them
          setNewRiderId(id);
          setTab("all");
          setQuery("");
          setPage(1);
        }}
      />
      <RiderStatusConfirm rider={suspending} onClose={() => setSuspending(null)} />
    </div>
  );
};

export default RidersList;
