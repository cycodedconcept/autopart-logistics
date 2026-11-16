import { connection } from "next/server";
import DashboardView from "@/components/molecules/company/dashboardView";

const CompanyDashboard = async () => {
  // Render per request so the date in the header is always today
  await connection();
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "Africa/Lagos",
  });

  return <DashboardView today={today} />;
};

export default CompanyDashboard;
