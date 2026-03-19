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
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Results() {
  const errorText = useStore((state) => state.errorText);
  const explanation = useStore((state) => state.explanation);
  const [saved, setSaved] = useState(false);
  const [savedId, setSavedId] = useState<string | null>(null);
  const [isBookmarkHovered, setIsBookmarkHovered] = useState(false);
  const [isBookmarkAnimating, setIsBookmarkAnimating] = useState(false);
  const router = useRouter();

  const parsed: Explanation = JSON.parse(explanation ?? "{}");

  const { basic_explanation, senior_dev_explanation }: Explanation = parsed;

  // Redirect to home if no explanation in state
  useEffect(() => {
    if (!explanation) {
      router.push("/");
    }
  }, [explanation]);

  const handleSave = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    setIsBookmarkAnimating(true);
    const { data } = await supabase
      .from("bugs")
      .insert({
        error_text: errorText,
        label: parsed.label,
        basic_explanation: parsed.basic_explanation,
        senior_dev_explanation: parsed.senior_dev_explanation,
        suggested_fix: JSON.stringify(parsed.suggested_fix),
        tags: "[]",
        user_id: user?.id,
      })
      .select();

    if (data) {
      setSavedId(data[0].id);
      setSaved(true);
    }

    setTimeout(() => setIsBookmarkAnimating(false), 300);
  };

  const handleUnsave = async () => {
    setIsBookmarkAnimating(true);
    await supabase.from("bugs").delete().eq("id", savedId);
    setSaved(false);
    setSavedId(null);
    setTimeout(() => setIsBookmarkAnimating(false), 300);
  };

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isBookmarkAnimating) return;
    saved ? handleUnsave() : handleSave();
  };

  return (
    <section className="mt-6 px-4 sm:px-6">
      <div className="mx-auto flex max-w-5xl flex-col gap-4">
        {/* Bookmark Icon */}
        <div className="flex justify-end my-2">
          <button
            onClick={handleBookmarkClick}
            onMouseEnter={() => setIsBookmarkHovered(true)}
            onMouseLeave={() => setIsBookmarkHovered(false)}
            className={`
              group relative p-2 -m-2 rounded-lg
              transition-all duration-200 ease-out
              ${isBookmarkAnimating ? "cursor-wait" : "cursor-pointer"}
              focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50
            `}
            aria-label={saved ? "Remove from saved" : "Save to bookmarks"}
          >
            <div className="relative">
              <Bookmark
                size={24}
                className={`
                  transition-all duration-300 ease-out
                  ${saved ? "fill-emerald-500 text-emerald-500" : "fill-none text-zinc-400"}
                  ${isBookmarkHovered && !saved ? "text-zinc-300 scale-110" : ""}
                  ${isBookmarkHovered && saved ? "text-emerald-400 scale-110" : ""}
                `}
                style={{
                  transform: isBookmarkHovered ? "scale(1.1)" : "scale(1)",
                  transition:
                    "transform 0.2s ease-out, color 0.2s ease-out, fill 0.2s ease-out",
                }}
              />

              {/* Ping animation overlay */}
              {isBookmarkAnimating && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-8 w-8 rounded-full bg-emerald-500/30 animate-ping" />
                </div>
              )}
            </div>

            {/* Tooltip */}
            <span
              className="
              absolute right-0 top-8 z-10
              px-2 py-1 text-xs font-medium
              bg-zinc-900 border border-zinc-800 rounded-md
              text-zinc-300 whitespace-nowrap
              opacity-0 group-hover:opacity-100
              transition-opacity duration-150
              pointer-events-none
            "
            >
              {saved ? "Saved" : "Save for later"}
            </span>
          </button>
        </div>

        {/* Original Error */}
        <div
          className="
          group rounded-xl border border-zinc-800/70 bg-zinc-950/50 p-5
          transition-all duration-200 hover:border-zinc-700/70 hover:bg-zinc-950
        "
        >
          <h2 className="text-xs font-medium uppercase tracking-wider text-zinc-500">
            Original Error
          </h2>

          <div className="mt-3 rounded-lg border border-red-950/30 bg-red-950/10 p-4">
            <p className="whitespace-pre-wrap break-words font-mono text-sm leading-6 text-red-400/90">
              {errorText || "No error message yet."}
            </p>
          </div>
        </div>

        {/* Explanations */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div
            className="
            group rounded-xl border border-zinc-800/70 bg-zinc-950/50 p-5
            transition-all duration-200 hover:border-zinc-700/70 hover:bg-zinc-950
          "
          >
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-emerald-500/5 group-hover:bg-emerald-500/10 transition-colors duration-200">
                <Lightbulb className="h-4 w-4 text-emerald-400" />
              </div>
              <h2 className="text-sm font-medium text-zinc-300">
                Basic Explanation
              </h2>
            </div>

            <p className="mt-3 text-sm leading-7 text-zinc-400">
              {basic_explanation}
            </p>
          </div>

          <div
            className="
            group rounded-xl border border-zinc-800/70 bg-zinc-950/50 p-5
            transition-all duration-200 hover:border-zinc-700/70 hover:bg-zinc-950
          "
          >
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-emerald-500/5 group-hover:bg-emerald-500/10 transition-colors duration-200">
                <CodeXmlIcon className="h-4 w-4 text-emerald-400" />
              </div>
              <h2 className="text-sm font-medium text-zinc-300">Senior Dev</h2>
            </div>

            <p className="mt-3 text-sm leading-7 text-zinc-400">
              {senior_dev_explanation}
            </p>
          </div>
        </div>

        {/* Suggested Fix */}
        <div
          className="
          group rounded-xl border border-zinc-800/70 bg-zinc-950/50 p-5
          transition-all duration-200 hover:border-zinc-700/70 hover:bg-zinc-950
        "
        >
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-emerald-500/5 group-hover:bg-emerald-500/10 transition-colors duration-200">
              <Wrench className="h-4 w-4 text-emerald-400" />
            </div>
            <h2 className="text-sm font-medium text-zinc-300">Suggested Fix</h2>
          </div>

          <div className="mt-4 overflow-hidden rounded-lg border border-zinc-800/70 bg-black/60">
            <pre className="p-5 text-sm leading-7 whitespace-pre-wrap break-words">
              <code className="font-mono font-light text-emerald-400/90">
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
