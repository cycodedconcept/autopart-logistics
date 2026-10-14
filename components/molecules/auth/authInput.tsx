"use client";

import { useId, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface AuthInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "className"> {
  label: string;
  className?: string;
  hasError?: boolean;
}

const AuthInput: React.FC<AuthInputProps> = ({
  label,
  type = "text",
  className = "",
  id,
  placeholder,
  value,
  onFocus,
  onBlur,
  hasError = false,
  ...props
}) => {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const isPassword = type === "password";
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  // Label floats into the border once the field is focused or filled;
  // until then it acts as the placeholder.
  const isActive = isFocused || Boolean(value);

  const borderColor = hasError
    ? "border-ared"
    : `${isActive ? "border-agray-border" : "border-alight-gray-border"} focus-within:border-aorange`;

  return (
    <fieldset
      className={`relative border rounded-lg px-3 bg-white transition-colors ${
        isActive ? "pb-2.5 pt-0" : "py-2.5"
      } ${borderColor} ${className}`}
    >
      {isActive ? (
        <legend className={`px-1.5 text-sm ${hasError ? "text-ared" : "text-dark-gray"}`}>
          <label htmlFor={inputId}>{label}</label>
        </legend>
      ) : (
        <label htmlFor={inputId} className="sr-only">
          {label}
        </label>
      )}
      <div className="flex items-center gap-2 h-6">
        <input
          id={inputId}
          type={isPassword && showPassword ? "text" : type}
          placeholder={isActive ? placeholder : label}
          value={value}
          aria-invalid={hasError || undefined}
          onFocus={(e) => {
            setIsFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            onBlur?.(e);
          }}
          className={`flex-1 min-w-0 bg-transparent outline-none text-sm text-dark-gray ${
            isActive ? "placeholder:text-dark-gray" : "placeholder:text-agray"
          }`}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((s) => !s)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="shrink-0 text-dark-gray"
          >
            {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
          </button>
        )}
      </div>
    </fieldset>
  );
};

export default AuthInput;
