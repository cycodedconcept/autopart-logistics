// Derives dashboard and earnings figures from the jobs list and its summary.
import { formatKobo, koboToNaira, timeAgo } from "@/lib/format";
import { DeliveryJob, JobsSummary } from "@/types/api";
import {
  ActivityItem,
  CompanyStat,
  EarningsSeriesPoint,
  JobStatusSlice,
  Rider,
  RiderEarning,
} from "@/types/company";
import { JOB_STATUS_TEXT, jobEarningsKobo, jobRiderName } from "./mappers";

const percent = (part: number, total: number) =>
  total ? Math.round((part / total) * 1000) / 10 : 0;

export const ridersOnDuty = (summary?: JobsSummary) => {
  const s = summary?.riderPerformance.summary;
  return (s?.availableCount ?? 0) + (s?.onDeliveryCount ?? 0);
};

export const companyEarningsKobo = (summary?: JobsSummary) =>
  (summary?.riderPerformance.riders ?? []).reduce((sum, r) => sum + r.companyShareKobo, 0);

export const buildDashboardStats = (summary?: JobsSummary): CompanyStat[] => {
  const jobs = summary?.jobsByStatus;
  const riders = summary?.riderPerformance.summary;
  const total = jobs?.total ?? 0;
  const delivered = jobs?.delivered ?? 0;
  const failed = jobs?.failed ?? 0;
  const inTransit = (jobs?.picked_up ?? 0) + (jobs?.in_transit ?? 0);
  const pending = (jobs?.pending ?? 0) + (jobs?.assigned ?? 0);

  return [
    { id: "riders", label: "Total Riders", value: String(riders?.totalRidersCount ?? 0), caption: `${ridersOnDuty(summary)} on duty now`, tone: "orange" },
    { id: "jobs", label: "Total Jobs", value: String(total), caption: "Across all riders", tone: "purple" },
    { id: "delivered", label: "Delivered", value: String(delivered), caption: `${percent(delivered, total)}% of all jobs`, tone: "green" },
    { id: "transit", label: "In Transit", value: String(inTransit), caption: "Picked up or on the way", tone: "blue" },
    { id: "failed", label: "Failed Deliveries", value: String(failed), caption: `${percent(failed, total)}% failure rate`, tone: "red" },
    { id: "pending", label: "Pending Pickup", value: String(pending), caption: "Waiting to be picked up", tone: "yellow" },
    { id: "earnings", label: "Company Earnings", value: formatKobo(companyEarningsKobo(summary)), caption: "Your share of delivery fees", tone: "orange" },
    { id: "completion", label: "Completion Rate", value: `${riders?.completionRatePercent ?? 0}%`, caption: "Delivered vs finished jobs", tone: "green" },
  ];
};

export const buildJobStatus = (summary?: JobsSummary): JobStatusSlice[] => {
  const jobs = summary?.jobsByStatus;
  return [
    { label: "Delivered", value: jobs?.delivered ?? 0, color: "#17b26a" },
    { label: "In Transit", value: (jobs?.picked_up ?? 0) + (jobs?.in_transit ?? 0), color: "#ff7101" },
    { label: "Pending", value: (jobs?.pending ?? 0) + (jobs?.assigned ?? 0), color: "#fdb022" },
    { label: "Failed", value: jobs?.failed ?? 0, color: "#f04438" },
  ];
};

export const buildTopRiders = (summary?: JobsSummary): Rider[] =>
  [...(summary?.riderPerformance.riders ?? [])]
    .sort((a, b) => b.deliveredJobsCount - a.deliveredJobsCount)
    .map((p) => ({
      id: String(p.rider.id),
      name: p.rider.fullName,
      jobs: p.totalJobsCount,
      delivered: p.deliveredJobsCount,
      earnings: koboToNaira(p.companyShareKobo),
    }));

export const buildRiderEarnings = (summary?: JobsSummary): RiderEarning[] =>
  [...(summary?.riderPerformance.riders ?? [])]
    .sort((a, b) => b.deliveryFeesKobo - a.deliveryFeesKobo)
    .map((p) => ({
      riderId: String(p.rider.id),
      name: p.rider.fullName,
      jobs: p.totalJobsCount,
      gross: koboToNaira(p.deliveryFeesKobo),
      net: koboToNaira(p.companyShareKobo),
    }));

export const buildActivity = (jobs: DeliveryJob[] = [], limit = 10): ActivityItem[] =>
  [...jobs]
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
    .slice(0, limit)
    .map((job) => ({
      id: String(job.id),
      rider: jobRiderName(job),
      message: `${job.jobCode} — ${JOB_STATUS_TEXT[job.status]}`,
      time: timeAgo(job.updatedAt),
    }));

const dayKey = (date: Date) => date.toISOString().slice(0, 10);

// Delivered-job fees per day for the last `days` days, oldest first
export const buildEarningsSeries = (
  jobs: DeliveryJob[] = [],
  days: number,
  now = new Date()
): EarningsSeriesPoint[] => {
  const totals = new Map<string, { gross: number; net: number }>();
  jobs.forEach((job) => {
    if (job.status !== "delivered" || !job.deliveredAt) return;
    const key = dayKey(new Date(job.deliveredAt));
    const t = totals.get(key) ?? { gross: 0, net: 0 };
    t.gross += job.deliveryFeeKobo ?? jobEarningsKobo(job);
    t.net += jobEarningsKobo(job);
    totals.set(key, t);
  });

  return Array.from({ length: days }, (_, i) => {
    const date = new Date(now);
    date.setDate(now.getDate() - (days - 1 - i));
    const t = totals.get(dayKey(date)) ?? { gross: 0, net: 0 };
    return {
      label:
        days <= 7
          ? date.toLocaleDateString("en-US", { weekday: "short" })
          : date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      gross: koboToNaira(t.gross),
      net: koboToNaira(t.net),
    };
  });
};
