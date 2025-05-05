import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col gap-4">
      <Link
        href="#"
        aria-label="Terug naar de straten lijst"
        className="opacity-50 pointer-events-none"
      >
        <ArrowLeft />
      </Link>

      <div className="flex items-end gap-1 w-full">
        <Skeleton className="h-10 w-1/2 rounded-lg" />
        <Skeleton className="h-4 w-1/4 mt-1 rounded" />
      </div>

      <div className="flex flex-col gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="rounded-xl border p-4 bg-muted/30 shadow flex flex-col gap-4"
          >
            <Skeleton className="h-5 w-1/3 mb-2" />
            <Skeleton className="h-4 w-1/4" />
          </div>
        ))}
      </div>
    </div>
  );
}
