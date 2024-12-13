"use client";

import RetroGrid from "@/components/ui/retro-grid";
import Link from "next/link";

const PageNotFound = () => {
  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
      <span className="text-4xl md:text-9xl text-center">
        404 <br />
        <span className="text-2xl md:text-7xl"> Page Not Found</span> <br />
        <Link
          href={"/home"}
          className="text-black  text-xs md:text-2xl hover:border-b-2"
        >
          Back to home page!
        </Link>
      </span>

      <RetroGrid />
    </div>
  );
};
export default PageNotFound;
