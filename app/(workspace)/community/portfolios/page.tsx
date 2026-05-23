import { CommunityPortfolioCard } from "../../../components/community-portfolio-card";

type PortfolioPreview = {
  id: string;
  logo: string;
  communityName: string;
  performancePercent: number;
  performanceLabel: string;
  chartValues: number[];
  holdings: Array<{
    name: string;
    weight: number;
  }>;
  dataPoints: Array<{
    label: string;
    value: string;
  }>;
};

const portfolioPreviews: PortfolioPreview[] = [
  {
    id: "ai-builders",
    logo: "AI",
    communityName: "AI Builders Club",
    performancePercent: 18.3,
    performanceLabel: "Last 12 months",
    chartValues: [24, 30, 29, 35, 41, 45, 50, 47, 52, 58],
    holdings: [
      { name: "NVIDIA", weight: 24.8 },
      { name: "Microsoft", weight: 19.6 },
      { name: "Broadcom", weight: 14.4 },
      { name: "TSMC", weight: 11.2 },
    ],
    dataPoints: [
      { label: "YTD", value: "+9.4%" },
      { label: "5Y", value: "+142.0%" },
      { label: "P/E", value: "28.6" },
      { label: "Vol", value: "1.18" },
    ],
  },
  {
    id: "income-lab",
    logo: "IN",
    communityName: "Income Lab",
    performancePercent: -2.7,
    performanceLabel: "Last 12 months",
    chartValues: [42, 44, 43, 39, 37, 40, 38, 35, 34, 33],
    holdings: [
      { name: "Schwab US Dividend ETF", weight: 27.1 },
      { name: "Coca-Cola", weight: 14.7 },
      { name: "Johnson & Johnson", weight: 13.4 },
      { name: "Procter & Gamble", weight: 12.8 },
    ],
    dataPoints: [
      { label: "YTD", value: "+1.1%" },
      { label: "5Y", value: "+56.2%" },
      { label: "Yield", value: "3.4%" },
      { label: "Beta", value: "0.72" },
    ],
  },
];

export default function CommunityPortfoliosPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-1 flex-col gap-6 p-4 sm:px-6 sm:pb-6 lg:px-8 lg:pb-8">
      <section className="">
        <div className="border-b border-(--border) pb-6">
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-950 sm:text-3xl">
            Community Portfolios
          </h1>          
        </div>
        <div className="flex flex-row justify-between pt-2 gap-3 sm:flex-row sm:items-center">
            <div className="inline-flex w-fit items-center rounded-xl border border-(--border) bg-[var(--surface-muted)] p-1">
              <button
                type="button"
                aria-pressed="true"
                className="rounded-lg bg-white px-3 py-1.5 text-sm font-medium text-zinc-950 shadow-sm"
              >
                YTD
              </button>
              <button
                type="button"
                aria-pressed="false"
                className="rounded-lg px-3 py-1.5 text-sm font-medium text-zinc-600"
              >
                Week
              </button>
            </div>

            <label className="inline-flex items-center gap-2 text-sm text-zinc-700">
              <span className="text-[var(--text-soft)]">Filter</span>
              <select
                defaultValue="highest-to-lowest"
                className="rounded-xl border border-(--border) bg-white px-3 py-2 text-sm text-zinc-900 outline-none"
              >
                <option value="highest-to-lowest">Highest to lowest</option>
                <option value="most-followers">Most followers</option>
                <option value="lowest-to-highest">Lowest to highest</option>
                <option value="least-followers">Least followers</option>
              </select>
            </label>
          </div>
      </section>

      <section className="grid gap-4">
        {portfolioPreviews.map((portfolio) => (
          <CommunityPortfolioCard
            key={portfolio.id}
            logo={portfolio.logo}
            communityName={portfolio.communityName}
            performancePercent={portfolio.performancePercent}
            performanceLabel={portfolio.performanceLabel}
            chartValues={portfolio.chartValues}
            holdings={portfolio.holdings}
            dataPoints={portfolio.dataPoints}
          />
        ))}
      </section>
    </main>
  );
}
