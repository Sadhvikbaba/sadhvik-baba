"use client";

import { HTMLInputTypeAttribute } from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { FiAlertCircle, FiUser, FiMail, FiBriefcase, FiTag } from "react-icons/fi";
import { IconType } from "react-icons";

const iconMap: Record<string, IconType> = {
  name: FiUser,
  email: FiMail,
  company: FiBriefcase,
  subject: FiTag,
};

interface FormInputProps {
  id: string;
  label: string;
  type?: HTMLInputTypeAttribute | "textarea";
  placeholder?: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
  icon?: string;
}

export default function FormInput({ id, label, type = "text", placeholder, register, error, icon }: FormInputProps) {
  const Icon = icon ? iconMap[icon] : null;

  return (
    <div className="flex flex-col gap-1.5">
      <div className="relative">
        {Icon && (
          <div className="absolute left-4 top-3.5 text-[var(--color-hero-description)]">
            <Icon className="w-5 h-5" />
          </div>
        )}
        
        {type === "textarea" ? (
          <textarea
            id={id}
            placeholder={placeholder || label}
            className={`w-full bg-white/5 dark:bg-black/20 border ${error ? 'border-red-500 focus:border-red-500' : 'border-[var(--color-glass-border)] focus:border-[var(--color-hero-accent)]'} text-[var(--color-hero-heading)] placeholder:text-[var(--color-hero-description)]/50 rounded-xl px-4 py-3 min-h-[120px] resize-y outline-none transition-all duration-300 ${Icon ? 'pl-11' : ''}`}
            {...register}
          />
        ) : (
          <input
            id={id}
            type={type}
            placeholder={placeholder || label}
            className={`w-full bg-white/5 dark:bg-black/20 border ${error ? 'border-red-500 focus:border-red-500' : 'border-[var(--color-glass-border)] focus:border-[var(--color-hero-accent)]'} text-[var(--color-hero-heading)] placeholder:text-[var(--color-hero-description)]/50 rounded-xl px-4 py-3 outline-none transition-all duration-300 ${Icon ? 'pl-11' : ''}`}
            {...register}
          />
        )}
      </div>

      {error && (
        <div className="flex items-center gap-1.5 text-red-500 text-sm mt-1">
          <FiAlertCircle className="w-4 h-4" />
          <span>{error.message}</span>
        </div>
      )}
    </div>
  );
}
