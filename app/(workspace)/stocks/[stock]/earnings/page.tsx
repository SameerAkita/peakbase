import { StocksBrowser } from "../../../../components/stocks-browser";

type StocksEarningsPageProps = {
  params: Promise<{
    stock: string;
  }>;
};

export default async function StocksEarningsPage({
  params,
}: StocksEarningsPageProps) {
  const { stock } = await params;

  return <StocksBrowser key={`${stock}-earnings`} stockQuery={stock} currentTabId="earnings" />;
}
