"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  {
    href: "/dashboard",
    label: "Dashboard",
    description: "Overview and quick stats",
  },
  {
    href: "/portfolio",
    label: "Portfolio",
    description: "Projects, positions, and performance",
  },
  {
    href: "/stocks",
    label: "Stocks",
    description: "Equities, watchlists, and movement",
  },
  {
    href: "/community/home",
    label: "Community",
    description: "People, updates, and conversations",
    children: [
      {
        href: "/community/home",
        label: "Home",
      },
      {
        href: "/community/portfolios",
        label: "Community Portfolios",
      },
    ],
  },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1.5">
      {items.map((item) => {
        const hasChildren = Boolean(item.children?.length);
        const isChildActive = item.children?.some((child) => pathname === child.href) ?? false;
        const isActive = pathname === item.href || isChildActive;

        return (
          <div key={item.href} className="flex flex-col gap-1">
            <Link
              href={item.href}
              className={[
                "flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-[#edf2f7] text-[#111827]"
                  : "text-[#c8ced8] hover:bg-[#edf2f7] hover:text-[#111827]",
              ].join(" ")}
              aria-current={pathname === item.href ? "page" : undefined}
            >
              <span>{item.label}</span>
              {hasChildren ? (
                <svg
                  aria-hidden="true"
                  viewBox="0 0 20 20"
                  fill="none"
                  className={[
                    "h-3.5 w-3.5 transition-transform",
                    isChildActive ? "rotate-90" : "",
                  ].join(" ")}
                >
                  <path
                    d="M7.5 5.833 11.667 10 7.5 14.167"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : null}
            </Link>

            {hasChildren && isChildActive ? (
              <div className="ml-3 flex flex-col gap-1 border-l border-[var(--border)] pl-3">
                {item.children?.map((child) => {
                  const isCurrentChild = pathname === child.href;

                  return (
                    <Link
                      key={child.href}
                      href={child.href}
                      className={[
                        "rounded-lg px-3 py-1.5 text-sm transition-colors",
                        isCurrentChild
                          ? "bg-[#edf2f7] text-[#111827]"
                          : "text-[#c8ced8] hover:bg-[#edf2f7] hover:text-[#111827]",
                      ].join(" ")}
                      aria-current={isCurrentChild ? "page" : undefined}
                    >
                      {child.label}
                    </Link>
                  );
                })}
              </div>
            ) : null}
          </div>
        );
      })}
    </nav>
  );
}
