import { StocksBrowser } from "../../../../components/stocks-browser";

type StocksOverviewPageProps = {
  params: Promise<{
    stock: string;
  }>;
};

export default async function StocksOverviewPage({
  params,
}: StocksOverviewPageProps) {
  const { stock } = await params;

  return <StocksBrowser key={`${stock}-overview`} stockQuery={stock} currentTabId="overview" />;
}
