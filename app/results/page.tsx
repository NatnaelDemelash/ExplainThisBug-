"use client";

import useStore from "@/store/useBugStore";
import { CodeXmlIcon, Lightbulb, Wrench } from "lucide-react";

export default function Results() {
  const errorText = useStore((state) => state.errorText);

  return (
    <section className="mt-6 px-4 sm:px-6">
      <div className="mx-auto flex max-w-5xl flex-col gap-4">
        {/* Original Error */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-5">
          <h2 className="text-xs font-medium uppercase tracking-wide text-zinc-500">
            Original Error
          </h2>

          <div className="mt-3 rounded-lg border border-red-950/30 bg-red-950/10 p-4 shadow-[0_0_18px_rgba(248,113,113,0.06)]">
            <p className="whitespace-pre-wrap break-words font-mono text-sm leading-6 text-red-400">
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
              Imagine you have a box of toys, and you want to count what&apos;s
              inside. But the box was never given to you. That&apos;s what this
              error feels like. Your code is trying to loop through a list, but
              that list doesn&apos;t exist yet.
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
              This error happens because{" "}
              <code className="text-zinc-200">.map()</code> is being called on a
              value that is <code className="text-zinc-200">undefined</code>.
              Common causes include data not being available yet, missing
              default state values, or a prop not being passed correctly from a
              parent component.
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

          <div className="mt-4 overflow-x-auto rounded-lg border border-zinc-800 bg-black/80 shadow-[0_0_24px_rgba(16,185,129,0.05)]">
            <pre className="p-4 text-sm leading-7 text-zinc-300">
              <code className="font-mono text-emerald-400">
                {`// Option 1: Add a null check with optional chaining
const items = data?.items ?? [];
items.map((item) => <Item key={item.id} {...item} />);

// Option 2: Add a loading state
if (!data) return <LoadingSpinner />;

// Option 3: Set a default value in your state
const [items, setItems] = useState<Item[]>([]);`}
              </code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}
