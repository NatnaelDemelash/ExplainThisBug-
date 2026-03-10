import { Bug } from "lucide-react";
import Link from "next/link";

const navItems = [
  { href: "/history", label: "History" },
  { href: "/signin", label: "Sign in" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/6 bg-black/70">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-white/95 transition-opacity hover:opacity-80"
        >
          <Bug className="h-4.25 w-4.25 text-emerald-500" strokeWidth={2} />
          <span className="text-[14px] font-medium tracking-[-0.02em]">
            ExplainThisBug
          </span>
        </Link>

        <nav
          aria-label="Primary navigation"
          className="flex items-center gap-1"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-4 py-1.5 text-[13px] font-normal text-zinc-400 transition-colors hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
