"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Button from "@/components/atoms/button";
import { useRegister } from "@/app/libs/queries";
import AuthCard from "./authCard";
import AuthInput from "./authInput";
import PasswordStrength, { getPasswordChecks } from "./passwordStrength";
import SocialButtons from "./socialButtons";

const RegisterForm = () => {
  const router = useRouter();
  const register = useRegister();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address:"",
    password: "",
    confirmPassword: "",
  });
  const [validationError, setValidationError] = useState("");
  const error = validationError || register.error?.message || "";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setValidationError("");
    register.reset();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (getPasswordChecks(form.password).some((c) => !c.met)) {
      setValidationError("Please choose a stronger password.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setValidationError("Passwords do not match.");
      return;
    }
    register.mutate(
      {
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        address: form.address.trim(),
        password: form.password,
      },
      { onSuccess: () => router.push("/company/dashboard") }
    );
  };

  return (
    <AuthCard
      title="Create a new account"
      subtitle="Sign up with your email and start managing your deliveries more efficiently."
      footer={
        <p className="text-sm text-light-gray">
          Have an account?{" "}
          <Link href="/login" className="ml-1 font-semibold text-aorange">
            Log in
          </Link>
        </p>
      }
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <AuthInput
          label="Company Name"
          name="name"
          placeholder="Input text here"
          autoComplete="organization"
          value={form.name}
          onChange={handleChange}
          required
        />
        <AuthInput
          label="Email"
          name="email"
          type="email"
          placeholder="Input text here"
          autoComplete="email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <AuthInput
          label="Phone Number"
          name="phone"
          type="text"
          placeholder="Input phone number here"
          autoComplete="tel"
          value={form.phone}
          onChange={handleChange}
          required
        />
        <AuthInput
          label="Address"
          name="address"
          type="text"
          placeholder="Input address here"
          autoComplete="street-address"
          value={form.address}
          onChange={handleChange}
          required
        />
        <AuthInput
          label="Password"
          name="password"
          type="password"
          autoComplete="new-password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <PasswordStrength password={form.password} />
        <AuthInput
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          value={form.confirmPassword}
          onChange={handleChange}
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
          isLoading={register.isPending}
          className="w-full h-13.5 rounded-lg"
        >
          Sign Up
        </Button>
      </form>

      <p className="text-center text-sm text-agray">Or continue with</p>

      <SocialButtons action="Sign Up" />
    </AuthCard>
  );
};

export default RegisterForm;
