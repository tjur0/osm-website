import { JSX, ReactNode } from "react";
import { Title } from "@/components/elements/title";
import Link from "next/link";
import { ExternalButton } from "../external-button";
import { SiDiscord, SiDiscourse } from "@icons-pack/react-simple-icons";

export function Paragraph({ children }: { children: ReactNode }) {
  return (
    <p className="text-muted-foreground dark:text-muted leading-relaxed mb-4">
      {children}
    </p>
  );
}

export function A({ children, ...props }: JSX.IntrinsicElements["a"]) {
  return (
    <Link {...props} href={props.href as string} target="_blank">
      {children}
    </Link>
  );
}

export const mdxComponents = {
  h1: (props: JSX.IntrinsicElements["h1"]) => <Title size="h1" {...props} />,
  h2: (props: JSX.IntrinsicElements["h2"]) => <Title size="h2" {...props} />,
  h3: (props: JSX.IntrinsicElements["h3"]) => <Title size="h3" {...props} />,
  p: (props: JSX.IntrinsicAttributes & { children: ReactNode }) => (
    <Paragraph {...props} />
  ),
  a: (props: JSX.IntrinsicElements["a"]) => <A {...props} />,
  ExternalButton,
  SiDiscord,
  SiDiscourse,
};
