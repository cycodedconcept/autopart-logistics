"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Button from "@/components/atoms/button";
import { useLogin } from "@/app/libs/queries";
import AuthCard from "./authCard";
import AuthInput from "./authInput";
import SocialButtons from "./socialButtons";

const LoginForm = () => {
  const router = useRouter();
  const login = useLogin();
  const [form, setForm] = useState({ email: "", password: "" });
  const [rememberMe, setRememberMe] = useState(false);
  const error = login.error?.message ?? "";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    login.reset();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: rememberMe is not used yet; the session is always kept in localStorage
    login.mutate(
      { identifier: form.email.trim(), password: form.password },
      { onSuccess: () => router.push("/company/dashboard") }
    );
  };

  return (
    <AuthCard
      title="Hi, welcome back!"
      subtitle="Login with your email and password so you can keep managing your deliveries."
      footer={
        <p className="text-sm text-light-gray">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="ml-1 font-semibold text-aorange">
            Create account
          </Link>
        </p>
      }
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <AuthInput
          label="Email"
          name="email"
          type="email"
          placeholder="Input text here"
          autoComplete="email"
          value={form.email}
          onChange={handleChange}
          hasError={Boolean(error)}
          required
        />
        <AuthInput
          label="Password"
          name="password"
          type="password"
          autoComplete="current-password"
          value={form.password}
          onChange={handleChange}
          hasError={Boolean(error)}
          required
        />

        {error && (
          <p role="alert" className="text-sm text-ared">
            {error}
          </p>
        )}

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm text-dark-gray cursor-pointer py-2">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="size-4 accent-aorange cursor-pointer"
            />
            Remember me
          </label>
          <Link
            href="/reset-password"
            className="text-sm font-medium text-agray"
          >
            Forgot password?
          </Link>
        </div>

        <Button
          type="submit"
          size="lg"
          isLoading={login.isPending}
          className="w-full h-13.5 rounded-lg"
        >
          Login
        </Button>
      </form>

      <p className="text-center text-sm text-agray">Or continue with</p>

      <SocialButtons action="Log In" />
    </AuthCard>
  );
};

export default LoginForm;
