export default function History() {
  const bugs = [
    {
      title: "TypeError: Cannot read properties of undefined",
      date: "March 11, 2026 at 2:34 PM",
      description:
        "Your code is trying to access something from a list or object that does not exist yet. This usually happens when data has not loaded or a value is missing.",
      tags: ["React", "Next.js", "JavaScript"],
    },
  ];

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
        {bugs.map((bug, index) => (
          <div
            key={index}
            className="group rounded-2xl border border-zinc-800 bg-zinc-950/80 p-6 shadow-sm transition-all duration-200 hover:border-zinc-700 hover:bg-zinc-900/80"
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex-1">
                <h2 className="text-lg font-semibold leading-snug text-zinc-100">
                  {bug.title}
                </h2>
                <p className="mt-2 text-xs text-zinc-500">{bug.date}</p>
              </div>

              <div className="flex flex-wrap gap-2">
                {bug.tags.map((tag) => (
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
              {bug.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
