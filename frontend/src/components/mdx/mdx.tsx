import { JSX, ReactNode } from "react";
import { Title } from "@/components/elements/title";

export function Paragraph({ children }: { children: ReactNode }) {
  return <p className="text-muted leading-relaxed">{children}</p>;
}

export const mdxComponents = {
  h1: (props: JSX.IntrinsicElements["h1"]) => <Title size="h1" {...props} />,
  h2: (props: JSX.IntrinsicElements["h2"]) => <Title size="h2" {...props} />,
  h3: (props: JSX.IntrinsicElements["h3"]) => <Title size="h3" {...props} />,
  p: (props: JSX.IntrinsicAttributes & { children: ReactNode }) => (
    <Paragraph {...props} />
  ),
};
