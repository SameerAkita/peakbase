import { getStockByQuery, type CompanyData } from "../data";
import { Box } from "../../box";

type InfoWidgetProps = {
  symbol: string;
  stock?: CompanyData;
};

export function InfoWidget({ symbol, stock: stockProp }: InfoWidgetProps) {
  const stock = stockProp ?? getStockByQuery(symbol);

  return (
    <Box title="company intro" contentClassName="p-4">
      <p>{stock.introduction}</p>
    </Box>
  );
}
