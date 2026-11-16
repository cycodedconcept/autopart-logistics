interface PasswordStrengthProps {
  password: string;
}

export const getPasswordChecks = (password: string) => [
  {
    met: password.length >= 8,
    label: "At least 8 characters",
    error: "Your password has not reached 8 characters!",
  },
  {
    met: /\d/.test(password),
    label: "At least 1 number",
    error: "Your password needs at least 1 number!",
  },
  {
    met: /[a-z]/.test(password) && /[A-Z]/.test(password),
    label: "Both upper and lower case letters",
    error: "Your password needs both upper and lower case letters!",
  },
];

const PasswordStrength: React.FC<PasswordStrengthProps> = ({ password }) => {
  const checks = getPasswordChecks(password);
  const hasSymbol = /[^A-Za-z0-9]/.test(password);
  const score = checks.filter((c) => c.met).length + (hasSymbol ? 1 : 0);
  // Only the first unmet rule is shown as an error, the rest stay as hints
  const firstUnmet = checks.findIndex((c) => !c.met);

  const barColor =
    score <= 2 ? "bg-ared" : score === 3 ? "bg-ayellow" : "bg-agreen";

  if (!password) return null;

  return (
    <div className="flex flex-col gap-2">
      <div className="grid grid-cols-4 gap-2">
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className={`h-1 rounded-full ${i < score ? barColor : "bg-alight-gray-border"}`}
          />
        ))}
      </div>
      <ul className="flex flex-col gap-1 text-sm">
        {checks.map((check, i) => {
          if (i === firstUnmet) {
            return (
              <li key={check.label} className="text-ared">
                {check.error}
              </li>
            );
          }
          return (
            <li
              key={check.label}
              className={check.met ? "text-agreen" : "text-agray"}
            >
              {check.label}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default PasswordStrength;
