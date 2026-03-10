"use client";

import { ArrowRight, Bug, Loader2 } from "lucide-react";
import { useState } from "react";

export default function MainInterface() {
  const [isFocused, setIsFocused] = useState(false);
  const [text, setText] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleExplain = () => {
    if (!text.trim()) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-[#10b981]/[0.03] blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-[#10b981]/[0.03] blur-3xl" />
      </div>

      {/* Floating bug decorations */}
      <div className="absolute left-8 top-1/3 hidden opacity-15 lg:block">
        <Bug
          className="h-11 w-11 animate-bounce text-[#10b981]"
          style={{ animationDuration: "3s" }}
        />
      </div>
      <div className="absolute right-8 top-2/3 hidden opacity-15 lg:block">
        <Bug
          className="h-11 w-11 animate-bounce text-[#10b981]"
          style={{ animationDuration: "4s", animationDelay: "1s" }}
        />
      </div>

      <div className="w-full max-w-3xl text-center">
        <h1 className="mb-4 bg-linear-to-r from-white to-gray-400 bg-clip-text text-4xl font-bold tracking-tighter text-transparent sm:text-5xl md:text-6xl">
          Explain This Bug
        </h1>

        <p className="mb-10 text-[13px] text-gray-500 sm:text-lg tracking-tighter">
          Paste your error. Understand it instantly.
        </p>

        <div className="relative mb-7 w-full">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full rounded-[10px] border border-white/8 bg-white/2 px-5 py-4 font-mono text-[13px] font-light leading-6 tracking-[-0.02em] text-zinc-300 placeholder:font-light placeholder:leading-6 placeholder:tracking-[-0.02em] placeholder:text-zinc-500 focus:border-white/12 focus:outline-none"
            placeholder={`TypeError: Cannot read properties of undefined (reading 'map')
    at Array.map (<anonymous>)
    at renderList (/app/components/List.tsx:15:23)
    at processTicksAndRejections (node:internal/process/task_queues:95:5)`}
            rows={6}
          />

          <div className="absolute bottom-3 right-4 text-xs text-gray-500">
            {text.length} / 500
          </div>
        </div>
        <button
          onClick={handleExplain}
          disabled={!text.trim() || isLoading}
          className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.03] px-4 py-2.5 text-[13px] font-medium text-zinc-200 transition-colors duration-150 hover:bg-white/[0.06] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Analyzing</span>
            </>
          ) : (
            <>
              <span>Explain bug</span>
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
      </div>
    </section>
  );
}
