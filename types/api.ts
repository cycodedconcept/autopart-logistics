// Shapes returned by the logistics endpoints of the AutoPart API.
// All money fields are in kobo (₦1 = 100 kobo).
import { Company } from "./auth";

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ListParams {
  page?: number;
  limit?: number;
  search?: string;
}

export interface Zone {
  id: number;
  name: string;
  state: string;
  city: string;
  createdAt: string;
  updatedAt: string;
}

// ----- Riders -----

export type RiderAvailability = "available" | "on_delivery" | "unavailable" | "inactive";
export type RiderAccountStatus = "active" | "suspended";
export type VehicleType = "bike" | "car" | "van" | "bicycle";

export interface ApiRider {
  id: number;
  companyId: number;
  zoneId: number;
  fullName: string;
  phone: string;
  email: string;
  vehicleType: VehicleType | string;
  status: RiderAvailability;
  accountStatus?: RiderAccountStatus;
  createdAt: string;
  updatedAt: string;
  zone: Zone;
  company: Company;
}

export interface RidersParams extends ListParams {
  status?: RiderAvailability | "all";
}

export interface RidersData {
  riders: ApiRider[];
  pagination: Pagination;
  filters: { status: string; search: string | null };
}

export interface CreateRiderInput {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  vehicleType: VehicleType | string;
  zoneId: number;
  status?: RiderAvailability;
}

export interface SuspendRiderData {
  rider: ApiRider;
  // Jobs moved off the suspended rider; the docs only show empty lists
  reassignment: {
    reassignedJobs: unknown[];
    returnedToQueueJobs: unknown[];
    manualHandlingJobs: unknown[];
  };
}

// ----- Delivery jobs -----

export type DeliveryJobStatus =
  | "pending"
  | "assigned"
  | "picked_up"
  | "in_transit"
  | "delivered"
  | "failed"
  | "cancelled";

export interface DeliveryJob {
  id: number;
  jobCode: string;
  orderId: number;
  orderItemId: number;
  sellerId: number;
  companyId: number;
  riderId: number | null;
  status: DeliveryJobStatus;
  failureReason: string | null;
  deliveryFeeKobo?: number;
  platformMarginKobo?: number;
  companyShareKobo?: number;
  pickupAddress: string;
  assignedAt: string | null;
  pickedUpAt: string | null;
  inTransitAt: string | null;
  deliveredAt: string | null;
  settlementRecordedAt?: string | null;
  createdAt: string;
  updatedAt: string;
  zone: Zone;
  order: {
    id: number;
    status: string;
    paymentMethod: string;
    paymentReference: string;
    paymentStatus: string;
    totalKobo: number;
    deliveryAddress: {
      id: number;
      label: string;
      street: string;
      city: string;
      state: string;
      phone: string;
    };
  };
  item: {
    id: number;
    productId: number;
    title: string;
    partNumber: string;
    quantity: number;
    lineTotalKobo: number;
    itemStatus: string;
  };
  buyer: { id: number; fullName: string; email: string; phone: string };
  seller?: {
    id: number;
    businessName: string;
    contactEmail: string;
    contactPhone: string;
    address: string;
    fullName: string;
  };
  assignedCompany?: Company;
  assignedRider?: ApiRider | null;
}

export interface JobsParams extends ListParams {
  status?: DeliveryJobStatus | "all";
}

export interface RiderPerformance {
  rider: ApiRider;
  totalJobsCount: number;
  assignedJobsCount: number;
  pickedUpJobsCount: number;
  inTransitJobsCount: number;
  activeJobsCount: number;
  deliveredJobsCount: number;
  failedJobsCount: number;
  cancelledJobsCount: number;
  deliveryFeesKobo: number;
  companyShareKobo: number;
  completionRatePercent: number;
}

// Returned with the company jobs list; powers the dashboard
export interface JobsSummary {
  jobsByStatus: Record<DeliveryJobStatus, number> & { total: number };
  riderPerformance: {
    summary: {
      totalRidersCount: number;
      availableCount: number;
      onDeliveryCount: number;
      unavailableCount: number;
      inactiveCount: number;
      activeJobsCount: number;
      deliveredJobsCount: number;
      failedJobsCount: number;
      completionRatePercent: number;
    };
    riders: RiderPerformance[];
  };
}

export interface JobsData {
  jobs: DeliveryJob[];
  pagination: Pagination;
  filters: { status: string; search: string | null };
  summary?: JobsSummary;
}

export interface UpdateJobStatusInput {
  status: "picked_up" | "in_transit" | "delivered" | "failed";
  note?: string;
  // Required when status is "failed"
  failureReason?: string;
}

// ----- Earnings & payouts -----

export interface EarningsData {
  company: Company;
  summary: {
    completedJobsCount: number;
    deliveryFeesKobo: number;
    platformMarginKobo: number;
    companyShareKobo: number;
  };
  payouts: {
    pendingKobo: number;
    requestedKobo: number;
    approvedKobo: number;
    paidKobo: number;
  };
}

export type ApiPayoutStatus = "requested" | "approved" | "rejected" | "paid";

export interface ApiPayout {
  id: number;
  payeeType: "logistics_company" | "seller";
  deliveryFeeKobo: number;
  platformMarginKobo: number;
  companyShareKobo: number;
  status: ApiPayoutStatus;
  bankAccountRef: string;
  itemCount: number;
  requestedAt: string;
  approvedAt: string | null;
  rejectionReason: string | null;
  settledAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface RequestPayoutInput {
  bankAccountRef: string;
}
