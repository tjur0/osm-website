"use client";

import { useEffect, useState } from "react";
import { ColorBadge } from "./color-badge";

interface Feature {
  id: number;
  name: string;
  color: string;
}

export function PoiBadgeList() {
  const [features, setFeatures] = useState<Feature[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchFeatures() {
      try {
        const response = await fetch("/api/features");
        if (response.ok) {
          const data = await response.json();
          setFeatures(data);
        }
      } catch (error) {
        console.error("Error fetching features:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchFeatures();
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2 items-start">
      {features.map((feature) => (
        <ColorBadge key={feature.id} color={feature.color}>
          {feature.name}
        </ColorBadge>
      ))}
    </div>
  );
}
