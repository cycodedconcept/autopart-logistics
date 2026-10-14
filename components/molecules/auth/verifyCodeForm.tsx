"use client";

import { useState } from "react";
import Button from "@/components/atoms/button";
import AuthCard from "./authCard";
import OtpInput from "./otpInput";

const CODE_LENGTH = 6;

interface VerifyCodeFormProps {
  onVerified: (code: string) => void;
}

const VerifyCodeForm: React.FC<VerifyCodeFormProps> = ({ onVerified }) => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Gaps are stored as spaces, so count only the digits
    if (code.replace(/\D/g, "").length < CODE_LENGTH) {
      setError(`Please enter all ${CODE_LENGTH} digits.`);
      return;
    }
    setIsLoading(true);
    try {
      // TODO: verify the code with the API
      onVerified(code);
    } catch {
      setError("That code is invalid or has expired.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = () => {
    setCode("");
    setError("");
    // TODO: request a new code from the API
  };

  return (
    <AuthCard
      title={`Enter the ${CODE_LENGTH}-digit code`}
      subtitle="We've sent a verification code to your email. Please enter it below to continue."
      footer={
        <p className="text-sm text-light-gray">
          Didn&apos;t receive the code?{" "}
          <button
            type="button"
            onClick={handleResend}
            className="ml-1 font-semibold text-aorange"
          >
            Resend
          </button>
        </p>
      }
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <OtpInput
          value={code}
          length={CODE_LENGTH}
          hasError={Boolean(error)}
          onChange={(next) => {
            setCode(next);
            setError("");
          }}
        />

        {error && (
          <p role="alert" className="text-sm text-ared text-center">
            {error}
          </p>
        )}

        <Button
          type="submit"
          size="lg"
          isLoading={isLoading}
          className="w-full h-13.5 rounded-lg"
        >
          Confirm
        </Button>
      </form>
    </AuthCard>
  );
};

export default VerifyCodeForm;
