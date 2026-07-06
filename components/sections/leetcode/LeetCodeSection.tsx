import React from "react";
import LeetCodeDashboard from "./LeetCodeDashboard";
import { fetchLeetCodeData } from "@/lib/leetcode";

interface LeetCodeSectionProps {
  username?: string;
}

export default async function LeetCodeSection({ username = "sadhvik_baba_patibandla" }: LeetCodeSectionProps) {
  // Fetch LeetCode GQL statistics on the server side (with Next.js cache settings)
  const data = await fetchLeetCodeData(username);

  return (
    <section className="relative z-30 w-full min-h-screen py-12 lg:py-20 flex items-center justify-center border-b border-[#E6E1D3]/50 dark:border-slate-900/40 bg-[#F5F2EB] dark:bg-[#08111F] transition-colors duration-500">
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] rounded-full blur-3xl pointer-events-none z-0 bg-[#B57552]/3 dark:bg-[#71B7FF]/3" />

      {/* Grid Content Container */}
      <div className="relative z-10 w-full px-6 md:px-16 lg:px-24">
        <LeetCodeDashboard data={data} />
      </div>
    </section>
  );
}
