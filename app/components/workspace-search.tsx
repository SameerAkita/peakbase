"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function WorkspaceSearch() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const isStocksPage = pathname === "/stocks";
  const stockQuery = searchParams.get("stock") ?? "";

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!isStocksPage) {
      return;
    }

    const nextParams = new URLSearchParams(searchParams.toString());
    const formData = new FormData(event.currentTarget);
    const submittedValue = formData.get("workspace-search");
    const nextValue =
      typeof submittedValue === "string" ? submittedValue.trim().toUpperCase() : "";

    if (nextValue) {
      nextParams.set("stock", nextValue);
    } else {
      nextParams.delete("stock");
    }

    const nextQuery = nextParams.toString();
    router.replace(nextQuery ? `${pathname}?${nextQuery}` : pathname, {
      scroll: false,
    });
  }

  return (
    <form
      key={`${pathname}-${stockQuery}`}
      onSubmit={handleSubmit}
      className="w-full max-w-xs"
    >
      <div className="flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-3 py-1.5">
        <svg
          aria-hidden="true"
          viewBox="0 0 20 20"
          fill="none"
          className="h-4 w-4 shrink-0 text-zinc-400"
        >
          <path
            d="M14.167 14.167 17.5 17.5M15.833 9.167a6.667 6.667 0 1 1-13.333 0 6.667 6.667 0 0 1 13.333 0Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <input
          name="workspace-search"
          type="search"
          defaultValue={isStocksPage ? stockQuery : ""}
          placeholder={isStocksPage ? "Search stock symbol" : "Search"}
          className="w-full bg-transparent text-sm text-zinc-900 outline-none placeholder:text-zinc-400"
          aria-label={isStocksPage ? "Search stock symbol" : "Search this page"}
        />
      </div>
    </form>
  );
}
