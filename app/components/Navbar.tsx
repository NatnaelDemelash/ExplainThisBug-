import { Bug } from "lucide-react";

export default function Navbar() {
  return (
    <header className="w-full h-18 flex py-4 px-6 shadow-2xl border border-[#262626]">
      <div className="w-full max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bug color="#10b981" />
          <h1 className="font-semibold">ExplainThisBug</h1>
        </div>

        <nav>
          <ul className="flex items-center gap-3 space-x-4 sm:space-x-8 text-gray-300">
            <li>
              <a href="/history">History</a>
            </li>
            <li>
              <a href="/signin">Sign In</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
