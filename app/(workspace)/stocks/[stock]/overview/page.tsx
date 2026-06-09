import { StocksBrowser } from "../../../../components/stocks-browser";
import { getYahooBackedStock } from "../../../../components/stocks/yahoo";

type StocksOverviewPageProps = {
  params: Promise<{
    stock: string;
  }>;
};

export default async function StocksOverviewPage({
  params,
}: StocksOverviewPageProps) {
  const { stock } = await params;
  const liveStock = await getYahooBackedStock(stock);

  return (
    <StocksBrowser
      key={`${stock}-overview`}
      stockQuery={stock}
      currentTabId="overview"
      stock={liveStock}
    />
  );
}
