"use client";

import { createContext, useContext, useState } from "react";
import type maplibregl from "maplibre-gl";

type BBoxContextType = {
  bbox: maplibregl.LngLatBoundsLike | null;
  setBBox: (bbox: maplibregl.LngLatBoundsLike) => void;
};

const BBoxContext = createContext<BBoxContextType | undefined>(undefined);

export const BBoxProvider = ({ children }: { children: React.ReactNode }) => {
  const [bbox, setBBox] = useState<maplibregl.LngLatBoundsLike | null>(null);

  return (
    <BBoxContext.Provider value={{ bbox, setBBox }}>
      {children}
    </BBoxContext.Provider>
  );
};

export const useBBox = () => {
  const context = useContext(BBoxContext);
  if (!context) throw new Error("useBBox must be used within BBoxProvider");
  return context.bbox;
};

export const useBBoxActions = () => {
  const context = useContext(BBoxContext);
  if (!context)
    throw new Error("useBBoxActions must be used within BBoxProvider");
  return { setBBox: context.setBBox };
};
