import { StaticImageData } from "next/image";

export interface StatType {
  icon: StaticImageData;
  title: string;
  value: string;
  unit: string;
  trend: {direction:string, value: string};
  caption: string;
  highlighted?: boolean;
  accent?: string;
}
