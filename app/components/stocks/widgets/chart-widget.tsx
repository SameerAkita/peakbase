import { getStockByQuery } from "../data";
import { Box } from "../../box";

type ChartWidgetProps = {
  symbol: string;
};

export function ChartWidget({ symbol }: ChartWidgetProps) {
  const stock = getStockByQuery(symbol);
  const prices = stock.chartData.map((point) => point.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  const chartWidth = 720;
  const chartHeight = 180;
  const padding = 20;
  const stepX = (chartWidth - padding * 2) / Math.max(stock.chartData.length - 1, 1);
  const yRange = Math.max(maxPrice - minPrice, 1);

  const points = stock.chartData.map((point, index) => {
    const x = padding + index * stepX;
    const normalizedY = (point.price - minPrice) / yRange;
    const y = chartHeight - padding - normalizedY * (chartHeight - padding * 2);

    return { ...point, x, y };
  });

  const linePath = points.map((point) => `${point.x},${point.y}`).join(" ");

  return (
    <Box title="chart" className="h-full" contentClassName="p-4">
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs text-[var(--text-soft)]">
          <span>Price trend</span>
          <span>
            ${minPrice} - ${maxPrice}
          </span>
        </div>

        <svg
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          className="h-52 w-full rounded-lg border border-[var(--border)] bg-white"
          role="img"
          aria-label={`${stock.symbol} line chart`}
        >
          <polyline
            fill="none"
            stroke="rgb(24 24 27)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={linePath}
          />

          {points.map((point) => (
            <g key={`${stock.symbol}-${point.quarter}`}>
              <circle cx={point.x} cy={point.y} r="3.5" fill="rgb(24 24 27)" />
            </g>
          ))}
        </svg>
      </div>
    </Box>
  );
}
