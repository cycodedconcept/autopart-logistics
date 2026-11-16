"use client";

import { useState } from "react";
import NewPasswordForm from "./newPasswordForm";
import SuccessCard from "./successCard";
import VerifyCodeForm from "./verifyCodeForm";

type ResetStep = "verify" | "newPassword" | "success";

const ResetPasswordFlow = () => {
  const [step, setStep] = useState<ResetStep>("verify");

  if (step === "verify") {
    return <VerifyCodeForm onVerified={() => setStep("newPassword")} />;
  }

  if (step === "newPassword") {
    return <NewPasswordForm onSuccess={() => setStep("success")} />;
  }

  return (
    <SuccessCard
      title="Successfully updated!"
      message="Your password has been changed. You can now log in with your new password."
      actionLabel="Login"
      actionHref="/login"
    />
  );
};

export default ResetPasswordFlow;
