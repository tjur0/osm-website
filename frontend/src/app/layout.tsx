import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ImplemtedMap from "@/components/implemented-map";
import Header from "@/components/header/header";
import WindowWithDynamicRounding from "@/components/elements/window-with-dynamic-rounding";
import { LayoutSettingsProvider } from "@/contexts/layout-settings-context";
import LayoutSettingOverride from "@/components/elements/layout-setting-override";
import { ThemeProvider } from "@/providers/theme-provider";
import WindowDrawer from "@/components/elements/window-drawer";
import HideOnMobile from "@/components/wrappers/hide-on-mobile";
import HideOnDesktop from "@/components/wrappers/hide-on-desktop";
import { BBoxProvider } from "@/providers/bbox-provider";

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
  return (
    <html lang="nl" suppressHydrationWarning>
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/favicon/safari-pinned-tab.svg"
          color="#5bbad5"
        />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta
          name="msapplication-config"
          content="/favicon/browserconfig.xml"
        />
        <meta name="theme-color" content="#ffffff" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        />
        <script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="1851f20d-2dc9-4192-ba6f-ec5cc26abe91"
        ></script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-[100dvh] w-screen overflow-hidden`}
      >
        {/* <Analytics />
        <SpeedInsights /> */}
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <BBoxProvider>
            <LayoutSettingsProvider>
              <LayoutSettingOverride key="RootLayout" rounded={true} />

              <div className="absolute top-0 left-0 w-full h-[100dvh] z-0">
                <ImplemtedMap />
              </div>

              <HideOnDesktop>
                <WindowDrawer>
                  <div className="flex h-full gap-8">
                    <div className="h-full flex flex-col gap-4 w-12">
                      <Header />
                    </div>
                    <div className="overflow-auto w-full">{children}</div>
                  </div>
                </WindowDrawer>
              </HideOnDesktop>

              <HideOnMobile>
                <div className="absolute z-10 flex h-screen p-6">
                  <WindowWithDynamicRounding
                    dynamicRoundingClassName="rounded-r-none"
                    padding={4}
                  >
                    <Header />
                  </WindowWithDynamicRounding>
                  {children}
                </div>
              </HideOnMobile>
            </LayoutSettingsProvider>
          </BBoxProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
