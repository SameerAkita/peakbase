import type { CSSProperties } from "react";

type Holding = {
  name: string;
  weight: number;
};

type DataPoint = {
  label: string;
  value: string;
};

type CommunityPortfolioCardProps = {
  logo: string;
  communityName: string;
  performancePercent: number;
  performanceLabel?: string;
  chartValues: number[];
  holdings: Holding[];
  dataPoints: DataPoint[];
  className?: string;
};

function formatSignedPercent(value: number) {
  return `${value >= 0 ? "+" : ""}${value.toFixed(2)}%`;
}

function toSparklinePoints(values: number[], width: number, height: number) {
  if (values.length === 0) {
    return "";
  }

  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = max - min || 1;

  return values
    .map((value, index) => {
      const x = (index / Math.max(values.length - 1, 1)) * width;
      const y = height - ((value - min) / range) * height;

      return `${x},${y}`;
    })
    .join(" ");
}

export function CommunityPortfolioCard({
  logo,
  communityName,
  performancePercent,
  performanceLabel = "All time",
  chartValues,
  holdings,
  dataPoints,
  className,
}: CommunityPortfolioCardProps) {
  const trendIsPositive = performancePercent >= 0;
  const lineColor = trendIsPositive ? "#059669" : "#dc2626";
  const points = toSparklinePoints(chartValues, 260, 92);

  return (
    <article className={["panel p-5", className].filter(Boolean).join(" ")}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-zinc-900 text-sm font-semibold text-white">
            {logo}
          </div>
          <div className="min-w-0">
            <p className="truncate text-base font-semibold text-zinc-950">{communityName}</p>
            <p className="text-xs text-[var(--text-soft)]">{performanceLabel}</p>
          </div>
        </div>

        <p
          className={[
            "rounded-full px-2.5 py-1 text-sm font-semibold",
            trendIsPositive ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700",
          ].join(" ")}
        >
          {formatSignedPercent(performancePercent)}
        </p>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[1.6fr_1fr]">
        <div className="panel-muted p-3">
          <svg
            viewBox="0 0 260 92"
            role="img"
            aria-label={`${communityName} performance trend`}
            className="h-24 w-full"
            preserveAspectRatio="none"
          >
            <polyline
              fill="none"
              stroke={lineColor}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={points}
            />
          </svg>
        </div>

        <div className="panel-muted p-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text-soft)]">
            Top Holdings
          </p>
          <div className="mt-3 space-y-2.5">
            {holdings.slice(0, 4).map((holding) => (
              <div key={holding.name}>
                <div className="mb-1.5 flex items-center justify-between gap-2 text-xs">
                  <span className="truncate text-zinc-700">{holding.name}</span>
                  <span className="font-medium text-zinc-950">{holding.weight.toFixed(1)}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-zinc-200">
                  <div
                    className="h-full w-[var(--holding-width)] rounded-full bg-zinc-900"
                    style={{ "--holding-width": `${Math.min(Math.max(holding.weight, 0), 100)}%` } as CSSProperties}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {dataPoints.map((point) => (
          <div key={point.label} className="panel-muted px-3 py-2">
            <p className="text-[11px] uppercase tracking-[0.18em] text-[var(--text-soft)]">{point.label}</p>
            <p className="mt-1 text-sm font-semibold text-zinc-950">{point.value}</p>
          </div>
        ))}
      </div>
    </article>
  );
}
