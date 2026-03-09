import { Bug } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#262626] bg-black/50 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-2.5 transition-opacity hover:opacity-80"
        >
          <Bug className="h-5 w-5 text-emerald-500" strokeWidth={2} />
          <span className="font-semibold tracking-tight text-white">
            ExplainThisBug
          </span>
        </Link>

        <nav className="flex items-center gap-1 sm:gap-2">
          <Link
            href="/history"
            className="rounded-lg px-3 py-2 text-sm font-medium text-gray-300 transition-colors hover:bg-[#262626] hover:text-white sm:px-4"
          >
            History
          </Link>
          <Link
            href="/signin"
            className="rounded-lg px-3 py-2 text-sm font-medium text-gray-300 transition-colors hover:bg-[#262626] hover:text-white sm:px-4"
          >
            Sign In
          </Link>
        </nav>
      </div>
    </header>
  );
}
