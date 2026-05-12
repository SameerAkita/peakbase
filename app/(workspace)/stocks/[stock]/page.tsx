import { redirect } from "next/navigation";

type StockLandingPageProps = {
  params: Promise<{
    stock: string;
  }>;
};

export default async function StockLandingPage({ params }: StockLandingPageProps) {
  const { stock } = await params;

  redirect(`/stocks/${stock.toLowerCase()}/overview`);
}
