import { StocksBrowser } from "../../components/stocks-browser";

type StocksPageProps = {
  searchParams: Promise<{
    stock?: string | string[] | undefined;
  }>;
};

export default async function StocksPage({ searchParams }: StocksPageProps) {
  const query = await searchParams;
  const stock = Array.isArray(query.stock) ? query.stock[0] : query.stock;

  return <StocksBrowser key={stock ?? "default-stock"} stockQuery={stock} />;
}
