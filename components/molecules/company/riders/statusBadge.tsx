import { ApiPayoutStatus, DeliveryJobStatus } from "@/types/api";
import { RiderStatus } from "@/types/company";

type BadgeStatus = RiderStatus | DeliveryJobStatus | ApiPayoutStatus;

const STYLES: Record<BadgeStatus, { label: string; className: string }> = {
  active: { label: "Active", className: "bg-green-50 text-agreen" },
  on_delivery: { label: "On delivery", className: "bg-orange-50 text-aorange" },
  offline: { label: "Offline", className: "bg-background text-light-gray" },
  suspended: { label: "Suspended", className: "bg-red-50 text-ared" },
  picked_up: { label: "Picked up", className: "bg-blue-50 text-blue-600" },
  in_transit: { label: "In transit", className: "bg-orange-50 text-aorange" },
  delivered: { label: "Delivered", className: "bg-green-50 text-agreen" },
  failed: { label: "Failed", className: "bg-red-50 text-ared" },
  pending: { label: "Pending", className: "bg-yellow-50 text-yellow-700" },
  assigned: { label: "Assigned", className: "bg-blue-50 text-blue-600" },
  cancelled: { label: "Cancelled", className: "bg-background text-light-gray" },
  requested: { label: "Requested", className: "bg-orange-50 text-aorange" },
  approved: { label: "Approved", className: "bg-blue-50 text-blue-600" },
  rejected: { label: "Rejected", className: "bg-red-50 text-ared" },
  paid: { label: "Paid", className: "bg-green-50 text-agreen" },
};

export const statusLabel = (status: BadgeStatus) => STYLES[status].label;

const StatusBadge: React.FC<{ status: BadgeStatus }> = ({ status }) => {
  const { label, className } = STYLES[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2 py-0.5 text-xs font-medium ${className}`}
    >
      <span className="size-1.5 rounded-full bg-current" />
      {label}
    </span>
  );
};

export default StatusBadge;
