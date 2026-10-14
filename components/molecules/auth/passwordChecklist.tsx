import { Check } from "lucide-react";
import { getPasswordChecks } from "./passwordStrength";

interface PasswordChecklistProps {
  password: string;
}

const PasswordChecklist: React.FC<PasswordChecklistProps> = ({ password }) => {
  const rules = [
    ...getPasswordChecks(password),
    { met: /[^A-Za-z0-9]/.test(password), label: "At least 1 symbol" },
  ];

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm">
      {rules.map((rule) => (
        <li
          key={rule.label}
          className={`flex items-center gap-2 ${rule.met ? "text-agreen" : "text-agray"}`}
        >
          <span
            className={`flex items-center justify-center size-4 rounded-full shrink-0 ${
              rule.met ? "bg-agreen text-white" : "border border-agray-border"
            }`}
          >
            {rule.met && <Check size={10} strokeWidth={3} />}
          </span>
          {rule.label}
        </li>
      ))}
    </ul>
  );
};

export default PasswordChecklist;
