import { Suspense, type ReactNode } from "react";
import { SidebarNav } from "../components/sidebar-nav";
import { WorkspaceSearch } from "../components/workspace-search";

function SearchShell({ placeholder }: { placeholder: string }) {
  return (
    <div className="flex w-full max-w-xs items-center gap-2 rounded-full border border-[var(--border)] bg-white px-3 py-1.5">
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
        type="search"
        placeholder={placeholder}
        className="w-full bg-transparent text-sm text-zinc-900 outline-none placeholder:text-zinc-400"
        aria-label={placeholder}
      />
    </div>
  );
}

export default function WorkspaceLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="app-shell mx-auto flex w-full max-w-400 flex-col lg:flex-row">
      <aside className="thin-scrollbar border-b border-(--border) lg:sticky lg:top-0 lg:h-screen lg:w-[204px] lg:shrink-0 lg:border-r lg:border-b-0">
        <div className="flex h-full flex-col px-3 py-4">
          <div className="px-1 pb-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--text-soft)]">
              Peakbase
            </p>
            <h1 className="mt-2 text-lg font-semibold tracking-tight text-zinc-950">
              Workspace
            </h1>
            <p className="mt-1.5 text-xs leading-5 text-(--text-soft)">
              Navigate your main views.
            </p>
          </div>

          <div className="mt-3 flex-1">
            <SidebarNav />
          </div>

          <div className="mt-3 border-t border-[var(--border)] px-1 pt-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--text-soft)]">
              Style
            </p>
            <p className="mt-1.5 text-xs leading-5 text-zinc-700">
              Light surfaces and subtle borders.
            </p>
          </div>
        </div>
      </aside>

      <div className="relative min-w-0 flex-1">
        <header className="sticky top-0 z-20 border-b border-[var(--border)] bg-[var(--app-bg)] px-4 pt-2.5 pb-2.5 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-center">
            <button
              type="button"
              className="absolute right-0 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-3 py-1.5 text-sm text-zinc-600 transition-colors hover:bg-[var(--surface-muted)] hover:text-zinc-900"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 20 20"
                fill="none"
                className="h-4 w-4"
              >
                <path
                  d="M12.5 6.667 15.833 10m0 0-3.333 3.333M15.833 10H7.5M9.167 4.167H6.5a2.333 2.333 0 0 0-2.333 2.333v7a2.333 2.333 0 0 0 2.333 2.333h2.667"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>Share</span>
            </button>

            <Suspense fallback={<SearchShell placeholder="Search" />}>
              <WorkspaceSearch />
            </Suspense>
          </div>
        </header>

        <div className="pt-2">{children}</div>
      </div>
    </div>
  );
}
