import { cn } from "@/lib/utils";

type Props = {
  size: "h1" | "h2" | "h3" | "h4";
  title: string;
  titlePostfix?: string | null;
  subTitle?: string | null | React.ReactNode;
  actions?: React.ReactNode | null;
};

export function Title({
  size = "h1",
  title,
  titlePostfix,
  subTitle,
  actions,
}: Props) {
  const sizes = {
    h1: "text-4xl",
    h2: "text-xl",
    h3: "text-lg",
    h4: "text-md",
  };

  const titleClassName = cn(
    "font-bold tracking-tight overflow-hidden text-ellipsis pb-1 line-clamp-2",
    sizes[size]
  );

  return (
    <div className="flex items-start md:items:center justify-between space-y-2 flex-col md:flex-row">
      <div>
        <div className="flex items-end gap-1 w-full">
          {size === "h1" && <h1 className={titleClassName}>{title}</h1>}
          {size === "h2" && <h2 className={titleClassName}>{title}</h2>}
          {size === "h3" && <h3 className={titleClassName}>{title}</h3>}
          {size === "h4" && <h4 className={titleClassName}>{title}</h4>}

          {titlePostfix && (
            <span className="text-[12px] font-medium text-muted">
              {titlePostfix}
            </span>
          )}
        </div>
        {subTitle && (
          <p className="text-sm mt-2 text-muted">
            {subTitle}
          </p>
        )}
      </div>
      <div>{actions && actions}</div>
    </div>
  );
}
