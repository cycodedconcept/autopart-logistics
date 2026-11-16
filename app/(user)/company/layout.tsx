"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import CompanySidebar from "@/components/molecules/company/companySidebar";
import CompanyTopbar from "@/components/molecules/company/companyTopbar";
import Toast from "@/components/molecules/toast";
import { useHydrated } from "@/hooks/useHydrated";
import { useAuthStore } from "@/store/authStore";

export default function CompanyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const hydrated = useHydrated();
  const token = useAuthStore((s) => s.token);
  const isSignedIn = hydrated && Boolean(token);

  // No session, or it was cleared after a 401: send the user to log in
  useEffect(() => {
    if (hydrated && !token) router.replace("/login");
  }, [hydrated, token, router]);

  if (!isSignedIn) {
    return (
      <div className="flex h-screen items-center justify-center bg-background text-agray">
        <Loader2 size={22} className="animate-spin" aria-label="Loading" />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-background">
      <CompanySidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex min-w-0 flex-1 flex-col">
        <CompanyTopbar onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
      <Toast />
    </div>
  );
}
