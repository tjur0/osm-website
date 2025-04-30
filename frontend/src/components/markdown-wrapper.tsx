import Link from "next/link";
import { env } from "process";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Props = {
  children: React.ReactNode;
};

export function MarkdownWrapper({ children }: Props) {
  if (typeof children !== "string") return null;

  return (
    <div className="flex flex-col gap-2 prose dark:prose-invert">
      <Markdown
        remarkPlugins={[remarkGfm]}
        components={{
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          a: ({ node, ...props }) => {
            const baseUrl = env.BASE_URL || "http://localhost:3000";

            if (
              props?.href?.startsWith("http") &&
              !props?.href?.startsWith(baseUrl)
            ) {
              return (
                <Link
                  href={props.href}
                  prefetch={false}
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                >
                  {props.children}
                </Link>
              );
            }

            if (!props?.href) return null;

            return (
              <Link href={props.href} prefetch={false}>
                {props.children}
              </Link>
            );
          },
        }}
      >
        {children}
      </Markdown>
    </div>
  );
}
