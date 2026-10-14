// Turns API responses into the shapes the dashboard components render.
import { koboToNaira } from "@/lib/format";
import { ApiRider, DeliveryJob, DeliveryJobStatus, RiderPerformance } from "@/types/api";
import { RiderDetails, RiderStatus } from "@/types/company";

// The API splits availability (set by the rider) from account access (set by the company)
export const riderStatus = (rider: ApiRider): RiderStatus => {
  if (rider.accountStatus === "suspended") return "suspended";
  if (rider.status === "available") return "active";
  if (rider.status === "on_delivery") return "on_delivery";
  return "offline";
};

export const riderCode = (id: number) => `RDR-${String(id).padStart(3, "0")}`;

const VEHICLE_LABELS: Record<string, string> = {
  bike: "Motorcycle",
  bicycle: "Bicycle",
  car: "Car",
  van: "Van",
};
export const vehicleLabel = (type: string) => VEHICLE_LABELS[type] ?? type;

export const toRiderDetails = (rider: ApiRider, perf?: RiderPerformance): RiderDetails => ({
  id: String(rider.id),
  code: riderCode(rider.id),
  name: rider.fullName,
  phone: rider.phone,
  email: rider.email,
  zone: rider.zone?.name ?? "—",
  vehicle: vehicleLabel(rider.vehicleType),
  rating: 0,
  joined: new Date(rider.createdAt).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  }),
  jobs: perf?.totalJobsCount ?? 0,
  delivered: perf?.deliveredJobsCount ?? 0,
  earnings: koboToNaira(perf?.companyShareKobo ?? 0),
  status: riderStatus(rider),
});

// Rider performance keyed by rider id, from the jobs summary
export const performanceById = (riders: RiderPerformance[] = []) =>
  new Map(riders.map((p) => [p.rider.id, p]));

export const JOB_STATUS_TEXT: Record<DeliveryJobStatus, string> = {
  pending: "waiting for a rider",
  assigned: "assigned to rider",
  picked_up: "picked up from seller",
  in_transit: "marked in transit",
  delivered: "delivered to buyer",
  failed: "failed delivery",
  cancelled: "cancelled",
};

export const jobRiderName = (job: DeliveryJob) => job.assignedRider?.fullName ?? "Unassigned";

export const jobDropoff = (job: DeliveryJob) => {
  const address = job.order?.deliveryAddress;
  return address ? `${address.street}, ${address.city}` : "—";
};

// The fee the company earns on a job, falling back to the full delivery fee
export const jobEarningsKobo = (job: DeliveryJob) =>
  job.companyShareKobo ?? job.deliveryFeeKobo ?? 0;
