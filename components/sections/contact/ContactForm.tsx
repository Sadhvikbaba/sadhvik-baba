"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";
import { FiLock, FiSend } from "react-icons/fi";
import FormInput from "./FormInput";
import SubmitButton from "./SubmitButton";

interface IFormInputs {
  name: string;
  email: string;
  company?: string;
  subject?: string;
  message: string;
}

export default function ContactForm() {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<IFormInputs>();
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const onSubmit = async (data: IFormInputs) => {
    setSubmitError("");
    try {
      if (
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID && 
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID && 
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      ) {
        await emailjs.send(
          process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
          process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
          data as any,
          process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
        );
      } else {
        // Fallback for development if env variables aren't set
        console.log("Form submitted: ", data);
        await new Promise((resolve) => setTimeout(resolve, 1500));
      }
      
      setIsSuccess(true);
      reset();
      
      // Reset success state after a few seconds
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      console.error(error);
      setSubmitError("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="p-8 rounded-2xl bg-[var(--color-glass-bg)] border border-[var(--color-glass-border)] shadow-xl relative overflow-hidden h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-xl font-bold text-[var(--color-hero-heading)]">Send a Message</h3>
        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[var(--color-hero-button-bg)] text-[var(--color-hero-button-text)]/70">
          <FiSend className="w-4 h-4" />
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 relative z-10 flex-grow flex flex-col">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormInput
            id="name"
            label="Your Name"
            icon="name"
            register={register("name", { required: "Name is required" })}
            error={errors.name}
          />
          <FormInput
            id="email"
            type="email"
            label="Your Email"
            icon="email"
            register={register("email", { 
              required: "Email is required",
              pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" }
            })}
            error={errors.email}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormInput
            id="company"
            label="Company (Optional)"
            icon="company"
            register={register("company")}
          />
          <FormInput
            id="subject"
            label="Subject"
            icon="subject"
            register={register("subject")}
          />
        </div>

        <div className="flex-grow flex flex-col">
          <FormInput
            id="message"
            type="textarea"
            label="Message"
            placeholder="Tell me about your project, opportunity, or idea..."
            register={register("message", { required: "Message is required", minLength: { value: 10, message: "Message must be at least 10 characters" } })}
            error={errors.message}
          />
        </div>

        {submitError && (
          <div className="text-red-500 text-sm mt-2">{submitError}</div>
        )}

        <div className="pt-4 mt-auto">
          <SubmitButton isSubmitting={isSubmitting} isSuccess={isSuccess} />
        </div>

        <div className="pt-4 flex items-center justify-center gap-2 text-xs text-[var(--color-hero-description)]/70">
          <FiLock className="w-3 h-3" />
          <span>Your information is safe with me. I will never share it.</span>
        </div>
      </form>
    </div>
  );
}
