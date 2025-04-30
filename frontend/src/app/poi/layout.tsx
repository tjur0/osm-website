import LayoutSettingOverride from "@/components/elements/layout-setting-override";
import WindowWithDynamicRounding from "@/components/elements/window-with-dynamic-rounding";

export default function PoiLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <LayoutSettingOverride key="PoiLayout" rounded={false} />
      <WindowWithDynamicRounding
        className="w-96"
        dynamicRoundingClassName="rounded-l-none"
      >
        {children}
      </WindowWithDynamicRounding>
    </>
  );
}
