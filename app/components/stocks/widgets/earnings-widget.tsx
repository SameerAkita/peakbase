import { getStockByQuery } from "../data";
import { Box } from "../../box";

type EarningsWidgetProps = {
  symbol: string;
};

export function EarningsWidget({ symbol }: EarningsWidgetProps) {
  const stock = getStockByQuery(symbol);
  const latest = stock.financials.at(-1);

  if (!latest) {
    return <Box title="latest quarter">No data</Box>;
  }

  return (
    <Box title="latest quarter" contentClassName="p-4">
      <div className="space-y-1 text-sm">
        <p className="font-medium text-zinc-900">{latest.quarter}</p>
        <p>Revenue: ${latest.revenueBillions.toFixed(1)}B</p>
        <p>Free Cash Flow: ${latest.freeCashFlowBillions.toFixed(1)}B</p>
        <p>Shares Outstanding: {latest.sharesOutstandingBillions.toFixed(2)}B</p>
        <p>Dividend/Share: ${latest.dividendPerShare.toFixed(2)}</p>
      </div>
    </Box>
  );
}
