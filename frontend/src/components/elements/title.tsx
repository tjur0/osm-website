import { cn } from "@/lib/utils";

interface TitleProps {
  size: "h1" | "h2" | "h3" | "h4";
  title?: string;
  titlePostfix?: string | null;
  subTitle?: string | null | React.ReactNode;
  actions?: React.ReactNode | null;
  children?: React.ReactNode;
}

export function Title({
  size = "h1",
  title,
  titlePostfix,
  subTitle,
  actions,
  children,
}: TitleProps) {
  const sizes = {
    h1: "text-2xl md:text-4xl",
    h2: "text-lg md:text-xl",
    h3: "text-md md:text-lg",
    h4: "text-md",
  };

  const titleClassName = cn(
    "font-bold tracking-tight truncate text-ellipsis pb-1 line-clamp-2",
    sizes[size]
  );

  return (
    <div className="flex items-start md:items:center justify-between space-y-2 flex-col md:flex-row gap-1">
      <div>
        <div className="flex items-end gap-1 w-full">
          {size === "h1" && (
            <h1 className={titleClassName}>{title || children}</h1>
          )}
          {size === "h2" && (
            <h2 className={titleClassName}>{title || children}</h2>
          )}
          {size === "h3" && (
            <h3 className={titleClassName}>{title || children}</h3>
          )}
          {size === "h4" && (
            <h4 className={titleClassName}>{title || children}</h4>
          )}

          {titlePostfix && (
            <span className="text-[12px] font-medium text-muted-foreground dark:text-muted">
              {titlePostfix}
            </span>
          )}
        </div>
        {subTitle && (
          <p className="text-sm mt-2 text-muted-foreground dark:text-muted">
            {subTitle}
          </p>
        )}
      </div>
      <div>{actions && actions}</div>
    </div>
  );
}
