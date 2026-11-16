"use client";

import { useCompanyJobs } from "@/app/libs/queries";
import {
  buildActivity,
  buildDashboardStats,
  buildEarningsSeries,
  buildJobStatus,
  buildTopRiders,
  ridersOnDuty,
} from "@/app/libs/stats";
import QueryState from "@/components/molecules/queryState";
import { useAuthStore } from "@/store/authStore";
import CompanyStatCard from "./companyStatCard";
import JobStatusChart from "./jobStatusChart";
import LiveActivity from "./liveActivity";
import TopRidersTable from "./topRidersTable";
import WeeklyEarningsChart from "./weeklyEarningsChart";

const DashboardView: React.FC<{ today: string }> = ({ today }) => {
  const companyName = useAuthStore((s) => s.user?.name);
  const { data, isLoading, error, refetch } = useCompanyJobs();
  const summary = data?.summary;

  const weekly = buildEarningsSeries(data?.jobs, 7).map((p) => ({ day: p.label, amount: p.gross }));

  return (
    <div className="grid min-h-full xl:grid-cols-[1fr_300px]">
      <div className="min-w-0 space-y-4 p-4 lg:py-5 2xl:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="font-instrument-sans text-[22px] font-bold text-dark-gray">
              Dashboard
            </h1>
            <p className="text-[13px] text-subtitle-gray">
              {companyName ? `${companyName} · ` : ""}
              {today}
            </p>
          </div>
          {summary && (
            <span className="flex items-center gap-1.5 rounded-[10px] border border-[#A9EFC5] bg-[#ECFDF3] px-3 py-1.5 text-[13px] font-semibold text-[#027A48]">
              <span className="size-1.5 rounded-full bg-[#12B76A]" />
              {ridersOnDuty(summary)} riders on duty
            </span>
          )}
        </div>

        <QueryState isLoading={isLoading} error={error} onRetry={() => refetch()}>
          <div className="space-y-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {buildDashboardStats(summary).map((stat) => (
                <CompanyStatCard key={stat.id} stat={stat} />
              ))}
            </div>

            <div className="grid gap-3 lg:grid-cols-[2fr_1fr]">
              <WeeklyEarningsChart data={weekly} />
              <JobStatusChart data={buildJobStatus(summary)} />
            </div>

            <TopRidersTable riders={buildTopRiders(summary)} />
          </div>
        </QueryState>
      </div>

      <div className="px-4 pb-4 lg:px-6 xl:p-0">
        <LiveActivity items={buildActivity(data?.jobs)} />
      </div>
    </div>
  );
};

export default DashboardView;
