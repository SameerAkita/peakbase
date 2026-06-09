import { ChartCard } from "../../chart-card";
import { getStockByQuery, type CompanyData } from "../data";

type ChartWidgetProps = {
  symbol: string;
  stock?: CompanyData;
};

export function ChartWidget({ symbol, stock: stockProp }: ChartWidgetProps) {
  const stock = stockProp ?? getStockByQuery(symbol);

  return (
    <ChartCard
      chartAriaLabel={`${stock.symbol} line chart`}
      data={stock.chartData.map((point) => ({ label: point.quarter, value: point.price }))}
    />
  );
}
