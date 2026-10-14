"use client";

import { useState } from "react";
import { Info } from "lucide-react";
import { useRequestPayout } from "@/app/libs/queries";
import Modal from "@/components/molecules/modal";
import { formatKobo } from "@/lib/format";
import { useToastStore } from "@/store/toastStore";
import { ApiPayout } from "@/types/api";

interface RequestPayoutModalProps {
  open: boolean;
  availableKobo: number;
  onClose: () => void;
  onRequested?: (payout: ApiPayout) => void;
}

const BANK_REF_KEY = "payout-bank-ref";

// Remember the last bank reference used in this browser
const readSavedRef = () => {
  try {
    return localStorage.getItem(BANK_REF_KEY) ?? "";
  } catch {
    return "";
  }
};

const RequestPayoutModal: React.FC<RequestPayoutModalProps> = ({
  open,
  availableKobo,
  onClose,
  onRequested,
}) => {
  const requestPayout = useRequestPayout();
  const showToast = useToastStore((s) => s.showToast);
  // The modal is only mounted while open, so this reads storage in the browser
  const [bankRef, setBankRef] = useState(readSavedRef);

  const handleClose = () => {
    requestPayout.reset();
    onClose();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const ref = bankRef.trim();
    if (!ref) return;
    requestPayout.mutate(
      { bankAccountRef: ref },
      {
        onSuccess: (res) => {
          try {
            localStorage.setItem(BANK_REF_KEY, ref);
          } catch {
            // Storage blocked: the reference just won't be prefilled next time
          }
          showToast(res.message || "Payout requested.");
          onRequested?.(res.data.payout);
          handleClose();
        },
      }
    );
  };

  return (
    <Modal open={open} onClose={handleClose} title="Request Payout" subtitle="Withdraw to your bank account">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-5">
        <div className="rounded-xl bg-orange-50 p-4 text-center">
          <p className="text-xs font-medium text-abrown">Available Balance</p>
          <p className="font-instrument-sans text-3xl font-bold text-aorange">
            {formatKobo(availableKobo)}
          </p>
          <p className="text-xs text-agray">The full balance will be requested</p>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="payout-bank-ref" className="text-xs font-medium text-dark-gray">
            Bank Account Reference
          </label>
          <input
            id="payout-bank-ref"
            value={bankRef}
            onChange={(e) => {
              setBankRef(e.target.value);
              requestPayout.reset();
            }}
            placeholder="e.g. BANK-LOG-001"
            autoComplete="off"
            className="h-10 w-full rounded-lg border border-agray-border bg-white px-3 text-sm text-dark-gray outline-none placeholder:text-agray focus:border-aorange"
            required
          />
          <p className="text-xs text-agray">The reference of the bank account registered for your company.</p>
        </div>

        <p className="flex gap-2 rounded-lg bg-background p-3 text-xs text-light-gray">
          <Info size={16} className="shrink-0 text-agray" />
          Payout requests are reviewed by AutoParts before the money is sent.
        </p>

        {requestPayout.error && (
          <p role="alert" className="text-sm text-ared">
            {requestPayout.error.message}
          </p>
        )}

        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleClose}
            className="h-10 flex-1 rounded-lg border border-agray-border text-sm font-medium text-dark-gray hover:bg-background"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!bankRef.trim() || availableKobo <= 0 || requestPayout.isPending}
            className="h-10 flex-1 rounded-lg bg-aorange text-sm font-medium text-white disabled:cursor-not-allowed disabled:bg-orange-200"
          >
            {requestPayout.isPending ? "Requesting..." : "Request Payout"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default RequestPayoutModal;
