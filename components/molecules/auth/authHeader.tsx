import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import wheel from "@/public/images/wheel.png";

const UsFlag = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
    <clipPath id="us-flag-clip">
      <circle cx="10" cy="10" r="10" />
    </clipPath>
    <g clipPath="url(#us-flag-clip)">
      <rect width="20" height="20" fill="#fff" />
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={i} y={i * 4.4} width="20" height="2.2" fill="#d92d20" />
      ))}
      <rect width="9" height="9" fill="#1d3b8c" />
    </g>
  </svg>
);

const AuthHeader = () => {
  return (
    <header className="flex items-center justify-between px-4 sm:px-16 py-6">
      <Link href="/" className="flex items-center gap-3">
        <span className="flex items-center justify-center size-10.5 rounded-lg bg-aorange">
          <Image src={wheel} alt="" className="w-6 brightness-0 invert" />
        </span>
        <span className="font-instrument-sans text-2xl font-semibold text-dark-gray">
          AutoParts
        </span>
      </Link>

      <button
        type="button"
        className="flex items-center gap-1.5 h-12 px-4 bg-white border border-agray-border rounded-md text-sm font-medium text-dark-gray"
      >
        <UsFlag />
        EN
        <ChevronDown size={16} />
      </button>
    </header>
  );
};

export default AuthHeader;
