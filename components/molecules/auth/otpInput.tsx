"use client";

import { useEffect, useRef } from "react";

interface OtpInputProps {
  value: string;
  onChange: (value: string) => void;
  length?: number;
  hasError?: boolean;
}

const OtpInput: React.FC<OtpInputProps> = ({
  value,
  onChange,
  length = 6,
  hasError = false,
}) => {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  // Latest value, so fast typing doesn't build on a stale render
  const valueRef = useRef(value);
  useEffect(() => {
    valueRef.current = value;
  }, [value]);

  // Empty boxes are stored as spaces so later digits keep their position
  const toDigits = (v: string) =>
    Array.from({ length }, (_, i) => (v[i] && v[i] !== " " ? v[i] : ""));
  const digits = toDigits(value);

  const focusAt = (index: number) => {
    inputsRef.current[Math.max(0, Math.min(index, length - 1))]?.focus();
  };

  const setDigit = (index: number, digit: string) => {
    if (index < 0) return;
    const next = toDigits(valueRef.current).map((d) => d || " ");
    next[index] = digit || " ";
    const nextValue = next.join("").trimEnd();
    valueRef.current = nextValue;
    onChange(nextValue);
  };

  const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const digit = e.target.value.replace(/\D/g, "").slice(-1);
    if (!digit) return;
    setDigit(index, digit);
    focusAt(index + 1);
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      if (digits[index]) {
        setDigit(index, "");
      } else {
        setDigit(index - 1, "");
        focusAt(index - 1);
      }
    } else if (e.key === "ArrowLeft") {
      focusAt(index - 1);
    } else if (e.key === "ArrowRight") {
      focusAt(index + 1);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
    if (!pasted) return;
    valueRef.current = pasted;
    onChange(pasted);
    focusAt(pasted.length);
  };

  return (
    <div className="flex items-center justify-center gap-2 sm:gap-3">
      {digits.map((digit, i) => (
        <input
          key={i}
          ref={(el) => {
            inputsRef.current[i] = el;
          }}
          type="text"
          inputMode="numeric"
          autoComplete={i === 0 ? "one-time-code" : "off"}
          maxLength={1}
          value={digit}
          placeholder="-"
          aria-label={`Digit ${i + 1}`}
          onChange={(e) => handleChange(i, e)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={handlePaste}
          onFocus={(e) => e.target.select()}
          className={`size-12 sm:size-14 rounded-lg border bg-white text-center text-xl font-medium text-dark-gray placeholder:text-agray outline-none transition-colors ${
            hasError
              ? "border-ared"
              : digit
                ? "border-agray-border focus:border-aorange"
                : "border-alight-gray-border focus:border-aorange"
          }`}
        />
      ))}
    </div>
  );
};

export default OtpInput;
