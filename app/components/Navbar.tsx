"use client";

import { handleSignIn, supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";
import { Bug } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navItems = [{ href: "/history", label: "History" }];

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const pathname = usePathname();

  console.log(user);
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const full_name = user?.user_metadata?.full_name ?? "";
  const initials = full_name
    .split(" ")
    .map((word: string) => word[0])
    .join("")
    .toUpperCase();

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800 bg-black">
      <div className="mx-auto flex h-12 w-full max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-1.5">
          <Bug className="h-4 w-4 text-emerald-500" />
          <span className="text-sm text-zinc-100">ExplainThisBug</span>
        </Link>

        <div className="flex items-center gap-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-xs ${
                pathname === item.href
                  ? "text-emerald-500"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              {item.label}
            </Link>
          ))}

          {user ? (
            <div className="flex items-center gap-3">
              <button
                onClick={handleSignOut}
                className="text-xs text-zinc-400 hover:text-zinc-200"
              >
                Sign out
              </button>
              <div className="h-7 w-7 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                <span className="text-xs font-medium text-emerald-400">
                  {initials}
                </span>
              </div>
            </div>
          ) : (
            <button
              onClick={handleSignIn}
              className="text-xs text-emerald-500 hover:text-emerald-400"
            >
              Sign in
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
