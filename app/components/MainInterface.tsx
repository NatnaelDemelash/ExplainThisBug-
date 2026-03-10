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
        <h1 className="mb-4 bg-linear-to-r from-white to-gray-400 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl md:text-6xl">
          Explain This Bug
        </h1>

        <p className="mb-10 text-[15px] text-gray-400 sm:text-lg">
          Paste your error. Understand it instantly.
        </p>

        <div className="relative mb-7 w-full">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="relative w-full rounded-[10px] border-2 border-white/10 bg-white/[0.02] px-5 py-4 text-[15px] font-light leading-6  placeholder:font-normal placeholder:text-gray-500 transition-all duration-200 hover:border-white/15 focus:border-[#10b981]/70 focus:outline-none"
            placeholder={`TypeError: Cannot read properties of undefined (reading 'map')
    at UserList (src/components/UserList.tsx:18:23)
    at renderWithHooks (react-dom.development.js:16305:18)
    at mountIndeterminateComponent (react-dom.development.js:20074:13)`}
            rows={5}
          />

          <div className="absolute bottom-3 right-4 text-xs text-gray-500">
            {text.length} / 500
          </div>
        </div>

        <button
          onClick={handleExplain}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          disabled={!text.trim() || isLoading}
          className="inline-flex items-center justify-center gap-2.5 rounded-lg bg-[#10b981] px-7 py-3.5 text-sm font-medium text-white transition-all duration-200 hover:bg-[#0ea371] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4.5 w-4.5 animate-spin" />
              <span>Analyzing...</span>
            </>
          ) : (
            <>
              <span>Explain this Bug</span>
              <ArrowRight
                className={`h-4.5 w-4.5 transition-transform duration-200 ${
                  isHovered ? "translate-x-0.5" : ""
                }`}
              />
            </>
          )}
        </button>
      </div>
    </section>
  );
}
