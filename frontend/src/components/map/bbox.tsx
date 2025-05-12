"use client";

import { useEffect } from "react";
import { useBBoxActions } from "@/providers/bbox-provider";
import type maplibregl from "maplibre-gl";

interface BBoxProps {
  bbox: maplibregl.LngLatBoundsLike | null;
}

export default function BBox({ bbox }: BBoxProps) {
  const { setBBox } = useBBoxActions();

  useEffect(() => {
    if (!bbox) return;
    setBBox(bbox);
  }, [bbox, setBBox]);

  return null;
}
