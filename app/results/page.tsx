"use client";

interface Explanation {
  label: string;
  basic_explanation: string;
  senior_dev_explanation: string;
  suggested_fix: string[];
}

import { supabase } from "@/lib/supabase";
import useStore from "@/store/useBugStore";
import { Bookmark, CodeXmlIcon, Lightbulb, Wrench } from "lucide-react";
import { useState } from "react";

export default function Results() {
  const errorText = useStore((state) => state.errorText);
  const explanation = useStore((state) => state.explanation);
  const [saved, setSaved] = useState(false);

  const parsed: Explanation = JSON.parse(explanation ?? "{}");

  const { basic_explanation, senior_dev_explanation }: Explanation = parsed;

  const handleSave = async () => {
    await supabase.from("bugs").insert({
      error_text: errorText,
      label: parsed.label,
      basic_explanation: parsed.basic_explanation,
      senior_dev_explanation: parsed.senior_dev_explanation,
      suggested_fix: JSON.stringify(parsed.suggested_fix),
      tags: "[]",
      user_id: "anonymous",
    });

    setSaved(true);
  };

  return (
    <section className="mt-6 px-4 sm:px-6">
      <div className="mx-auto flex max-w-5xl flex-col gap-4">
        {/* Bookmark Icon */}
        <div className="flex justify-end my-2">
          <Bookmark
            color={saved ? "#3DB374" : "white"}
            fill={saved ? "#3DB374" : "none"}
            onClick={handleSave}
            className="cursor-pointer"
          />
        </div>

        {/* Original Error */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-5">
          <h2 className="text-xs font-medium uppercase tracking-wide text-zinc-500">
            Original Error
          </h2>

          <div className="mt-3 rounded-lg border border-red-950/30 bg-red-950/10 p-4 shadow-[0_0_18px_rgba(248,113,113,0.06)]">
            <p className="whitespace-pre-wrap wrapped-break-words font-mono text-sm leading-6 text-red-400">
              {errorText || "No error message yet."}
            </p>
          </div>
        </div>

        {/* Explanations */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-5 transition-colors hover:border-zinc-700">
            <div className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-emerald-400" />
              <h2 className="text-base font-semibold text-zinc-100">
                Basic Explanation
              </h2>
            </div>

            <p className="mt-4 text-sm leading-7 text-zinc-400">
              {basic_explanation}
            </p>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-5 transition-colors hover:border-zinc-700">
            <div className="flex items-center gap-2">
              <CodeXmlIcon className="h-5 w-5 text-emerald-400" />
              <h2 className="text-base font-semibold text-zinc-100">
                Senior Dev
              </h2>
            </div>

            <p className="mt-4 text-sm leading-7 text-zinc-400">
              {senior_dev_explanation}
            </p>
          </div>
        </div>

        {/* Suggested Fix */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-5">
          <div className="flex items-center gap-2">
            <Wrench className="h-5 w-5 text-emerald-400" />
            <h2 className="text-base font-semibold text-zinc-100">
              Suggested Fix
            </h2>
          </div>

          <div className="mt-4 overflow-hidden rounded-lg border border-zinc-800 bg-black/80 shadow-[0_0_24px_rgba(16,185,129,0.05)]">
            <pre className="p-5 text-sm leading-7 whitespace-pre-wrap wrap-break-word">
              <code className="font-mono font-extralight text-emerald-400">
                {parsed?.suggested_fix
                  ?.map((step, index) => `${index + 1}. ${step}`)
                  .join("\n")}
              </code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}
