"use client";

import { Info, Wallet } from "lucide-react";
import { formatDateTime, formatKobo } from "@/lib/format";
import { ApiPayout, EarningsData } from "@/types/api";
import { CompanyStat } from "@/types/company";
import CompanyStatCard from "../companyStatCard";
import StatusBadge from "../riders/statusBadge";

interface PayoutsPanelProps {
  payouts: EarningsData["payouts"];
  // Requests made in this session, newest first
  requested: ApiPayout[];
  onRequestPayout: () => void;
}

const PayoutsPanel: React.FC<PayoutsPanelProps> = ({ payouts, requested, onRequestPayout }) => {
  const stats: CompanyStat[] = [
    { id: "available", label: "Available Balance", value: formatKobo(payouts.pendingKobo), caption: "Ready to request", tone: "orange", colorValue: true },
    { id: "settling", label: "Requested", value: formatKobo(payouts.requestedKobo), caption: "Waiting for approval", tone: "blue", colorValue: true },
    { id: "pending", label: "Approved", value: formatKobo(payouts.approvedKobo), caption: "Approved, not yet paid", tone: "purple", colorValue: true },
    { id: "paidOut", label: "Total Paid Out", value: formatKobo(payouts.paidKobo), caption: "Settled to your bank", tone: "green", colorValue: true },
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {stats.map((stat) => (
          <CompanyStatCard key={stat.id} stat={stat} />
        ))}
      </div>

      {payouts.pendingKobo > 0 && (
        <div className="flex flex-col gap-3 rounded-xl border border-orange-200 bg-orange-50 p-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-start gap-2.5 text-sm text-abrown">
            <Wallet size={18} className="mt-0.5 shrink-0 text-aorange" />
            <span>
              You have <span className="font-semibold">{formatKobo(payouts.pendingKobo)}</span>{" "}
              available. Request a payout to have it sent to your bank account.
            </span>
          </p>
          <button
            type="button"
            onClick={onRequestPayout}
            className="h-9 shrink-0 rounded-lg bg-aorange px-4 text-sm font-medium text-white hover:bg-orange-600"
          >
            Request Payout
          </button>
        </div>
      )}

      <div className="rounded-xl border border-alight-gray-border bg-white p-4">
        <h3 className="text-sm font-semibold text-dark-gray">Payout Requests</h3>
        <p className="text-xs text-agray">Requests you&apos;ve made in this session</p>

        {requested.length > 0 && (
          <div className="relative mt-4 overflow-x-auto">
            <table className="w-full min-w-170 text-left text-sm">
              <thead>
                <tr className="border-b border-alight-gray-border text-xs text-agray">
                  <th className="py-2 font-medium">Payout ID</th>
                  <th className="py-2 font-medium">Delivery Fees</th>
                  <th className="py-2 font-medium">Platform Margin</th>
                  <th className="py-2 font-medium">Your Payout</th>
                  <th className="py-2 font-medium">Jobs</th>
                  <th className="py-2 font-medium">Requested</th>
                  <th className="py-2 font-medium">Bank Ref</th>
                  <th className="py-2 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {requested.map((p) => (
                  <tr key={p.id} className="border-b border-alight-gray-border last:border-0">
                    <td className="py-3 font-medium text-dark-gray">PO-{String(p.id).padStart(4, "0")}</td>
                    <td className="py-3 text-light-gray">{formatKobo(p.deliveryFeeKobo)}</td>
                    <td className="py-3 text-ared">-{formatKobo(p.platformMarginKobo)}</td>
                    <td className="py-3 font-medium text-aorange">{formatKobo(p.companyShareKobo)}</td>
                    <td className="py-3 text-light-gray">{p.itemCount}</td>
                    <td className="py-3 whitespace-nowrap text-light-gray">{formatDateTime(p.requestedAt)}</td>
                    <td className="py-3 font-mono text-xs text-agray">{p.bankAccountRef}</td>
                    <td className="py-3">
                      <StatusBadge status={p.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <p className="mt-4 flex gap-2 rounded-lg bg-background p-3 text-xs text-light-gray">
          <Info size={16} className="shrink-0 text-agray" />
          A full payout history isn&apos;t available from the API yet. The totals above are always
          up to date.
        </p>
      </div>
    </div>
  );
};

export default PayoutsPanel;
