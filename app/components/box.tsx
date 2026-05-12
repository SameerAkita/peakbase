import type { ReactNode } from "react";

type BoxProps = {
  title?: string;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
};

export function Box({
  title,
  children,
  className,
  contentClassName,
}: BoxProps) {
  return (
    <article className={["flex h-full flex-col", className].filter(Boolean).join(" ")}>
      {title ? <p className="px-5">{title}</p> : null}
      <div
        className={[
          "panel flex-1 text-sm px-5 py-2 leading-7 text-(--text-soft)",
          contentClassName,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {children}
      </div>
    </article>
  );
}
