"use client";

import { FiSend, FiCheck } from "react-icons/fi";

interface SubmitButtonProps {
  isSubmitting: boolean;
  isSuccess: boolean;
}

export default function SubmitButton({ isSubmitting, isSuccess }: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={isSubmitting || isSuccess}
      className={`group relative w-full flex items-center justify-center gap-2 py-4 rounded-xl font-medium text-[var(--color-hero-button-text)] transition-all duration-300 overflow-hidden ${
        isSuccess
          ? 'bg-green-600 hover:bg-green-700'
          : 'bg-[var(--color-hero-button-bg)] hover:bg-[var(--color-hero-button-hover)] border border-[var(--color-hero-button-border)] hover:border-[var(--color-hero-accent)]/30 hover:shadow-lg hover:-translate-y-0.5'
      } disabled:opacity-80 disabled:cursor-not-allowed`}
    >
      <div className="relative z-10 flex items-center gap-2">
        {isSubmitting ? (
          <>
            <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Sending...
          </>
        ) : isSuccess ? (
          <>
            <FiCheck className="w-5 h-5" />
            Message Sent Successfully
          </>
        ) : (
          <>
            Send Message
            <FiSend className="w-4 h-4 transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:rotate-12 transition-transform duration-300" />
          </>
        )}
      </div>
      
      {!isSubmitting && !isSuccess && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
      )}
    </button>
  );
}
