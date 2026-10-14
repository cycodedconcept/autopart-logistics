"use client";

import { useState } from "react";
import Link from "next/link";
import Button from "@/components/atoms/button";
import AuthCard from "./authCard";
import AuthInput from "./authInput";
import PasswordChecklist from "./passwordChecklist";
import { getPasswordChecks } from "./passwordStrength";

interface NewPasswordFormProps {
  onSuccess: () => void;
}

const NewPasswordForm: React.FC<NewPasswordFormProps> = ({ onSuccess }) => {
  const [form, setForm] = useState({ password: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (getPasswordChecks(form.password).some((c) => !c.met)) {
      setError("Please choose a stronger password.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setIsLoading(true);
    try {
      // TODO: send the new password to the API
      onSuccess();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthCard
      title="Create your new password"
      subtitle="Set a new, secure password to protect your account and continue managing your deliveries."
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <AuthInput
          label="Password"
          name="password"
          type="password"
          autoComplete="new-password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <PasswordChecklist password={form.password} />
        <AuthInput
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          value={form.confirmPassword}
          onChange={handleChange}
          hasError={error === "Passwords do not match."}
          required
        />

        {error && (
          <p role="alert" className="text-sm text-ared">
            {error}
          </p>
        )}

        <Button
          type="submit"
          size="lg"
          isLoading={isLoading}
          className="w-full h-13.5 rounded-lg"
        >
          Reset Password
        </Button>
        <Link
          href="/login"
          className="text-center text-sm font-medium text-light-gray hover:text-dark-gray"
        >
          Cancel
        </Link>
      </form>
    </AuthCard>
  );
};

export default NewPasswordForm;
