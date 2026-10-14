"use client";

import { useMemo, useState } from "react";
import { Download, Plus } from "lucide-react";
import { useCompanyJobs, useEarnings } from "@/app/libs/queries";
import { buildEarningsSeries, buildRiderEarnings } from "@/app/libs/stats";
import QueryState from "@/components/molecules/queryState";
import { formatKobo, koboToNaira } from "@/lib/format";
import { useAuthStore } from "@/store/authStore";
import { ApiPayout } from "@/types/api";
import { CompanyStat } from "@/types/company";
import CompanyStatCard from "../companyStatCard";
import EarningsChart from "./earningsChart";
import PayoutsPanel from "./payoutsPanel";
import RequestPayoutModal from "./requestPayoutModal";
import RiderEarningsTable from "./riderEarningsTable";

type Tab = "earnings" | "payouts";

const TABS: { key: Tab; label: string }[] = [
  { key: "earnings", label: "Logistics Earnings" },
  { key: "payouts", label: "Company Payout" },
];

// Quote fields that could contain commas or quotes
const toCsv = (rows: (string | number)[][]) =>
  rows.map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")).join("\n");

const downloadCsv = (filename: string, rows: (string | number)[][]) => {
  const url = URL.createObjectURL(new Blob([toCsv(rows)], { type: "text/csv;charset=utf-8" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
};

const EarningsView = () => {
  const [tab, setTab] = useState<Tab>("earnings");
  const [payoutOpen, setPayoutOpen] = useState(false);
  // Payouts requested in this session; the API has no payout history endpoint yet
  const [requested, setRequested] = useState<ApiPayout[]>([]);
  const companyName = useAuthStore((s) => s.user?.name);
  const earningsQuery = useEarnings();
  const jobsQuery = useCompanyJobs();
  const earnings = earningsQuery.data;
  const available = earnings?.payouts.pendingKobo ?? 0;

  const series = useMemo(
    () => ({
      week: buildEarningsSeries(jobsQuery.data?.jobs, 7),
      month: buildEarningsSeries(jobsQuery.data?.jobs, 30),
    }),
    [jobsQuery.data]
  );
  const riderEarnings = useMemo(
    () => buildRiderEarnings(jobsQuery.data?.summary),
    [jobsQuery.data]
  );

  const summary = earnings?.summary;
  const margin = summary?.deliveryFeesKobo
    ? Math.round((summary.platformMarginKobo / summary.deliveryFeesKobo) * 100)
    : 0;
  const stats: CompanyStat[] = [
    { id: "gross", label: "Delivery Fees", value: formatKobo(summary?.deliveryFeesKobo ?? 0), caption: "Gross, from completed jobs", tone: "green" },
    { id: "fees", label: "Platform Margin", value: formatKobo(summary?.platformMarginKobo ?? 0), caption: `${margin}% of delivery fees`, tone: "red" },
    { id: "net", label: "Your Share", value: formatKobo(summary?.companyShareKobo ?? 0), caption: "After platform margin", tone: "orange" },
    { id: "month", label: "Completed Jobs", value: String(summary?.completedJobsCount ?? 0), caption: "Jobs that earned fees", tone: "purple" },
  ];

  const handleExport = () => {
    if (tab === "earnings") {
      downloadCsv("rider-earnings.csv", [
        ["Rider", "Jobs", "Delivery fees (NGN)", "Your share (NGN)"],
        ...riderEarnings.map((r) => [r.name, r.jobs, r.gross, r.net]),
      ]);
    } else {
      const p = earnings?.payouts;
      downloadCsv("payout-summary.csv", [
        ["Bucket", "Amount (NGN)"],
        ["Available to request", koboToNaira(p?.pendingKobo ?? 0)],
        ["Requested", koboToNaira(p?.requestedKobo ?? 0)],
        ["Approved", koboToNaira(p?.approvedKobo ?? 0)],
        ["Paid", koboToNaira(p?.paidKobo ?? 0)],
      ]);
    }
  };

  return (
    <div className="space-y-4 p-4 lg:py-5 2xl:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="font-instrument-sans text-[22px] font-bold text-dark-gray">Earnings</h1>
          <p className="text-[13px] text-subtitle-gray">
            {companyName ? `${companyName} · ` : ""}Financial overview
          </p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleExport}
            disabled={!earnings}
            className="flex h-9 items-center gap-1.5 rounded-lg border border-agray-border bg-white px-3 text-sm font-medium text-dark-gray hover:bg-background disabled:opacity-50"
          >
            <Download size={16} /> Export CSV
          </button>
          <button
            type="button"
            onClick={() => setPayoutOpen(true)}
            disabled={available <= 0}
            title={available <= 0 ? "No earnings available to pay out yet" : undefined}
            className="flex h-9 items-center gap-1.5 rounded-lg bg-aorange px-3.5 text-sm font-medium text-white hover:bg-orange-600 disabled:cursor-not-allowed disabled:bg-orange-200"
          >
            <Plus size={16} /> Request Payout
          </button>
        </div>
      </div>

      <div role="tablist" className="flex gap-1.5">
        {TABS.map(({ key, label }) => (
          <button
            key={key}
            type="button"
            role="tab"
            aria-selected={tab === key}
            onClick={() => setTab(key)}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
              tab === key
                ? "bg-aorange text-white"
                : "border border-alight-gray-border bg-white text-light-gray hover:text-dark-gray"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <QueryState
        isLoading={earningsQuery.isLoading}
        error={earningsQuery.error}
        onRetry={() => earningsQuery.refetch()}
      >
        {tab === "earnings" ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
              {stats.map((stat) => (
                <CompanyStatCard key={stat.id} stat={stat} />
              ))}
            </div>
            <QueryState
              isLoading={jobsQuery.isLoading}
              error={jobsQuery.error}
              onRetry={() => jobsQuery.refetch()}
            >
              <div className="space-y-4">
                <EarningsChart data={series} />
                <RiderEarningsTable riders={riderEarnings} />
              </div>
            </QueryState>
          </div>
        ) : (
          earnings && (
            <PayoutsPanel
              payouts={earnings.payouts}
              requested={requested}
              onRequestPayout={() => setPayoutOpen(true)}
            />
          )
        )}
      </QueryState>

      {payoutOpen && (
        <RequestPayoutModal
          open
          availableKobo={available}
          onClose={() => setPayoutOpen(false)}
          onRequested={(payout) => {
            setRequested((list) => [payout, ...list]);
            setTab("payouts");
          }}
        />
      )}
    </div>
  );
};

export default EarningsView;
