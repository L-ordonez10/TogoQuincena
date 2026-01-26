"use client";

import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { memo } from "react";

interface FormFieldProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  type?: string;
  placeholder?: string;
  className?: string;
  required?: boolean;
}

export const FormField = memo(function FormField({
  label,
  value,
  onChange,
  error,
  type = "text",
  placeholder,
  className = "border-none shadow-[0px_4px_4px_0px_#00000040]",
  required = false,
}: FormFieldProps) {
  return (
    <Field>
      <FieldLabel className="text-base font-normal">
        {label}
        {required && <span className="text-rose-500 ml-1">*</span>}
      </FieldLabel>
      <Input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={className}
      />
      {error && (
        <div className="text-rose-500 font-bold text-sm mt-1">
          {error}
        </div>
      )}
    </Field>
  );
});
