import AuthFooter from "@/components/molecules/auth/authFooter";
import AuthHeader from "@/components/molecules/auth/authHeader";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AuthHeader />
      <main className="flex-1 flex justify-center px-4 py-6">{children}</main>
      <AuthFooter />
    </div>
  );
}
