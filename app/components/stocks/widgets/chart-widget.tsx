import { ChartCard } from "../../chart-card";
import { getStockByQuery } from "../data";

type ChartWidgetProps = {
  symbol: string;
};

export function ChartWidget({ symbol }: ChartWidgetProps) {
  const stock = getStockByQuery(symbol);

  return (
    <ChartCard
      chartAriaLabel={`${stock.symbol} line chart`}
      data={stock.chartData.map((point) => ({ label: point.quarter, value: point.price }))}
    />
  );
}
