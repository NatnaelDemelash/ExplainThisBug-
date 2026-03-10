"use client";

import useStore from "@/store/useBugStore";

export default function Results() {
  const errorText = useStore((state) => state.errorText);

  return (
    <div className="font-extralight  mt-4 text-base text-red-400 flex justify-center items-center">
      {errorText}
    </div>
  );
}
