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
    href: "/community",
    label: "Community",
    description: "People, updates, and conversations",
  },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1.5">
      {items.map((item) => {
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={[
              "flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              isActive
                ? "bg-[#edf2f7] text-[#111827]"
                : "text-[#c8ced8] hover:bg-[#edf2f7] hover:text-[#111827]",
            ].join(" ")}
            aria-current={isActive ? "page" : undefined}
          >
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
