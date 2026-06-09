"use client";

import Link from "next/link";
import { useState } from "react";
import { getStockByQuery, type CompanyData } from "./stocks/data";
import { AnalystWidget } from "./stocks/widgets/analyst-widget";
import { ChartWidget } from "./stocks/widgets/chart-widget";
import { EarningsWidget } from "./stocks/widgets/earnings-widget";
import { InfoWidget } from "./stocks/widgets/info-widget";
import { NewsWidget } from "./stocks/widgets/news-widget";

type StockTab = {
  id: string;
  label: string;
};

const tabs: StockTab[] = [
  { id: "overview", label: "Overview" },
  { id: "financials", label: "Financials" },
];

const defaultTabId = "overview";
const validTabIds = new Set(["overview", "financials"]);

function normalizeTabId(tabId?: string) {
  const normalizedTabId = tabId?.trim().toLowerCase();

  if (!normalizedTabId || !validTabIds.has(normalizedTabId)) {
    return defaultTabId;
  }

  return normalizedTabId;
}

function OverviewWidgetsLayout({ symbol, stock }: { symbol: string; stock: CompanyData }) {
  return (
    <section className="flex flex-col gap-4 lg:flex-row lg:items-start">
      <div className="flex flex-col gap-4 lg:w-[70%]">
        <ChartWidget symbol={symbol} stock={stock} />
        <NewsWidget symbol={symbol} stock={stock} />
      </div>
      <div className="flex flex-col gap-4 lg:w-[30%]">
        <InfoWidget symbol={symbol} stock={stock} />
        <AnalystWidget symbol={symbol} stock={stock} />
        <EarningsWidget symbol={symbol} stock={stock} />
      </div>
    </section>
  );
}

type AnnualFinancial = {
  year: string;
  revenueBillions: number;
  freeCashFlowBillions: number;
  sharesOutstandingBillions: number;
  dividendPerShare: number;
};

function toAnnualFinancials(stock: CompanyData): AnnualFinancial[] {
  const grouped = new Map<string, AnnualFinancial & { quarterCount: number }>();

  stock.financials.forEach((quarter) => {
    const [year] = quarter.quarter.split("-");
    const current = grouped.get(year) ?? {
      year,
      revenueBillions: 0,
      freeCashFlowBillions: 0,
      sharesOutstandingBillions: 0,
      dividendPerShare: 0,
      quarterCount: 0,
    };

    current.revenueBillions += quarter.revenueBillions;
    current.freeCashFlowBillions += quarter.freeCashFlowBillions;
    current.sharesOutstandingBillions += quarter.sharesOutstandingBillions;
    current.dividendPerShare += quarter.dividendPerShare;
    current.quarterCount += 1;

    grouped.set(year, current);
  });

  return [...grouped.values()]
    .sort((a, b) => Number(a.year) - Number(b.year))
    .map(({ quarterCount, ...entry }) => ({
      ...entry,
      sharesOutstandingBillions: entry.sharesOutstandingBillions / quarterCount,
    }));
}

type BarChartWidgetProps = {
  title: string;
  subtitle: string;
  data: Array<{ label: string; value: number }>;
  valueFormatter: (value: number) => string;
};

function BarChartWidget({ title, subtitle, data, valueFormatter }: BarChartWidgetProps) {
  const maxValue = Math.max(...data.map((point) => point.value), 1);

  return (
    <article className="panel flex h-full flex-col p-5">
      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--text-soft)]">
        {subtitle}
      </p>
      <h3 className="mt-3 text-base font-semibold text-zinc-950">{title}</h3>
      <div className="mt-4 flex flex-1 items-end gap-3">
        {data.map((point) => {
          const barHeight = Math.max((point.value / maxValue) * 120, 4);

          return (
            <div key={`${title}-${point.label}`} className="flex flex-1 flex-col items-center gap-2">
              <div className="text-xs font-medium text-zinc-700">{valueFormatter(point.value)}</div>
              <div className="flex h-32 items-end">
                <div className="w-9 rounded-t bg-zinc-900" style={{ height: `${barHeight}px` }} />
              </div>
              <div className="text-[11px] text-[var(--text-soft)]">{point.label}</div>
            </div>
          );
        })}
      </div>
    </article>
  );
}

function FinancialsWidgetsLayout({ stock }: { stock: CompanyData }) {
  const annual = toAnnualFinancials(stock);
  const yearlyData = annual.map((entry) => ({ label: entry.year, value: entry.revenueBillions }));
  const fcfData = annual.map((entry) => ({ label: entry.year, value: entry.freeCashFlowBillions }));
  const sharesData = annual.map((entry) => ({
    label: entry.year,
    value: entry.sharesOutstandingBillions,
  }));
  const dividendData = annual.map((entry) => ({ label: entry.year, value: entry.dividendPerShare }));

  return (
    <section className="grid gap-4 lg:grid-cols-2">
      <BarChartWidget
        title="Revenue"
        subtitle="Annual View"
        data={yearlyData}
        valueFormatter={(value) => `${value.toFixed(1)}B`}
      />
      <BarChartWidget
        title="Free Cash Flow"
        subtitle="Annual View"
        data={fcfData}
        valueFormatter={(value) => `${value.toFixed(1)}B`}
      />
      <BarChartWidget
        title="Shares Outstanding"
        subtitle="Annual Average"
        data={sharesData}
        valueFormatter={(value) => `${value.toFixed(2)}B`}
      />
      <BarChartWidget
        title="Dividend Per Share"
        subtitle="Annual Total"
        data={dividendData}
        valueFormatter={(value) => `$${value.toFixed(2)}`}
      />
    </section>
  );
}

type StocksBrowserProps = {
  stockQuery?: string;
  currentTabId?: string;
  stock?: CompanyData;
};

export function StocksBrowser({ stockQuery, currentTabId, stock }: StocksBrowserProps) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const selectedStock = stock ?? getStockByQuery(stockQuery);
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
                  Symbol: {selectedStock.symbol}
                </span>
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
        <OverviewWidgetsLayout symbol={selectedStock.symbol} stock={selectedStock} />
      ) : (
        <FinancialsWidgetsLayout stock={selectedStock} />
      )}
    </main>
  );
}
