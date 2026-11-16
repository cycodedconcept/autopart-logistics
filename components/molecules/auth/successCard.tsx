import Link from "next/link";
import { Check, Sparkle } from "lucide-react";
import Image from "next/image";
import success from "@/public/images/successCheck.png"

interface SuccessCardProps {
  title: string;
  message: string;
  actionLabel: string;
  actionHref: string;
}

const SuccessCard: React.FC<SuccessCardProps> = ({
  title,
  message,
  actionLabel,
  actionHref,
}) => {
  return (
    <div className="w-full h-full self-center max-w-130 bg-white rounded-2xl py-6 px-4 md:p-6 flex flex-col items-center gap-6 text-center">
      <div>
        <Image src={success} className="w-32 md:w-48" alt=""/>
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="font-instrument-sans text-2xl md:text-[32px] leading-tight font-medium text-dark-gray">
          {title}
        </h1>
        <p className="text-base text-light-gray">{message}</p>
      </div>

      <Link
        href={actionHref}
        className="flex items-center justify-center w-full h-13.5 rounded-lg bg-aorange text-lg font-medium text-white"
      >
        {actionLabel}
      </Link>
    </div>
  );
};

export default SuccessCard;
