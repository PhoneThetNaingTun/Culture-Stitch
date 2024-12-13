import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

function LoadingDashboard() {
  return (
    <div className="px-4 pt-10">
      <div className="flex flex-col space-y-3">
        <Skeleton className="h-[400px] w-full rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </div>
      </div>
      <div className="flex flex-col space-y-3">
        <Skeleton className="h-[400px] w-full rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </div>
      </div>
    </div>
  );
}

export default LoadingDashboard;
