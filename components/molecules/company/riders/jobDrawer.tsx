"use client";

import { Check, X } from "lucide-react";
import Avatar from "@/components/atoms/avatar";
import { jobDropoff, jobEarningsKobo } from "@/app/libs/mappers";
import Modal from "@/components/molecules/modal";
import { formatDateTime, formatKobo } from "@/lib/format";
import { DeliveryJob } from "@/types/api";
import { RiderDetails } from "@/types/company";
import StatusBadge from "./statusBadge";

interface JobDrawerProps {
  job: DeliveryJob | null;
  rider: RiderDetails;
  onClose: () => void;
}

// Job details for the company. Status changes are made by the rider in the rider app.
const JobDrawer: React.FC<JobDrawerProps> = ({ job, rider, onClose }) => {
  if (!job) return null;

  const isFailed = job.status === "failed";
  const isCancelled = job.status === "cancelled";
  const steps = [
    { label: "Assigned", at: job.assignedAt },
    { label: "Picked up", at: job.pickedUpAt },
    { label: "In transit", at: job.inTransitAt },
    isFailed || isCancelled
      ? { label: isFailed ? "Delivery failed" : "Cancelled", at: job.updatedAt, failed: true }
      : { label: "Delivered", at: job.deliveredAt },
  ];

  const details = [
    { label: "Item", value: `${job.item.title} ×${job.item.quantity}` },
    { label: "Pickup", value: job.pickupAddress },
    { label: "Drop-off", value: jobDropoff(job) },
    { label: "Buyer", value: `${job.buyer.fullName} · ${job.order.deliveryAddress?.phone ?? job.buyer.phone}` },
    { label: "Zone", value: job.zone?.name ?? "—" },
    { label: "Your earnings", value: formatKobo(jobEarningsKobo(job)) },
  ];

  return (
    <Modal
      open
      onClose={onClose}
      title={job.jobCode}
      subtitle={`Created ${formatDateTime(job.createdAt)}`}
      placement="right"
    >
      <div className="flex flex-1 flex-col gap-5 p-5">
        <StatusBadge status={job.status} />

        <ol>
          {steps.map((step, i) => {
            const done = Boolean(step.at);
            return (
              <li key={step.label} className="relative flex gap-3 pb-4 last:pb-0">
                {i < steps.length - 1 && (
                  <span
                    className={`absolute left-2.25 top-5 h-[calc(100%-1rem)] w-px ${
                      steps[i + 1].at ? "bg-light-green" : "bg-alight-gray-border"
                    }`}
                  />
                )}
                <span
                  className={`relative flex size-5 shrink-0 items-center justify-center rounded-full ${
                    step.failed
                      ? "bg-ared text-white"
                      : done
                        ? "bg-light-green text-white"
                        : "border border-agray-border bg-white"
                  }`}
                >
                  {step.failed ? <X size={12} /> : done && <Check size={12} />}
                </span>
                <span className="flex flex-col">
                  <span className={`text-sm ${done ? "text-dark-gray" : "text-agray"}`}>
                    {step.label}
                  </span>
                  {step.at && <span className="text-xs text-agray">{formatDateTime(step.at)}</span>}
                </span>
              </li>
            );
          })}
        </ol>

        {job.failureReason && (
          <p className="rounded-lg bg-red-50 p-3 text-sm text-ared">
            <span className="font-medium">Reason: </span>
            {job.failureReason}
          </p>
        )}

        <dl className="space-y-3 rounded-xl border border-alight-gray-border p-4">
          {details.map(({ label, value }) => (
            <div key={label} className="flex justify-between gap-4 text-sm">
              <dt className="shrink-0 text-agray">{label}</dt>
              <dd className="text-right font-medium text-dark-gray">{value}</dd>
            </div>
          ))}
        </dl>

        <div className="flex items-center gap-3 rounded-xl border border-alight-gray-border p-4">
          <Avatar name={rider.name} />
          <div>
            <p className="text-sm font-medium text-dark-gray">{rider.name}</p>
            <p className="text-xs text-agray">
              {rider.code} · {rider.phone}
            </p>
          </div>
        </div>

        <p className="mt-auto text-xs text-agray">
          The rider updates delivery progress from the rider app.
        </p>
      </div>
    </Modal>
  );
};

export default JobDrawer;
