"use client";

import Link from "next/link";
import { Box } from "./box";

type PortfolioTab = {
  id: string;
  label: string;
};

const tabs: PortfolioTab[] = [
  { id: "overview", label: "Overview" },
  { id: "holdings", label: "Holdings" },
];

const defaultTabId = "overview";
const validTabIds = new Set(["overview", "holdings"]);

function normalizeTabId(tabId?: string) {
  const normalizedTabId = tabId?.trim().toLowerCase();

  if (!normalizedTabId || !validTabIds.has(normalizedTabId)) {
    return defaultTabId;
  }

  return normalizedTabId;
}

type PortfolioBrowserProps = {
  currentTabId?: string;
};

export function PortfolioBrowser({ currentTabId }: PortfolioBrowserProps) {
  const selectedTabId = normalizeTabId(currentTabId);
  const activeTab = tabs.find((tab) => tab.id === selectedTabId) ?? tabs[0];

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-1 flex-col gap-6 p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col gap-5 border-b border-(--border) pb-6">
        <div className="flex flex-col gap-3">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--text-soft)]">
            Portfolio
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl">
            Portfolio Workspace
          </h1>
          <p className="max-w-2xl text-sm leading-7 text-[var(--text-soft)] sm:text-base">
            Track performance at a glance and drill into positions with the same page shell used across stocks.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => {
            const isActive = tab.id === activeTab.id;

            return (
              <Link
                key={tab.id}
                href={`/portfolio/${tab.id}`}
                className={[
                  "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-zinc-900 !text-white visited:!text-white"
                    : "bg-[var(--surface-muted)] text-zinc-600 visited:text-zinc-600 hover:bg-white hover:text-zinc-950",
                ].join(" ")}
              >
                {tab.label}
              </Link>
            );
          })}
        </div>
      </div>

      {activeTab.id === "overview" ? (
        <section className="flex flex-col gap-4 lg:flex-row lg:items-start">
          <div className="flex flex-col gap-4 lg:w-[70%]">
            <Box title="chart" className="h-full" contentClassName="p-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-[var(--text-soft)]">
                  <span>Portfolio trend</span>
                  <span>YTD</span>
                </div>
                <svg
                  viewBox="0 0 720 180"
                  className="h-52 w-full rounded-lg border border-[var(--border)] bg-white"
                  role="img"
                  aria-label="Portfolio trend chart"
                >
                  <polyline
                    fill="none"
                    stroke="rgb(24 24 27)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points="20,132 120,118 220,126 320,95 420,104 520,81 620,88 700,62"
                  />
                </svg>
              </div>
            </Box>

            <Box title="news" contentClassName="p-4">
              <div className="space-y-4">
                <article className="border-b border-[var(--border)] pb-3">
                  <h4 className="text-sm font-semibold text-zinc-900">Weekly rebalance complete</h4>
                  <p className="mt-1 text-xs text-[var(--text-soft)]">Portfolio Log | This week</p>
                  <p className="mt-1 text-sm text-zinc-700">
                    Core allocations were adjusted to target ranges after recent sector momentum.
                  </p>
                </article>
                <article className="border-b border-[var(--border)] pb-3">
                  <h4 className="text-sm font-semibold text-zinc-900">Risk profile unchanged</h4>
                  <p className="mt-1 text-xs text-[var(--text-soft)]">Risk Engine | Today</p>
                  <p className="mt-1 text-sm text-zinc-700">
                    Volatility and concentration are within expected thresholds for this strategy.
                  </p>
                </article>
                <article>
                  <h4 className="text-sm font-semibold text-zinc-900">Cash reserve available</h4>
                  <p className="mt-1 text-xs text-[var(--text-soft)]">Operations | Today</p>
                  <p className="mt-1 text-sm text-zinc-700">
                    Dry powder remains available for upcoming opportunities and staged entries.
                  </p>
                </article>
              </div>
            </Box>
          </div>

          <div className="flex flex-col gap-4 lg:w-[30%]">
            <Box title="company intro" contentClassName="p-4">
              <p>
                This overview is intentionally structured like the stock page so the portfolio area feels familiar while we phase in real account data.
              </p>
            </Box>

            <Box title="basic metrics" contentClassName="p-4">
              <dl className="space-y-2">
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-[13px] text-[var(--text-soft)]">Total Value</dt>
                  <dd className="text-[13px] font-semibold text-zinc-900">$412,450</dd>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-[13px] text-[var(--text-soft)]">Daily Change</dt>
                  <dd className="text-[13px] font-semibold text-zinc-900">+$2,180</dd>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-[13px] text-[var(--text-soft)]">Holdings Count</dt>
                  <dd className="text-[13px] font-semibold text-zinc-900">27</dd>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-[13px] text-[var(--text-soft)]">Sectors</dt>
                  <dd className="text-[13px] font-semibold text-zinc-900">11</dd>
                </div>
              </dl>
            </Box>

            <Box title="latest quarter" contentClassName="p-4">
              <div className="space-y-1 text-sm">
                <p className="font-medium text-zinc-900">Q1 2026</p>
                <p>Contributions: $8,500</p>
                <p>Withdrawals: $0</p>
                <p>Net Return: +6.2%</p>
                <p>Income: $1,140</p>
              </div>
            </Box>
          </div>
        </section>
      ) : (
        <section className="flex flex-col gap-4 lg:flex-row lg:items-start">
          <Box title="allocation" className="lg:w-[30%]" contentClassName="p-4">
            <p className="text-sm text-[var(--text-soft)]">
              Current portfolio mix by weight.
            </p>
            <div className="mt-4 flex items-center justify-center">
              <svg viewBox="0 0 160 160" className="h-48 w-48" role="img" aria-label="Portfolio allocation donut chart">
                <circle cx="80" cy="80" r="48" fill="none" stroke="#e4e4e7" strokeWidth="24" />
                <circle
                  cx="80"
                  cy="80"
                  r="48"
                  fill="none"
                  stroke="#18181b"
                  strokeWidth="24"
                  strokeDasharray="90 301.59"
                  transform="rotate(-90 80 80)"
                />
                <circle
                  cx="80"
                  cy="80"
                  r="48"
                  fill="none"
                  stroke="#3f3f46"
                  strokeWidth="24"
                  strokeDasharray="75 301.59"
                  strokeDashoffset="-90"
                  transform="rotate(-90 80 80)"
                />
                <circle
                  cx="80"
                  cy="80"
                  r="48"
                  fill="none"
                  stroke="#71717a"
                  strokeWidth="24"
                  strokeDasharray="62 301.59"
                  strokeDashoffset="-165"
                  transform="rotate(-90 80 80)"
                />
              </svg>
            </div>
          </Box>

          <Box title="current holdings" className="lg:w-[70%]" contentClassName="p-4">
            <div className="overflow-x-auto">
              <table className="min-w-full border-separate border-spacing-0 text-sm">
                <thead>
                  <tr className="text-left text-[var(--text-soft)]">
                    <th className="border-b border-[var(--border)] px-3 py-2 font-medium">Symbol</th>
                    <th className="border-b border-[var(--border)] px-3 py-2 font-medium">Name</th>
                    <th className="border-b border-[var(--border)] px-3 py-2 font-medium">Weight</th>
                    <th className="border-b border-[var(--border)] px-3 py-2 font-medium">P/L</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border-b border-[var(--border)] px-3 py-2">AAPL</td>
                    <td className="border-b border-[var(--border)] px-3 py-2">Apple Inc.</td>
                    <td className="border-b border-[var(--border)] px-3 py-2">18.2%</td>
                    <td className="border-b border-[var(--border)] px-3 py-2 text-emerald-700">+14.8%</td>
                  </tr>
                  <tr>
                    <td className="border-b border-[var(--border)] px-3 py-2">MSFT</td>
                    <td className="border-b border-[var(--border)] px-3 py-2">Microsoft</td>
                    <td className="border-b border-[var(--border)] px-3 py-2">15.7%</td>
                    <td className="border-b border-[var(--border)] px-3 py-2 text-emerald-700">+9.3%</td>
                  </tr>
                  <tr>
                    <td className="border-b border-[var(--border)] px-3 py-2">NVDA</td>
                    <td className="border-b border-[var(--border)] px-3 py-2">NVIDIA</td>
                    <td className="border-b border-[var(--border)] px-3 py-2">12.9%</td>
                    <td className="border-b border-[var(--border)] px-3 py-2 text-emerald-700">+21.4%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Box>
        </section>
      )}
    </main>
  );
}
