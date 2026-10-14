import {
  Banknote,
  CalendarDays,
  CheckCircle2,
  CircleAlert,
  Clock,
  Hourglass,
  Package,
  Percent,
  Receipt,
  Truck,
  Users,
  Wallet,
} from "lucide-react";
import { CompanyStat, StatTone, TrendDirection } from "@/types/company";

const TONE_STYLES: Record<StatTone, string> = {
  orange: "bg-orange-50 text-aorange",
  purple: "bg-purple-50 text-apurple",
  green: "bg-green-50 text-agreen",
  blue: "bg-blue-50 text-blue-600",
  red: "bg-red-50 text-ared",
  yellow: "bg-yellow-50 text-yellow-600",
};

const VALUE_STYLES: Record<StatTone, string> = {
  orange: "text-aorange",
  purple: "text-apurple",
  green: "text-agreen",
  blue: "text-blue-600",
  red: "text-ared",
  yellow: "text-yellow-600",
};

const TREND_STYLES: Record<TrendDirection, string> = {
  up: "bg-green-50 text-agreen",
  down: "bg-red-50 text-ared",
  neutral: "bg-background text-agray",
};

const ICONS: Record<string, React.ElementType> = {
  riders: Users,
  jobs: Package,
  delivered: CheckCircle2,
  transit: Truck,
  failed: CircleAlert,
  pending: Clock,
  earnings: Wallet,
  completion: Percent,
  gross: Banknote,
  fees: Receipt,
  net: Wallet,
  month: CalendarDays,
  available: Wallet,
  paidOut: CheckCircle2,
  settling: Hourglass,
};

const CompanyStatCard: React.FC<{ stat: CompanyStat }> = ({ stat }) => {
  const StatIcon = ICONS[stat.id] ?? Package;

  return (
    <div className="flex flex-col rounded-xl border border-alight-gray-border bg-white p-4">
      <div className="flex items-start justify-between">
        <span
          className={`flex items-center justify-center size-8 rounded-lg ${TONE_STYLES[stat.tone]}`}
        >
          <StatIcon size={16} />
        </span>
        {stat.trend && (
          <span
            className={`rounded-full px-1.5 py-0.5 text-[11px] font-medium ${TREND_STYLES[stat.trend.direction]}`}
          >
            {stat.trend.value}
          </span>
        )}
      </div>
      <p
        className={`mt-3 font-instrument-sans text-2xl font-semibold ${
          stat.colorValue ? VALUE_STYLES[stat.tone] : "text-dark-gray"
        }`}
      >
        {stat.value}
      </p>
      <p className="text-sm text-dark-gray">{stat.label}</p>
      <p className="text-xs text-agray">{stat.caption}</p>
    </div>
  );
};

export default CompanyStatCard;
