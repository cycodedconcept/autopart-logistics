export type StatTone = "orange" | "purple" | "green" | "blue" | "red" | "yellow";
export type TrendDirection = "up" | "down" | "neutral";

export interface CompanyStat {
  id: string;
  label: string;
  value: string;
  caption: string;
  tone: StatTone;
  trend?: { direction: TrendDirection; value: string };
  // Colour the value with the tone, e.g. for balances
  colorValue?: boolean;
}

export interface EarningsPoint {
  day: string;
  amount: number;
}

export interface JobStatusSlice {
  label: string;
  value: number;
  color: string;
}

export interface Rider {
  id: string;
  name: string;
  jobs: number;
  delivered: number;
  earnings: number;
}

export interface ActivityItem {
  id: string;
  rider: string;
  message: string;
  time: string;
}

export type RiderStatus = "active" | "on_delivery" | "offline" | "suspended";

export interface RiderDetails extends Rider {
  code: string;
  phone: string;
  email: string;
  zone: string;
  vehicle: string;
  rating: number;
  joined: string;
  status: RiderStatus;
  photo?: string;
}

export interface EarningsSeriesPoint {
  label: string;
  gross: number;
  net: number;
}

export interface RiderEarning {
  riderId: string;
  name: string;
  jobs: number;
  gross: number;
  net: number;
}

