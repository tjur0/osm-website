interface HideOnMobileProps {
  children?: React.ReactNode;
}

export default function HideOnMobile({ children }: HideOnMobileProps) {
  return <div className="hidden xl:flex">{children}</div>;
}
