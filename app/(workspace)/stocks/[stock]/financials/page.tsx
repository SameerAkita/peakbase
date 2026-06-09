import { StocksBrowser } from "../../../../components/stocks-browser";
import { getYahooBackedStock } from "../../../../components/stocks/yahoo";

type StocksFinancialsPageProps = {
  params: Promise<{
    stock: string;
  }>;
};

export default async function StocksFinancialsPage({
  params,
}: StocksFinancialsPageProps) {
  const { stock } = await params;
  const liveStock = await getYahooBackedStock(stock);

  return (
    <StocksBrowser
      key={`${stock}-financials`}
      stockQuery={stock}
      currentTabId="financials"
      stock={liveStock}
    />
  );
}
