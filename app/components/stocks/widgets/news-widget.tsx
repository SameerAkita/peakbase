import { getStockByQuery } from "../data";
import { Box } from "../../box";

type NewsWidgetProps = {
  symbol: string;
};

export function NewsWidget({ symbol }: NewsWidgetProps) {
  const stock = getStockByQuery(symbol);

  return (
    <Box title="news" contentClassName="p-4">
      <div className="space-y-4">
        {stock.news.map((item) => (
          <article key={`${stock.symbol}-${item.title}`} className="border-b border-[var(--border)] pb-3 last:border-b-0 last:pb-0">
            <h4 className="text-sm font-semibold text-zinc-900">{item.title}</h4>
            <p className="mt-1 text-xs text-[var(--text-soft)]">
              {item.source} | {item.date}
            </p>
            <p className="mt-1 text-sm text-zinc-700">{item.summary}</p>
          </article>
        ))}
      </div>
    </Box>
  );
}
