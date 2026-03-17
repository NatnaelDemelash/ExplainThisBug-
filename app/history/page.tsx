"use client";

import { supabase } from "@/lib/supabase";
import { Bug, Calendar, ChevronRight, Clock, SearchX, Tag } from "lucide-react";
import Link from "next/link";
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
  const [loading, setLoading] = useState(true);
  const [selectedBug, setSelectedBug] = useState<string | null>(null);

  useEffect(() => {
    const fetchSavedBugs = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("bugs")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;
        if (data) setBugs(data);
      } catch (error) {
        console.error("Error fetching bugs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedBugs();
  }, []);

  // Group bugs by date
  const groupedBugs = bugs.reduce((groups: { [key: string]: Bug[] }, bug) => {
    const date = new Date(bug.created_at).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(bug);
    return groups;
  }, {});

  if (loading) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-10">
        <div className="mb-8">
          <div className="h-8 w-48 bg-zinc-800/50 rounded-lg animate-pulse" />
          <div className="mt-2 h-4 w-64 bg-zinc-800/50 rounded-lg animate-pulse" />
        </div>

        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="rounded-2xl border border-zinc-800/50 bg-zinc-950/80 p-6"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="h-6 w-48 bg-zinc-800/50 rounded-lg animate-pulse" />
                  <div className="mt-2 h-4 w-32 bg-zinc-800/50 rounded-lg animate-pulse" />
                </div>
                <div className="flex gap-2">
                  <div className="h-6 w-16 bg-zinc-800/50 rounded-full animate-pulse" />
                  <div className="h-6 w-16 bg-zinc-800/50 rounded-full animate-pulse" />
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <div className="h-4 w-full bg-zinc-800/50 rounded-lg animate-pulse" />
                <div className="h-4 w-5/6 bg-zinc-800/50 rounded-lg animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
            <Bug className="h-5 w-5 text-emerald-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">
              Bug History
            </h1>
            <p className="mt-1 text-sm text-zinc-400">
              {bugs.length} {bugs.length === 1 ? "explanation" : "explanations"}{" "}
              saved
            </p>
          </div>
        </div>
      </div>

      {/* Bugs List */}
      <div className="space-y-8">
        {bugs.length > 0 ? (
          // Grouped by date
          Object.entries(groupedBugs).map(([date, dateBugs]) => (
            <div key={date} className="space-y-3">
              <div className="flex items-center gap-2 px-1">
                <Calendar className="h-4 w-4 text-zinc-600" />
                <h2 className="text-xs font-medium uppercase tracking-wider text-zinc-600">
                  {date}
                </h2>
                <div className="h-px flex-1 bg-zinc-800/50" />
              </div>

              {dateBugs.map((bug) => (
                <Link
                  key={bug.id}
                  href={`/bug/${bug.id}`}
                  className="block"
                  onMouseEnter={() => setSelectedBug(bug.id)}
                  onMouseLeave={() => setSelectedBug(null)}
                >
                  <div
                    className={`
                      group relative rounded-2xl border bg-zinc-950/80 p-6
                      transition-all duration-300 ease-out
                      ${
                        selectedBug === bug.id
                          ? "border-emerald-500/30 bg-zinc-900/90 shadow-lg shadow-emerald-500/5"
                          : "border-zinc-800/70 hover:border-zinc-700/70 hover:bg-zinc-900/80"
                      }
                    `}
                  >
                    {/* Hover gradient effect */}
                    <div
                      className={`
                      absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500/0 via-emerald-500/0 to-transparent
                      transition-opacity duration-500
                      ${selectedBug === bug.id ? "opacity-100" : "opacity-0"}
                    `}
                    />

                    <div className="relative">
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h2 className="text-lg font-semibold leading-snug text-zinc-100 truncate">
                              {bug.label}
                            </h2>
                            <ChevronRight
                              className={`
                              h-4 w-4 text-emerald-400 flex-shrink-0
                              transition-all duration-300
                              ${selectedBug === bug.id ? "translate-x-1 opacity-100" : "opacity-0"}
                            `}
                            />
                          </div>

                          <div className="mt-2 flex items-center gap-3 text-xs text-zinc-600">
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              <span>
                                {bug?.created_at
                                  ? dateFormatter.format(
                                      new Date(bug.created_at),
                                    )
                                  : ""}
                              </span>
                            </div>

                            {bug.tags && JSON.parse(bug.tags).length > 0 && (
                              <div className="flex items-center gap-1">
                                <Tag className="h-3 w-3" />
                                <span>{JSON.parse(bug.tags).length} tags</span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Tags */}
                        {bug.tags && JSON.parse(bug.tags).length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {JSON.parse(bug.tags).map(
                              (tag: string, i: number) => (
                                <span
                                  key={`${bug.id}-${tag}-${i}`}
                                  className={`
                                  rounded-full border px-3 py-1 text-xs font-medium
                                  transition-all duration-200
                                  ${
                                    selectedBug === bug.id
                                      ? "border-emerald-500/30 bg-emerald-500/15 text-emerald-300"
                                      : "border-emerald-500/20 bg-emerald-500/10 text-emerald-300/80"
                                  }
                                `}
                                >
                                  {tag}
                                </span>
                              ),
                            )}
                          </div>
                        )}
                      </div>

                      {/* Preview of explanation */}
                      <p
                        className={`
                        mt-4 text-sm leading-6 line-clamp-2
                        transition-colors duration-200
                        ${selectedBug === bug.id ? "text-zinc-300" : "text-zinc-400"}
                      `}
                      >
                        {bug.basic_explanation}
                      </p>

                      {/* Subtle indicator for more content */}
                      <div className="mt-3 flex items-center gap-1 text-xs text-emerald-400/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <span>View full explanation</span>
                        <ChevronRight className="h-3 w-3" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ))
        ) : (
          // Empty State
          <div className="relative">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 via-transparent to-transparent rounded-3xl blur-3xl" />

            <div className="relative rounded-3xl border border-dashed border-zinc-800 bg-zinc-950/60 px-6 py-16 text-center shadow-sm overflow-hidden">
              {/* Animated background pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-emerald-500/20 blur-3xl animate-pulse" />
                <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-emerald-500/20 blur-3xl animate-pulse animation-delay-1000" />
              </div>

              <div className="relative">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl border border-zinc-800 bg-zinc-900 text-zinc-400 mb-6">
                  <SearchX className="h-8 w-8" />
                </div>

                <h2 className="text-xl font-semibold text-zinc-100">
                  No bug history yet
                </h2>

                <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-zinc-400">
                  You haven't saved any bug explanations yet. When you find an
                  interesting bug, click the bookmark icon to save it for later
                  reference.
                </p>

                <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-zinc-800 bg-zinc-900/80 px-5 py-2.5 text-sm text-zinc-400">
                  <Bug className="h-4 w-4 text-emerald-400" />
                  <span>Your saved explanations will appear here</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
