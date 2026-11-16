interface AuthCardProps {
  title: string;
  subtitle?: React.ReactNode;
  children: React.ReactNode;
  // Rendered under the card, e.g. "Have an account? Log in"
  footer?: React.ReactNode;
  className?: string;
}

const AuthCard: React.FC<AuthCardProps> = ({
  title,
  subtitle,
  children,
  footer,
  className = "",
}) => {
  return (
    <div className="w-full max-w-130 flex flex-col items-center gap-6">
      <div
        className={`w-full bg-white rounded-2xl py-6 px-4 md:p-6 flex flex-col gap-6 ${className}`}
      >
        <div className="flex flex-col gap-2">
          <h1 className="font-instrument-sans text-2xl md:text-[32px] leading-tight font-medium text-dark-gray">
            {title}
          </h1>
          {subtitle && <p className="text-sm md:text-base text-light-gray">{subtitle}</p>}
        </div>
        {children}
      </div>
      {footer}
    </div>
  );
};

export default AuthCard;

