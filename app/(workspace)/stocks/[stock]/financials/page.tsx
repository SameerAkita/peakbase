import { StocksBrowser } from "../../../../components/stocks-browser";

type StocksFinancialsPageProps = {
  params: Promise<{
    stock: string;
  }>;
};

export default async function StocksFinancialsPage({
  params,
}: StocksFinancialsPageProps) {
  const { stock } = await params;

  return (
    <StocksBrowser
      key={`${stock}-financials`}
      stockQuery={stock}
      currentTabId="financials"
    />
  );
}
