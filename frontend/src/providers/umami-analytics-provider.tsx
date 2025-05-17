"use client";

import { PropsWithChildren } from "react";
import { umamiAnalyticsContextFactory } from "umami-analytics-next";

const events = ["like", "dislike"] as const;

type EventDataMap = {
  like: { id: string; typeName: string };
  dislike: { id: string; typeName: string };
};

const { UmamiAnalyticsProvider: InternalProvider, useUmami } =
  umamiAnalyticsContextFactory<typeof events, EventDataMap>(events);

export { useUmami };

interface UmamiAnalyticsProviderProps extends PropsWithChildren {
  websiteId: string;
  src: string;
  autoTrack?: boolean;
}

export function UmamiAnalyticsProvider({
  children,
  websiteId,
  src,
  autoTrack = true,
}: UmamiAnalyticsProviderProps) {
  return (
    <InternalProvider websiteId={websiteId} src={src} autoTrack={autoTrack}>
      {children}
    </InternalProvider>
  );
}
