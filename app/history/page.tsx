"use client";

import { supabase } from "@/lib/supabase";
import { Bug, SearchX } from "lucide-react";
import { useEffect, useState } from "react";

interface Bug {
  id: string;
  label: string;
  error_text: string;
  basic_explanation: string;
  senior_dev_explanation: string;
  suggested_fix: string;
  created_at: string;
  tags: string;
}

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

export default function History() {
  const [bugs, setBugs] = useState<Bug[]>([]);

  useEffect(() => {
    const fetchSavedBugs = async () => {
      const { data } = await supabase.from("bugs").select("*");

      if (data) setBugs(data);
    };

    fetchSavedBugs();
  }, []);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Bug History
        </h1>
        <p className="mt-2 text-sm text-zinc-400">
          All your previously explained bugs.
        </p>
      </div>

      <div className="space-y-5">
        {bugs.length > 0 ? (
          bugs.map((bug, index) => (
            <div
              key={bug.id}
              className="group rounded-2xl border border-zinc-800 bg-zinc-950/80 p-6 shadow-sm transition-all duration-200 hover:border-zinc-700 hover:bg-zinc-900/80"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex-1">
                  <h2 className="text-lg font-semibold leading-snug text-zinc-100">
                    {bug.label}
                  </h2>
                  <p className="mt-2 text-xs text-zinc-500">
                    {bug?.created_at
                      ? dateFormatter.format(new Date(bug.created_at))
                      : ""}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {JSON.parse(bug.tags).map((tag: string) => (
                    <span
                      key={tag}
                      className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <p className="mt-4 text-sm leading-6 text-zinc-400">
                {bug.basic_explanation}
              </p>
            </div>
          ))
        ) : (
          <div className="rounded-3xl border border-dashed border-zinc-800 bg-zinc-950/60 px-6 py-12 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900 text-zinc-400">
              <SearchX className="h-7 w-7" />
            </div>

            <h2 className="mt-5 text-lg font-semibold text-zinc-100">
              No bug history yet
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-zinc-400">
              You have not saved any bug explanations yet. Once you start
              analyzing bugs, they will appear here.
            </p>

            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900 px-4 py-2 text-xs text-zinc-400">
              <Bug className="h-4 w-4" />
              Your saved explanations will show up here
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
