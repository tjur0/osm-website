"use client";

import { useState, useEffect } from "react";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { Button } from "../ui/button";
import { Poi } from "@/types/poi";
import { useUmami } from "@/providers/umami-analytics-provider";
import { cn } from "@/lib/utils";

interface OpinionProps {
  poi: Poi;
}

export default function Opinion({ poi }: OpinionProps) {
  const { track } = useUmami();

  const [userOpinion, setUserOpinion] = useState<"like" | "dislike" | null>(
    null
  );

  const storageKey = `poi-opinion-${poi.id}-${poi.type}`;

  useEffect(() => {
    const savedOpinion = localStorage.getItem(storageKey) as
      | "like"
      | "dislike"
      | null;
    if (savedOpinion === "like" || savedOpinion === "dislike") {
      setUserOpinion(savedOpinion);
    }
  }, [storageKey]);

  const handleClick = (opinion: "like" | "dislike") => {
    if (!track) {
      console.error("Tracking function is not available");
      return;
    }
    if (userOpinion) {
      return;
    }

    track(opinion, {
      id: `${poi.type}${poi.id}`,
      typeName: poi.typeName,
    });

    setUserOpinion(opinion);
    localStorage.setItem(storageKey, opinion);
  };

  return (
    <div className="flex justify-between">
      <div className="flex justify-center items-center">
        <span>Klopt de infomatie?</span>
      </div>

      <div className="flex gap-2">
        <Button
          variant="ghost"
          className={cn(
            "size-8",
            userOpinion === "like"
              ? "bg-green-400 dark:bg-green-800 text-white"
              : ""
          )}
          onClick={() => handleClick("like")}
          disabled={!!userOpinion}
          aria-pressed={userOpinion === "like"}
        >
          <ThumbsUp className="size-4" />
          <span className="sr-only">Vind ik leuk</span>
        </Button>
        <Button
          variant="ghost"
          className={cn(
            "size-8",
            userOpinion === "dislike"
              ? "bg-red-400 dark:bg-red-800 text-white"
              : ""
          )}
          onClick={() => handleClick("dislike")}
          disabled={!!userOpinion}
          aria-pressed={userOpinion === "dislike"}
        >
          <ThumbsDown className="size-4" />
          <span className="sr-only">Vind ik niet leuk</span>
        </Button>
      </div>
    </div>
  );
}
