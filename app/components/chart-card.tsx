"use client";

import { useState } from "react";

type ChartRange = "1D" | "5D" | "1M" | "6M" | "YTD" | "1Y" | "5Y" | "MAX";

type ChartCardPoint = {
  label: string;
  value: number;
};

type ChartCardProps = {
  data: ChartCardPoint[];
  title?: string;
  chartAriaLabel: string;
  currentLabel?: string;
  premarketLabel?: string;
  showPremarket?: boolean;
  valuePrefix?: string;
  valueSuffix?: string;
  valueDecimals?: number;
  premarketValue?: number;
  className?: string;
};

const ranges: ChartRange[] = ["1D", "5D", "1M", "6M", "YTD", "1Y", "5Y", "MAX"];

const rangeWindow: Record<ChartRange, number> = {
  "1D": 2,
  "5D": 3,
  "1M": 4,
  "6M": 5,
  YTD: 6,
  "1Y": 7,
  "5Y": 8,
  MAX: Number.POSITIVE_INFINITY,
};

function formatValue(value: number, prefix: string, suffix: string, decimals: number) {
  return `${prefix}${value.toFixed(decimals)}${suffix}`;
}

function getVisiblePoints(data: ChartCardPoint[], range: ChartRange) {
  const windowSize = rangeWindow[range];

  if (!Number.isFinite(windowSize) || data.length <= windowSize) {
    return data;
  }

  return data.slice(-windowSize);
}

export function ChartCard({
  data,
  title,
  chartAriaLabel,
  currentLabel = "Current price",
  premarketLabel = "Pre-market",
  showPremarket = true,
  valuePrefix = "$",
  valueSuffix = "",
  valueDecimals = 2,
  premarketValue,
  className,
}: ChartCardProps) {
  const [selectedRange, setSelectedRange] = useState<ChartRange>("YTD");
  const gradientId = `${chartAriaLabel.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-fill`;

  const visiblePoints = getVisiblePoints(data, selectedRange);
  const firstPoint = visiblePoints[0] ?? data[0];
  const lastPoint = visiblePoints[visiblePoints.length - 1] ?? data[data.length - 1];
  const currentValue = lastPoint?.value ?? 0;
  const changeAmount = currentValue - (firstPoint?.value ?? currentValue);
  const changePercent =
    firstPoint && firstPoint.value !== 0 ? (changeAmount / firstPoint.value) * 100 : 0;
  const derivedPremarketValue = premarketValue ?? currentValue * 1.004;

  const chartWidth = 720;
  const chartHeight = 260;
  const paddingX = 18;
  const paddingY = 28;
  const values = visiblePoints.map((point) => point.value);
  const minValue = Math.min(...values, currentValue);
  const maxValue = Math.max(...values, currentValue);
  const yRange = Math.max(maxValue - minValue, 1);
  const stepX = (chartWidth - paddingX * 2) / Math.max(visiblePoints.length - 1, 1);

  const plottedPoints = visiblePoints.map((point, index) => {
    const x = paddingX + index * stepX;
    const normalizedY = (point.value - minValue) / yRange;
    const y = chartHeight - paddingY - normalizedY * (chartHeight - paddingY * 2);

    return { ...point, x, y };
  });

  const linePath = plottedPoints.map((point) => `${point.x},${point.y}`).join(" ");
  const areaPath = [
    `M ${plottedPoints[0]?.x ?? paddingX} ${chartHeight - paddingY}`,
    ...plottedPoints.map((point) => `L ${point.x} ${point.y}`),
    `L ${plottedPoints[plottedPoints.length - 1]?.x ?? chartWidth - paddingX} ${chartHeight - paddingY}`,
    "Z",
  ].join(" ");

  const isPositive = changeAmount >= 0;
  const changeTone = isPositive ? "text-emerald-600" : "text-rose-600";
  const changeSign = isPositive ? "+" : "";

  return (
    <article className={["flex h-full flex-col", className].filter(Boolean).join(" ")}>
      {title ? <p className="px-4 text-sm font-medium">{title}</p> : null}
      <div className="panel flex h-full flex-col overflow-hidden">
        <div
          className={[
            "grid gap-0 border-b border-[var(--border)]",
            showPremarket ? "md:grid-cols-2" : "grid-cols-1",
          ].join(" ")}
        >
          <div className="flex flex-col gap-2 px-5 py-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--text-soft)]">
              {currentLabel}
            </p>
            <div className="flex flex-wrap items-end gap-x-3 gap-y-1">
              <span className="text-3xl font-semibold tracking-tight text-zinc-950">
                {formatValue(currentValue, valuePrefix, valueSuffix, valueDecimals)}
              </span>
              <span className={["text-sm font-semibold", changeTone].join(" ")}>
                {changeSign}
                {changePercent.toFixed(2)}%
              </span>
            </div>
            <p className={["text-sm font-medium", changeTone].join(" ")}>
              {changeSign}
              {formatValue(Math.abs(changeAmount), valuePrefix, valueSuffix, valueDecimals)}
            </p>
          </div>

          {showPremarket ? (
            <div className="flex flex-col justify-center gap-2 border-t border-[var(--border)] px-5 py-4 md:border-t-0 md:border-l">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--text-soft)]">
                {premarketLabel}
              </p>
              <p className="text-2xl font-semibold tracking-tight text-zinc-950">
                {formatValue(derivedPremarketValue, valuePrefix, valueSuffix, valueDecimals)}
              </p>
            </div>
          ) : null}
        </div>

        <div className="relative min-h-[18rem] flex-1 overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)]">
          <div className="absolute left-4 top-4 z-10 rounded-2xl border border-[var(--border)] bg-white/95 p-1 shadow-sm backdrop-blur">
            <div className="flex flex-wrap gap-1">
              {ranges.map((range) => {
                const isActive = range === selectedRange;

                return (
                  <button
                    key={range}
                    type="button"
                    onClick={() => setSelectedRange(range)}
                    className={[
                      "rounded-xl px-2.5 py-1.5 text-[11px] font-semibold tracking-[0.14em] transition-colors",
                      isActive
                        ? "bg-zinc-950 text-white"
                        : "text-[var(--text-soft)] hover:bg-[var(--surface-muted)] hover:text-zinc-950",
                    ].join(" ")}
                  >
                    {range}
                  </button>
                );
              })}
            </div>
          </div>

          <svg
            viewBox={`0 0 ${chartWidth} ${chartHeight}`}
            className="h-full w-full"
            role="img"
            aria-label={chartAriaLabel}
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="rgba(24, 24, 27, 0.18)" />
                <stop offset="100%" stopColor="rgba(24, 24, 27, 0)" />
              </linearGradient>
            </defs>

            {[0.2, 0.45, 0.7].map((position) => (
              <line
                key={position}
                x1="0"
                y1={chartHeight * position}
                x2={chartWidth}
                y2={chartHeight * position}
                stroke="rgba(229, 231, 235, 0.9)"
                strokeDasharray="4 8"
              />
            ))}

            <path d={areaPath} fill={`url(#${gradientId})`} />
            <polyline
              fill="none"
              stroke="rgb(24 24 27)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={linePath}
            />

            {plottedPoints.map((point, index) => (
              <circle
                key={`${point.label}-${index}`}
                cx={point.x}
                cy={point.y}
                r="4"
                fill="white"
                stroke="rgb(24 24 27)"
                strokeWidth="2"
              />
            ))}
          </svg>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between px-4 pb-4 text-xs text-[var(--text-soft)]">
            <span>{visiblePoints[0]?.label ?? ""}</span>
            <span>
              {formatValue(minValue, valuePrefix, valueSuffix, valueDecimals)} to {" "}
              {formatValue(maxValue, valuePrefix, valueSuffix, valueDecimals)}
            </span>
            <span>{visiblePoints[visiblePoints.length - 1]?.label ?? ""}</span>
          </div>
        </div>
      </div>
    </article>
  );
}
