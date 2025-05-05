import LayoutSettingOverride from "@/components/elements/layout-setting-override";
import WindowWithDynamicRounding from "@/components/elements/window-with-dynamic-rounding";
import HideOnDesktop from "@/components/wrappers/hide-on-desktop";
import HideOnMobile from "@/components/wrappers/hide-on-mobile";

export default function DocsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <LayoutSettingOverride key="DocsLayout" rounded={false} />

      <HideOnDesktop>{children}</HideOnDesktop>

      <HideOnMobile>
        <WindowWithDynamicRounding
          className="w-96"
          dynamicRoundingClassName="rounded-l-none xl:p-8"
        >
          {children}
        </WindowWithDynamicRounding>
      </HideOnMobile>
    </>
  );
}
