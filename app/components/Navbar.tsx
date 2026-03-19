"use client";

import { handleSignIn, supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";
import { Bug } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const navItems = [{ href: "/history", label: "History" }];

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
  }, []);

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

          {user ? (
            <span className="text-xs text-green-500">{user.email}</span>
          ) : (
            <button
              onClick={handleSignIn}
              className="text-xs bg-zinc-200 text-black px-3 py-2 border-none rounded-full cursor-pointer"
            >
              Sign In
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
