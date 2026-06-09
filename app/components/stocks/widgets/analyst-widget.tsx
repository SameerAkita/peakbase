import { getStockByQuery, type CompanyData } from "../data";
import { Box } from "../../box";

type AnalystWidgetProps = {
  symbol: string;
  stock?: CompanyData;
};

export function AnalystWidget({ symbol, stock: stockProp }: AnalystWidgetProps) {
  const stock = stockProp ?? getStockByQuery(symbol);

  return (
    <Box title="basic metrics" contentClassName="p-4">
      <dl className="space-y-2">
        {stock.metrics.map((metric) => (
          <div key={`${stock.symbol}-${metric.label}`} className="flex items-center justify-between gap-4">
            <dt className="text-[13px] text-[var(--text-soft)]">{metric.label}</dt>
            <dd className="text-[13px] font-semibold text-zinc-900">{metric.value}</dd>
          </div>
        ))}
      </dl>
    </Box>
  );
}
