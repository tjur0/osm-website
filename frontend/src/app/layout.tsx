import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ImplemtedMap from "@/components/implemented-map";
import Header from "@/components/header/header";
import { ThemeProvider } from "@/providers/theme-provider";
import { BBoxProvider } from "@/providers/bbox-provider";
import { UmamiAnalyticsProvider } from "@/providers/umami-analytics-provider";
import { Window } from "@/components/elements/window";
import SkipLink from "@/components/elements/skip-link";
import { ScrollDown } from "@/components/elements/scroll-down";
import { PoiBadgeList } from "@/components/poi/poi-badge-list";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OpenStreetMap Nederland",
  description:
    "OpenStreetMap Nederland is een project dat zich richt op het verzamelen, bewerken en beschikbaar stellen van vrije geografische gegevens. Zie op deze site alle punten van interesse in Nederland.",
  keywords: ["OpenStreetMap Nederland", "OSM", "Kaart", "Geografie"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const websiteId = process.env.UMAMI_WEBSITE_ID;
  const scriptUrl = process.env.UMAMI_SCRIPT_URL;

  if (!websiteId || !scriptUrl) {
    throw new Error("env UMAMI_WEBSITE_ID or UMAMI_SCRIPT_URL not set");
  }

  return (
    <html lang="nl" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="apple-mobile-web-app-title"
          content="OpenStreetMap Nederland"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased w-full md:overflow-hidden`}
      >
        <UmamiAnalyticsProvider src={scriptUrl} websiteId={websiteId}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <BBoxProvider>
              <SkipLink />
              <ScrollDown pixels={250} />

              <div className="md:absolute top-0 left-0 w-full h-[90dvh] md:h-dvh z-0">
                <div className="fixed md:absolute w-full h-lvh md:h-dvh">
                  <ImplemtedMap />
                </div>
              </div>

              <div className="absolute z-10 flex h-screen md:p-6 w-full">
                <Window className="md:w-[500px] w-full min-h-lvh md:min-h-[500px] h-fit md:h-full justify-start">
                  <div
                    aria-hidden
                    className="md:hidden mx-auto w-12 h-1.5 shrink-0 rounded-full bg-gray-700 dark:bg-gray-300 my-4"
                  />
                  <div className="flex gap-4 w-full h-full">
                    <div className="min-w-[60px] h-full flex flex-col justify-start md:justify-between gap-2">
                      <Header />
                    </div>
                    <div className="bg-gray-200 opacity-30 w-0.5 h-full" />
                    <main
                      tabIndex={-1}
                      id="main"
                      aria-label="Hoofdvenster"
                      className="md:p-4 flex flex-col h-full md:overflow-y-auto w-full"
                    >
                      {children}
                    </main>
                  </div>
                </Window>
              </div>

              <div className="fixed top-4 left-4 md:top-6 md:left-[532px] right-6 pointer-events-none">
                <div className="pointer-events-auto w-fit max-w-full">
                  <PoiBadgeList />
                </div>
              </div>
            </BBoxProvider>
          </ThemeProvider>
        </UmamiAnalyticsProvider>
      </body>
    </html>
  );
}
