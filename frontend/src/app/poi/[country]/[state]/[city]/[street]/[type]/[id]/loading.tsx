// app/poi/[country]/[state]/[city]/[street]/[type]/[id]/loading.tsx

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

export default function Loading() {
  return (
    <div className="overflow-auto flex flex-col h-full gap-8 animate-pulse">
      <div className="flex items-center justify-between w-full">
        <Link
          href="#"
          aria-label="Terug naar de poi lijst"
          className="opacity-50 pointer-events-none"
        >
          <ArrowLeft />
        </Link>
        <div className="flex justify-end">
          <Badge className="w-24 h-[22px]"></Badge>
        </div>
      </div>

      <div className="flex flex-col gap-4 w-full">
        <Skeleton className="h-8 w-2/3" />
        <Skeleton className="h-4 w-1/3" />
      </div>
    </div>
  );
}
