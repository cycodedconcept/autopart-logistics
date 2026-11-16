"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Bike, Calendar, Mail, MapPin, Phone } from "lucide-react";
import Avatar from "@/components/atoms/avatar";
import { jobDropoff, jobEarningsKobo, performanceById, toRiderDetails } from "@/app/libs/mappers";
import { useAllRiders, useCompanyJobs } from "@/app/libs/queries";
import QueryState from "@/components/molecules/queryState";
import { formatDateTime, formatKobo } from "@/lib/format";
import JobDrawer from "./jobDrawer";
import RiderStatusConfirm from "./riderStatusConfirm";
import StatusBadge from "./statusBadge";

const AVAILABILITY_TEXT = {
  active: "Available for jobs",
  on_delivery: "On a delivery",
  offline: "Unavailable",
  suspended: "Suspended by your company",
} as const;

const RiderProfile: React.FC<{ id: string }> = ({ id }) => {
  const ridersQuery = useAllRiders();
  const jobsQuery = useCompanyJobs();
  const [suspendOpen, setSuspendOpen] = useState(false);
  const [openJobId, setOpenJobId] = useState<number | null>(null);

  const riderId = Number(id);
  const perf = useMemo(
    () => performanceById(jobsQuery.data?.summary?.riderPerformance.riders).get(riderId),
    [jobsQuery.data, riderId]
  );
  const apiRider = ridersQuery.data?.riders.find((r) => r.id === riderId);
  const rider = apiRider ? toRiderDetails(apiRider, perf) : null;

  const jobs = useMemo(
    () =>
      (jobsQuery.data?.jobs ?? [])
        .filter((j) => j.riderId === riderId)
        .sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
    [jobsQuery.data, riderId]
  );

  const backLink = (
    <Link
      href="/company/riders"
      className="inline-flex items-center gap-1.5 text-sm text-light-gray hover:text-dark-gray"
    >
      <ArrowLeft size={16} /> Back to Riders
    </Link>
  );

  if (ridersQuery.isLoading || ridersQuery.error) {
    return (
      <div className="space-y-4 p-4 lg:py-5 2xl:p-6">
        {backLink}
        <QueryState
          isLoading={ridersQuery.isLoading}
          error={ridersQuery.error}
          onRetry={() => ridersQuery.refetch()}
        >
          {null}
        </QueryState>
      </div>
    );
  }

  if (!rider) {
    return (
      <div className="space-y-4 p-4 lg:py-5 2xl:p-6">
        {backLink}
        <p className="py-16 text-center text-sm text-light-gray">This rider could not be found.</p>
      </div>
    );
  }

  const openJob = jobs.find((j) => j.id === openJobId) ?? null;
  const info = [
    { icon: Phone, value: rider.phone },
    { icon: Mail, value: rider.email },
    { icon: MapPin, value: rider.zone },
    { icon: Bike, value: rider.vehicle },
    { icon: Calendar, value: `Joined ${rider.joined}` },
  ];

  return (
    <div className="space-y-4 p-4 lg:py-5 2xl:p-6">
      {backLink}

      <div className="grid gap-4 lg:grid-cols-[300px_1fr]">
        <div className="space-y-4">
          <section className="rounded-xl border border-alight-gray-border bg-white p-4">
            <div className="flex flex-col items-center text-center">
              <Avatar name={rider.name} size="lg" />
              <h1 className="mt-3 font-instrument-sans text-lg font-bold text-dark-gray">
                {rider.name}
              </h1>
              <p className="text-xs text-agray">{rider.code}</p>
              <div className="mt-2">
                <StatusBadge status={rider.status} />
              </div>
            </div>
            <ul className="mt-4 space-y-2.5 border-t border-alight-gray-border pt-4">
              {info.map(({ icon: InfoIcon, value }) => (
                <li key={value} className="flex items-center gap-2.5 text-sm text-light-gray">
                  <InfoIcon size={15} className="shrink-0 text-agray" />
                  <span className="truncate">{value}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-xl border border-alight-gray-border bg-white p-4">
            <h2 className="text-sm font-semibold text-dark-gray">Account Access</h2>
            <p className="text-xs text-agray">{AVAILABILITY_TEXT[rider.status]}</p>
            {rider.status === "suspended" ? (
              <p className="mt-3 rounded-lg bg-red-50 p-3 text-xs text-ared">
                This rider is suspended and can&apos;t receive new jobs.
              </p>
            ) : (
              <>
                <p className="mt-3 text-xs text-light-gray">
                  Riders set their own availability in the rider app. Suspend a rider to block
                  their access and move their open jobs to other riders.
                </p>
                <button
                  type="button"
                  onClick={() => setSuspendOpen(true)}
                  className="mt-3 h-9 w-full rounded-lg border border-ared text-sm font-medium text-ared hover:bg-red-50"
                >
                  Suspend Rider
                </button>
              </>
            )}
          </section>

          <section className="rounded-xl border border-alight-gray-border bg-white p-4">
            <h2 className="text-sm font-semibold text-dark-gray">Performance</h2>
            <div className="mt-3 grid grid-cols-3 gap-2 text-center">
              {[
                { label: "Jobs", value: perf?.totalJobsCount ?? 0 },
                { label: "Delivered", value: perf?.deliveredJobsCount ?? 0 },
                { label: "Completion", value: `${perf?.completionRatePercent ?? 0}%` },
              ].map((stat) => (
                <div key={stat.label} className="rounded-lg bg-background py-2.5">
                  <p className="text-lg font-semibold text-dark-gray">{stat.value}</p>
                  <p className="text-[11px] text-agray">{stat.label}</p>
                </div>
              ))}
            </div>
            <div className="mt-2 rounded-lg bg-orange-50 py-2.5 text-center">
              <p className="text-lg font-semibold text-aorange">
                {formatKobo(perf?.companyShareKobo ?? 0)}
              </p>
              <p className="text-[11px] text-agray">Your earnings from this rider</p>
            </div>
          </section>
        </div>

        <section className="rounded-xl border border-alight-gray-border bg-white p-4">
          <h2 className="text-sm font-semibold text-dark-gray">Job History</h2>
          <p className="text-xs text-agray">Deliveries assigned to this rider · click a job for details</p>
          <QueryState
            isLoading={jobsQuery.isLoading}
            error={jobsQuery.error}
            onRetry={() => jobsQuery.refetch()}
          >
            {jobs.length === 0 ? (
              <p className="py-10 text-center text-sm text-agray">No jobs assigned yet.</p>
            ) : (
              <ul className="mt-3">
                {jobs.map((job) => {
                  console.log(job)
                 return <li key={job.id} className="border-b border-alight-gray-border last:border-0">
                    <button
                      type="button"
                      onClick={() => setOpenJobId(job.id)}
                      className="cursor-pointer flex w-full items-start justify-between gap-3 rounded-lg px-2 py-3 text-left hover:bg-background"
                    >
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-dark-gray">
                          {job.jobCode}{" "}
                          <span className="font-normal text-agray">
                            · {formatDateTime(job.assignedAt ?? job.createdAt)}
                          </span>
                        </p>
                        <p className="flex flex-wrap items-center gap-1 text-xs text-light-gray">
                          {job.pickupAddress} <ArrowRight size={12} className="text-agray" />{" "}
                          {jobDropoff(job)}
                        </p>
                        <p className="text-xs text-agray">
                          {job.item.title} · {job.buyer.fullName}
                        </p>
                      </div>
                      <div className="flex shrink-0 flex-col items-end gap-1">
                        <StatusBadge status={job.status} />
                        <span className="text-sm font-medium text-aorange">
                          {formatKobo(jobEarningsKobo(job))}
                        </span>
                      </div>
                    </button>
                  </li>
})}
              </ul>
            )}
          </QueryState>
        </section>
      </div>

      <RiderStatusConfirm rider={suspendOpen ? rider : null} onClose={() => setSuspendOpen(false)} />
      <JobDrawer job={openJob} rider={rider} onClose={() => setOpenJobId(null)} />
    </div>
  );
};

export default RiderProfile;
