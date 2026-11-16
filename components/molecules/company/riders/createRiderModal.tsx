"use client";

import { useId, useState } from "react";
import { ChevronDown, Eye, EyeOff, Info } from "lucide-react";
import { vehicleLabel } from "@/app/libs/mappers";
import { useCreateRider, useZones } from "@/app/libs/queries";
import Modal from "@/components/molecules/modal";
import { useToastStore } from "@/store/toastStore";
import { VehicleType } from "@/types/api";

const VEHICLE_TYPES: VehicleType[] = ["bike", "bicycle", "car", "van"];
const MIN_PASSWORD = 8;

const EMPTY = { fullName: "", phone: "", email: "", password: "", zoneId: "", vehicleType: "" };
type FormState = typeof EMPTY;

const inputClass =
  "h-10 w-full rounded-lg border border-agray-border bg-white px-3 text-sm text-dark-gray outline-none placeholder:text-agray focus:border-aorange";

const Field: React.FC<{ label: string; hint?: string; children: (id: string) => React.ReactNode }> = ({
  label,
  hint,
  children,
}) => {
  const id = useId();
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-xs font-medium text-dark-gray">
        {label}
      </label>
      {children(id)}
      {hint && <p className="text-xs text-agray">{hint}</p>}
    </div>
  );
};

const SelectField: React.FC<{
  label: string;
  value: string;
  options: { value: string; label: string }[];
  placeholder: string;
  disabled?: boolean;
  onChange: (value: string) => void;
}> = ({ label, value, options, placeholder, disabled, onChange }) => (
  <Field label={label}>
    {(id) => (
      <div className="relative">
        <select
          id={id}
          value={value}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          // Override the global select styles from globals.css
          className={`${inputClass} appearance-none py-0! pl-3! pr-9! rounded-lg! ${value ? "" : "text-agray!"}`}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <ChevronDown
          size={16}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-agray"
        />
      </div>
    )}
  </Field>
);

interface CreateRiderModalProps {
  open: boolean;
  onClose: () => void;
  onCreated?: (riderId: string) => void;
}

const CreateRiderModal: React.FC<CreateRiderModalProps> = ({ open, onClose, onCreated }) => {
  const createRider = useCreateRider();
  const zones = useZones();
  const showToast = useToastStore((s) => s.showToast);
  const [form, setForm] = useState<FormState>(EMPTY);
  const [showPassword, setShowPassword] = useState(false);

  const update = (key: keyof FormState, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    createRider.reset();
  };

  const isComplete = Boolean(
    form.fullName.trim() &&
      form.phone.trim() &&
      form.email.trim() &&
      form.password.length >= MIN_PASSWORD &&
      form.zoneId &&
      form.vehicleType
  );

  const handleClose = () => {
    setForm(EMPTY);
    setShowPassword(false);
    createRider.reset();
    onClose();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isComplete) return;
    createRider.mutate(
      {
        fullName: form.fullName.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
        password: form.password,
        zoneId: Number(form.zoneId),
        vehicleType: form.vehicleType,
        status: "available",
      },
      {
        onSuccess: (res) => {
          showToast(res.message || `${res.data.rider.fullName} was added.`);
          onCreated?.(String(res.data.rider.id));
          handleClose();
        },
      }
    );
  };

  return (
    <Modal open={open} onClose={handleClose} title="Create New Rider" subtitle="Add a rider to your fleet">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-5">
        <Field label="Full Name">
          {(id) => (
            <input
              id={id}
              value={form.fullName}
              onChange={(e) => update("fullName", e.target.value)}
              placeholder="e.g. Kunle Adeyemi"
              autoComplete="off"
              className={inputClass}
              required
            />
          )}
        </Field>
        <Field label="Phone Number">
          {(id) => (
            <input
              id={id}
              type="tel"
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
              placeholder="+2348000000000"
              className={inputClass}
              required
            />
          )}
        </Field>
        <Field label="Email">
          {(id) => (
            <input
              id={id}
              type="email"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              placeholder="rider@email.com"
              autoComplete="off"
              className={inputClass}
              required
            />
          )}
        </Field>
        <Field label="Password" hint={`At least ${MIN_PASSWORD} characters. The rider uses this to log in.`}>
          {(id) => (
            <div className="relative">
              <input
                id={id}
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={(e) => update("password", e.target.value)}
                autoComplete="new-password"
                minLength={MIN_PASSWORD}
                className={`${inputClass} pr-10`}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-agray hover:text-dark-gray"
              >
                {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
              </button>
            </div>
          )}
        </Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <SelectField
            label="Zone"
            value={form.zoneId}
            disabled={zones.isLoading}
            options={(zones.data ?? []).map((z) => ({
              value: String(z.id),
              label: `${z.name}, ${z.state}`,
            }))}
            placeholder={zones.isLoading ? "Loading zones..." : "Select zone"}
            onChange={(v) => update("zoneId", v)}
          />
          <SelectField
            label="Vehicle Type"
            value={form.vehicleType}
            options={VEHICLE_TYPES.map((v) => ({ value: v, label: vehicleLabel(v) }))}
            placeholder="Select vehicle"
            onChange={(v) => update("vehicleType", v)}
          />
        </div>
        {zones.error && <p className="text-xs text-ared">Couldn&apos;t load zones: {zones.error.message}</p>}

        <p className="flex gap-2 rounded-lg bg-orange-50 p-3 text-xs text-abrown">
          <Info size={16} className="shrink-0 text-aorange" />
          Share the email and password with the rider so they can log in to the rider app.
        </p>

        {createRider.error && (
          <p role="alert" className="text-sm text-ared">
            {createRider.error.message}
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
            disabled={!isComplete || createRider.isPending}
            className="h-10 flex-1 rounded-lg bg-aorange text-sm font-medium text-white disabled:bg-orange-200 disabled:cursor-not-allowed"
          >
            {createRider.isPending ? "Creating..." : "Create Rider"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateRiderModal;
