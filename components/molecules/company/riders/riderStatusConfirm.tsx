"use client";

import { useSuspendRider } from "@/app/libs/queries";
import Modal from "@/components/molecules/modal";
import { useToastStore } from "@/store/toastStore";
import { RiderDetails } from "@/types/company";

interface RiderStatusConfirmProps {
  rider: RiderDetails | null;
  onClose: () => void;
}

// Confirmation for suspending a rider, shared by the list and profile.
// The API has no endpoint to reactivate a rider yet.
const RiderStatusConfirm: React.FC<RiderStatusConfirmProps> = ({ rider, onClose }) => {
  const suspend = useSuspendRider();
  const showToast = useToastStore((s) => s.showToast);

  if (!rider) return null;

  const handleClose = () => {
    suspend.reset();
    onClose();
  };

  const handleConfirm = () => {
    suspend.mutate(Number(rider.id), {
      onSuccess: (res) => {
        const moved = res.data.reassignment;
        const reassigned =
          moved.reassignedJobs.length + moved.returnedToQueueJobs.length + moved.manualHandlingJobs.length;
        showToast(
          reassigned
            ? `${res.message} ${reassigned} open job(s) were moved off this rider.`
            : res.message || `${rider.name} has been suspended.`,
          "error"
        );
        handleClose();
      },
    });
  };

  return (
    <Modal open onClose={handleClose} title="Suspend Rider Access" size="sm">
      <p className="px-5 pt-2 text-sm text-light-gray">
        {rider.name} will lose access and won&apos;t receive new delivery jobs. Any open jobs will
        be reassigned. Are you sure you want to suspend this rider?
      </p>
      {suspend.error && (
        <p role="alert" className="px-5 pt-3 text-sm text-ared">
          {suspend.error.message}
        </p>
      )}
      <div className="flex justify-end gap-2 p-5">
        <button
          type="button"
          onClick={handleClose}
          className="h-9 rounded-lg border border-agray-border px-4 text-sm font-medium text-dark-gray hover:bg-background"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleConfirm}
          disabled={suspend.isPending}
          className="h-9 rounded-lg bg-ared px-4 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-60"
        >
          {suspend.isPending ? "Suspending..." : "Yes, Suspend"}
        </button>
      </div>
    </Modal>
  );
};

export default RiderStatusConfirm;
