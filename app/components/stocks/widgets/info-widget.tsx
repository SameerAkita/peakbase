import { getStockByQuery } from "../data";
import { Box } from "../../box";

type InfoWidgetProps = {
  symbol: string;
};

export function InfoWidget({ symbol }: InfoWidgetProps) {
  const stock = getStockByQuery(symbol);

  return (
    <Box title="company intro" contentClassName="p-4">
      <p>{stock.introduction}</p>
    </Box>
  );
}
