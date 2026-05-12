"use client";

import Link from "next/link";
import { useState } from "react";
import { AnalystWidget } from "./stocks/widgets/analyst-widget";
import { ChartWidget } from "./stocks/widgets/chart-widget";
import { EarningsWidget } from "./stocks/widgets/earnings-widget";
import { InfoWidget } from "./stocks/widgets/info-widget";
import { NewsWidget } from "./stocks/widgets/news-widget";

type StockBox = {
  title: string;
  eyebrow: string;
  body: string;
  footer: string;
};

type StockTab = {
  id: string;
  label: string;
};

type StockProfile = {
  symbol: string;
  name: string;
  market: string;
  country: string;
  logo: string;
  summary: string;
  financialBoxes: StockBox[];
};

const tabs: StockTab[] = [
  { id: "overview", label: "Overview" },
  { id: "financials", label: "Financials" },
];

const stocks: StockProfile[] = [
  {
    symbol: "AAPL",
    name: "Apple",
    market: "NYSE",
    country: "United States",
    logo: "A",
    summary: "Consumer hardware and services.",
    financialBoxes: [
          {
            title: "Revenue Trend",
            eyebrow: "Income Statement",
            body: "Quarterly and annual revenue visualizations.",
            footer: "Annual and quarterly views",
          },
          {
            title: "Margins",
            eyebrow: "Profitability",
            body: "Operating, gross, and net margin panels.",
            footer: "Tracked by reporting period",
          },
          {
            title: "Cash Position",
            eyebrow: "Balance Sheet",
            body: "Cash, debt, and free cash flow context.",
            footer: "Liquidity and leverage",
          },
    ],
  },
  {
    symbol: "MSFT",
    name: "Microsoft",
    market: "NYSE",
    country: "United States",
    logo: "M",
    summary: "Platform-heavy business spanning cloud and software.",
    financialBoxes: [
          {
            title: "Segment Mix",
            eyebrow: "Revenue",
            body: "Productivity, cloud, and computing contributions.",
            footer: "By business line",
          },
          {
            title: "Operating Leverage",
            eyebrow: "Efficiency",
            body: "Margin expansion and expense discipline.",
            footer: "Expense and margin view",
          },
          {
            title: "Cash Flow",
            eyebrow: "Cash",
            body: "Free cash flow and buyback context.",
            footer: "Capital return context",
          },
    ],
  },
  {
    symbol: "NVDA",
    name: "NVIDIA",
    market: "NYSE",
    country: "United States",
    logo: "N",
    summary: "High-growth semiconductor name.",
    financialBoxes: [
          {
            title: "Growth Trend",
            eyebrow: "Revenue",
            body: "Top-line expansion and acceleration.",
            footer: "Growth by period",
          },
          {
            title: "Demand Mix",
            eyebrow: "Segments",
            body: "Data center and gaming contributions.",
            footer: "Contribution view",
          },
          {
            title: "Cash Generation",
            eyebrow: "Cash Flow",
            body: "Free cash flow and spending trends.",
            footer: "Cash conversion",
          },
    ],
  },
];

const defaultTabId = "overview";
const validTabIds = new Set(["overview", "financials"]);

function findStockByQuery(query?: string) {
  const normalizedQuery = query?.trim().toLowerCase();

  if (!normalizedQuery) {
    return stocks[0];
  }

  return (
    stocks.find((stock) => stock.symbol.toLowerCase() === normalizedQuery) ??
    stocks.find((stock) => stock.name.toLowerCase() === normalizedQuery) ??
    stocks.find(
      (stock) =>
        stock.symbol.toLowerCase().includes(normalizedQuery) ||
        stock.name.toLowerCase().includes(normalizedQuery),
    ) ??
    stocks[0]
  );
}

function normalizeTabId(tabId?: string) {
  const normalizedTabId = tabId?.trim().toLowerCase();

  if (!normalizedTabId || !validTabIds.has(normalizedTabId)) {
    return defaultTabId;
  }

  return normalizedTabId;
}

function StockDataBox({ title, eyebrow, body, footer }: StockBox) {
  return (
    <article className="panel flex h-full flex-col p-5">
      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--text-soft)]">
        {eyebrow}
      </p>
      <h3 className="mt-3 text-base font-semibold text-zinc-950">{title}</h3>
      <p className="mt-3 flex-1 text-sm leading-7 text-[var(--text-soft)]">{body}</p>
      <p className="mt-4 text-xs font-medium text-zinc-500">{footer}</p>
    </article>
  );
}

function OverviewWidgetsLayout() {
  return (
    <section className="flex flex-col gap-4 lg:flex-row lg:items-start">
      <div className="flex flex-col gap-4 lg:w-[70%]">
        <ChartWidget />
        <NewsWidget />
      </div>
      <div className="flex flex-col gap-4 lg:w-[30%]">
        <InfoWidget />
        <AnalystWidget />
        <EarningsWidget />
      </div>
    </section>
  );
}

type StocksBrowserProps = {
  stockQuery?: string;
  currentTabId?: string;
};

export function StocksBrowser({ stockQuery, currentTabId }: StocksBrowserProps) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const selectedStock = findStockByQuery(stockQuery);
  const selectedTabId = normalizeTabId(currentTabId);

  const activeTab = tabs.find((tab) => tab.id === selectedTabId) ?? tabs[0];

  const isFavorite = favorites.includes(selectedStock.symbol);

  function handleToggleFavorite(symbol: string) {
    setFavorites((current) =>
      current.includes(symbol)
        ? current.filter((entry) => entry !== symbol)
        : [...current, symbol],
    );
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-1 flex-col gap-6 p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col gap-5 border-b border-(--border) pb-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex min-w-0 items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-zinc-900 text-lg font-semibold text-white">
              {selectedStock.logo}
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                <h2 className="text-2xl font-semibold tracking-tight text-zinc-950">
                  {selectedStock.name}
                </h2>
              </div>
              <div className="mt-3 flex flex-wrap gap-2 text-sm text-[var(--text-soft)]">
                <span className="rounded-full bg-[var(--surface-muted)] px-3 py-1.5">
                  Market: {selectedStock.market}
                </span>
                <span className="rounded-full bg-[var(--surface-muted)] px-3 py-1.5">
                  Country: {selectedStock.country}
                </span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => handleToggleFavorite(selectedStock.symbol)}
            aria-pressed={isFavorite}
            className={[
              "inline-flex items-center justify-center rounded-full border px-4 py-2 text-sm font-medium transition-colors sm:self-start",
              isFavorite
                ? "border-zinc-900 bg-zinc-900 text-white"
                : "border-[var(--border)] bg-white text-zinc-700 hover:bg-[var(--surface-muted)] hover:text-zinc-950",
            ].join(" ")}
          >
            {isFavorite ? "Favorited" : "Favorite"}
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => {
            const isActive = tab.id === activeTab.id;

            return (
              <Link
                key={tab.id}
                href={`/stocks/${selectedStock.symbol.toLowerCase()}/${tab.id}`}
                className={[
                  "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-zinc-900 text-white"
                    : "bg-[var(--surface-muted)] text-zinc-600 hover:bg-white hover:text-zinc-950",
                ].join(" ")}
              >
                {tab.label}
              </Link>
            );
          })}
        </div>
      </div>

      {activeTab.id === "overview" ? (
        <OverviewWidgetsLayout />
      ) : (
        <section className="grid gap-4 lg:grid-cols-3">
          {selectedStock.financialBoxes.map((box) => (
            <StockDataBox key={`${activeTab.id}-${box.title}`} {...box} />
          ))}
        </section>
      )}
    </main>
  );
}
