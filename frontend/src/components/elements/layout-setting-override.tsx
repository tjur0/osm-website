"use client";

import { useEffect, useRef } from "react";
import { useLayoutSettings } from "@/contexts/layout-settings-context";

type Props = { rounded: boolean };

export default function LayoutSettingOverride({ rounded }: Props) {
  const { setRounding, registerOverride, unregisterOverride } =
    useLayoutSettings();

  const overrideId = useRef<string | null>(null);

  useEffect(() => {
    overrideId.current = registerOverride(rounded);
    setRounding(rounded);

    return () => {
      if (overrideId.current) {
        unregisterOverride(overrideId.current);
      }
    };
  }, [rounded, registerOverride, unregisterOverride, setRounding]);

  return null;
}
