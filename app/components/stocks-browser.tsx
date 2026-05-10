"use client";

import { useState } from "react";

type StockBox = {
  title: string;
  eyebrow: string;
  body: string;
  footer: string;
};

type StockTab = {
  id: string;
  label: string;
  boxes: StockBox[];
};

type StockProfile = {
  symbol: string;
  name: string;
  market: string;
  country: string;
  logo: string;
  summary: string;
  tabs: StockTab[];
};

const stocks: StockProfile[] = [
  {
    symbol: "AAPL",
    name: "Apple",
    market: "NYSE",
    country: "United States",
    logo: "A",
    summary:
      "Consumer hardware and services with strong ecosystem retention and steady product-cycle interest.",
    tabs: [
      {
        id: "overview",
        label: "Overview",
        boxes: [
          {
            title: "Price Chart",
            eyebrow: "Chart",
            body:
              "A compact chart panel can live here with intraday or multi-period movement, plus simple overlays for volume or trend.",
            footer: "Range: 1D, 1W, 1M, 1Y",
          },
          {
            title: "Latest News",
            eyebrow: "News",
            body:
              "Headline cards can summarize the biggest company updates, product launches, analyst moves, or regulatory developments.",
            footer: "Updated from your chosen data source",
          },
          {
            title: "Key Stats",
            eyebrow: "Snapshot",
            body:
              "Use this box for market cap, P/E, dividend yield, beta, and other top-line metrics that help frame the name quickly.",
            footer: "Metrics at a glance",
          },
        ],
      },
      {
        id: "financials",
        label: "Financials",
        boxes: [
          {
            title: "Revenue Trend",
            eyebrow: "Income Statement",
            body:
              "Quarterly and annual revenue visualizations fit well here, especially if you later compare growth rates across periods.",
            footer: "Annual and quarterly views",
          },
          {
            title: "Margins",
            eyebrow: "Profitability",
            body:
              "Operating, gross, and net margin panels can show whether execution is improving or compressing over time.",
            footer: "Tracked by reporting period",
          },
          {
            title: "Cash Position",
            eyebrow: "Balance Sheet",
            body:
              "Display cash, debt, and free cash flow context in one reusable box so capital strength is easy to review.",
            footer: "Liquidity and leverage",
          },
        ],
      },
      {
        id: "earnings",
        label: "Earnings",
        boxes: [
          {
            title: "Next Report",
            eyebrow: "Calendar",
            body:
              "A date, consensus expectations, and countdown treatment work nicely here for the next scheduled earnings event.",
            footer: "Upcoming catalyst",
          },
          {
            title: "Surprise History",
            eyebrow: "Performance",
            body:
              "This section can show beats and misses over recent quarters, with a quick visual pattern for consistency.",
            footer: "Quarter-over-quarter context",
          },
          {
            title: "Call Notes",
            eyebrow: "Commentary",
            body:
              "Management guidance, sentiment, and notable themes from prior calls can be captured in a reusable notes panel.",
            footer: "Highlights and follow-ups",
          },
        ],
      },
    ],
  },
  {
    symbol: "MSFT",
    name: "Microsoft",
    market: "NYSE",
    country: "United States",
    logo: "M",
    summary:
      "Platform-heavy business spanning cloud, software, and enterprise productivity with broad institutional attention.",
    tabs: [
      {
        id: "overview",
        label: "Overview",
        boxes: [
          {
            title: "Price Chart",
            eyebrow: "Chart",
            body:
              "This panel can foreground trend structure, relative strength, and major price zones for cloud-led leadership names.",
            footer: "Price and volume",
          },
          {
            title: "Latest News",
            eyebrow: "News",
            body:
              "Use the same reusable box shell for AI announcements, enterprise demand updates, or large partnership developments.",
            footer: "Recent coverage",
          },
          {
            title: "Key Stats",
            eyebrow: "Snapshot",
            body:
              "A stable stat card works well for cloud mix, valuation multiples, and large-cap comparison metrics.",
            footer: "Core metrics",
          },
        ],
      },
      {
        id: "financials",
        label: "Financials",
        boxes: [
          {
            title: "Segment Mix",
            eyebrow: "Revenue",
            body:
              "A structured box can break out productivity, cloud, and computing contributions without changing the page layout.",
            footer: "By business line",
          },
          {
            title: "Operating Leverage",
            eyebrow: "Efficiency",
            body:
              "Highlight margin expansion and expense discipline through a consistent card format that scales across stocks.",
            footer: "Expense and margin view",
          },
          {
            title: "Cash Flow",
            eyebrow: "Cash",
            body:
              "Free cash flow strength, buybacks, and balance-sheet flexibility are a natural fit for this reusable module.",
            footer: "Capital return context",
          },
        ],
      },
      {
        id: "earnings",
        label: "Earnings",
        boxes: [
          {
            title: "Next Report",
            eyebrow: "Calendar",
            body:
              "Store the next print date, estimated EPS, and expected cloud commentary in a focused event box.",
            footer: "Scheduled event",
          },
          {
            title: "Estimate Revisions",
            eyebrow: "Expectations",
            body:
              "Track how analyst expectations moved ahead of the quarter so the setup around earnings is easier to read.",
            footer: "Consensus direction",
          },
          {
            title: "Management Themes",
            eyebrow: "Transcript",
            body:
              "Reusable notes boxes work well for recurring topics like AI monetization, demand visibility, and spending trends.",
            footer: "Recurring discussion points",
          },
        ],
      },
    ],
  },
  {
    symbol: "NVDA",
    name: "NVIDIA",
    market: "NYSE",
    country: "United States",
    logo: "N",
    summary:
      "High-growth semiconductor name often driven by AI infrastructure demand, supply dynamics, and valuation sensitivity.",
    tabs: [
      {
        id: "overview",
        label: "Overview",
        boxes: [
          {
            title: "Price Chart",
            eyebrow: "Chart",
            body:
              "Momentum-heavy names benefit from a chart card that emphasizes trend acceleration, pullbacks, and range extension.",
            footer: "Momentum view",
          },
          {
            title: "Latest News",
            eyebrow: "News",
            body:
              "Use a reusable news box here for chip demand, hyperscaler spending, export policy, or product roadmap updates.",
            footer: "Headline flow",
          },
          {
            title: "Key Stats",
            eyebrow: "Snapshot",
            body:
              "Summarize valuation, growth, and volume-driven signals in the same card shell used for every other stock.",
            footer: "Fast reference",
          },
        ],
      },
      {
        id: "financials",
        label: "Financials",
        boxes: [
          {
            title: "Growth Trend",
            eyebrow: "Revenue",
            body:
              "This card can show the pace of top-line expansion and whether acceleration is broad-based or concentrated.",
            footer: "Growth by period",
          },
          {
            title: "Demand Mix",
            eyebrow: "Segments",
            body:
              "A modular financial box is useful for data center, gaming, and other segment contributions over time.",
            footer: "Contribution view",
          },
          {
            title: "Cash Generation",
            eyebrow: "Cash Flow",
            body:
              "Highlight free cash flow and spending trends in a card that remains consistent across tabs and companies.",
            footer: "Cash conversion",
          },
        ],
      },
      {
        id: "earnings",
        label: "Earnings",
        boxes: [
          {
            title: "Next Report",
            eyebrow: "Calendar",
            body:
              "This event panel can capture guidance expectations, data-center demand assumptions, and key dates.",
            footer: "Next catalyst",
          },
          {
            title: "Quarterly Surprises",
            eyebrow: "History",
            body:
              "A reusable history card can summarize beats, misses, and market reactions around recent earnings releases.",
            footer: "Reaction pattern",
          },
          {
            title: "Guidance Watch",
            eyebrow: "Focus",
            body:
              "Use this space for the handful of guidance signals you care most about heading into the next quarter.",
            footer: "What to watch",
          },
        ],
      },
    ],
  },
];

const defaultTabId = "overview";

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

function StockDataBox({ title, eyebrow, body, footer }: StockBox) {
  return (
    <article className="panel flex h-full flex-col p-5">
      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--text-soft)]">
        {eyebrow}
      </p>
      <h3 className="mt-3 text-base font-semibold text-zinc-950">{title}</h3>
      <p className="mt-3 flex-1 text-sm leading-7 text-[var(--text-soft)]">
        {body}
      </p>
      <p className="mt-4 text-xs font-medium text-zinc-500">{footer}</p>
    </article>
  );
}

export function StocksBrowser({ stockQuery }: { stockQuery?: string }) {
  const [selectedTabId, setSelectedTabId] = useState(defaultTabId);
  const [favorites, setFavorites] = useState<string[]>([]);
  const selectedStock = findStockByQuery(stockQuery);

  const activeTab =
    selectedStock.tabs.find((tab) => tab.id === selectedTabId) ??
    selectedStock.tabs[0];

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
      <section className="panel flex flex-col gap-6 p-6 sm:p-8">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--text-soft)]">
                Stocks
              </p>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl">
                Search a stock and review the data that matters by tab.
              </h1>
              <p className="mt-3 text-sm leading-7 text-[var(--text-soft)] sm:text-base">
                Use the global searchbar to load a stock, then switch between
                overview, financials, earnings, and other sections using the
                same reusable card layout.
              </p>
            </div>

            <div className="panel-muted w-full max-w-sm p-4">
              <p className="text-xs uppercase tracking-[0.22em] text-[var(--text-soft)]">
                Favorites
              </p>
              <p className="mt-2 text-3xl font-semibold tracking-tight text-zinc-950">
                {favorites.length}
              </p>
              <p className="mt-2 text-sm leading-6 text-[var(--text-soft)]">
                Keep important names pinned while you compare setups.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="panel flex flex-col gap-6 p-6 sm:p-8">
        <div className="flex flex-col gap-5 border-b border-[var(--border)] pb-6">
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
                  <span className="rounded-full border border-[var(--border)] bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text-soft)]">
                    {selectedStock.symbol}
                  </span>
                </div>
                <div className="mt-3 flex flex-wrap gap-2 text-sm text-[var(--text-soft)]">
                  <span className="rounded-full bg-[var(--surface-muted)] px-3 py-1.5">
                    Market: {selectedStock.market}
                  </span>
                  <span className="rounded-full bg-[var(--surface-muted)] px-3 py-1.5">
                    Country: {selectedStock.country}
                  </span>
                </div>
                <p className="mt-4 max-w-3xl text-sm leading-7 text-[var(--text-soft)]">
                  {selectedStock.summary}
                </p>
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
            {selectedStock.tabs.map((tab) => {
              const isActive = tab.id === activeTab.id;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSelectedTabId(tab.id)}
                  className={[
                    "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-zinc-900 text-white"
                      : "bg-[var(--surface-muted)] text-zinc-600 hover:bg-white hover:text-zinc-950",
                  ].join(" ")}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {activeTab.boxes.map((box) => (
            <StockDataBox key={`${activeTab.id}-${box.title}`} {...box} />
          ))}
        </div>
      </section>
    </main>
  );
}
