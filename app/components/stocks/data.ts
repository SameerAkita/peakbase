export type ChartPoint = {
  quarter: string;
  price: number;
};

export type CompanyMetric = {
  label: string;
  value: string;
};

export type FinancialQuarter = {
  quarter: string;
  revenueBillions: number;
  freeCashFlowBillions: number;
  sharesOutstandingBillions: number;
  dividendPerShare: number;
};

export type NewsItem = {
  title: string;
  source: string;
  date: string;
  summary: string;
};

export type CompanyData = {
  symbol: string;
  name: string;
  market: string;
  country: string;
  logo: string;
  introduction: string;
  summary: string;
  chartData: ChartPoint[];
  metrics: CompanyMetric[];
  financials: FinancialQuarter[];
  news: NewsItem[];
};

const aaplFinancials: FinancialQuarter[] = [
  { quarter: "2023-Q1", revenueBillions: 117.2, freeCashFlowBillions: 30.5, sharesOutstandingBillions: 15.9, dividendPerShare: 0.23 },
  { quarter: "2023-Q2", revenueBillions: 94.8, freeCashFlowBillions: 20.7, sharesOutstandingBillions: 15.8, dividendPerShare: 0.24 },
  { quarter: "2023-Q3", revenueBillions: 81.7, freeCashFlowBillions: 19.9, sharesOutstandingBillions: 15.7, dividendPerShare: 0.24 },
  { quarter: "2023-Q4", revenueBillions: 89.5, freeCashFlowBillions: 22.3, sharesOutstandingBillions: 15.6, dividendPerShare: 0.24 },
  { quarter: "2024-Q1", revenueBillions: 119.6, freeCashFlowBillions: 32.1, sharesOutstandingBillions: 15.5, dividendPerShare: 0.24 },
  { quarter: "2024-Q2", revenueBillions: 91.4, freeCashFlowBillions: 21.3, sharesOutstandingBillions: 15.4, dividendPerShare: 0.25 },
  { quarter: "2024-Q3", revenueBillions: 84.7, freeCashFlowBillions: 20.8, sharesOutstandingBillions: 15.3, dividendPerShare: 0.25 },
  { quarter: "2024-Q4", revenueBillions: 92.9, freeCashFlowBillions: 23.4, sharesOutstandingBillions: 15.2, dividendPerShare: 0.25 },
  { quarter: "2025-Q1", revenueBillions: 123.5, freeCashFlowBillions: 34.0, sharesOutstandingBillions: 15.1, dividendPerShare: 0.25 },
  { quarter: "2025-Q2", revenueBillions: 96.8, freeCashFlowBillions: 22.9, sharesOutstandingBillions: 15.0, dividendPerShare: 0.26 },
  { quarter: "2025-Q3", revenueBillions: 86.1, freeCashFlowBillions: 21.7, sharesOutstandingBillions: 14.9, dividendPerShare: 0.26 },
  { quarter: "2025-Q4", revenueBillions: 95.3, freeCashFlowBillions: 24.8, sharesOutstandingBillions: 14.8, dividendPerShare: 0.26 },
  { quarter: "2026-Q1", revenueBillions: 126.9, freeCashFlowBillions: 35.2, sharesOutstandingBillions: 14.7, dividendPerShare: 0.26 },
  { quarter: "2026-Q2", revenueBillions: 99.2, freeCashFlowBillions: 23.7, sharesOutstandingBillions: 14.6, dividendPerShare: 0.27 },
  { quarter: "2026-Q3", revenueBillions: 88.4, freeCashFlowBillions: 22.6, sharesOutstandingBillions: 14.5, dividendPerShare: 0.27 },
  { quarter: "2026-Q4", revenueBillions: 97.1, freeCashFlowBillions: 25.5, sharesOutstandingBillions: 14.4, dividendPerShare: 0.27 },
];

const msftFinancials: FinancialQuarter[] = [
  { quarter: "2023-Q1", revenueBillions: 52.9, freeCashFlowBillions: 16.4, sharesOutstandingBillions: 7.46, dividendPerShare: 0.68 },
  { quarter: "2023-Q2", revenueBillions: 56.2, freeCashFlowBillions: 18.1, sharesOutstandingBillions: 7.45, dividendPerShare: 0.68 },
  { quarter: "2023-Q3", revenueBillions: 58.9, freeCashFlowBillions: 19.0, sharesOutstandingBillions: 7.44, dividendPerShare: 0.75 },
  { quarter: "2023-Q4", revenueBillions: 62.1, freeCashFlowBillions: 21.2, sharesOutstandingBillions: 7.43, dividendPerShare: 0.75 },
  { quarter: "2024-Q1", revenueBillions: 56.5, freeCashFlowBillions: 18.4, sharesOutstandingBillions: 7.42, dividendPerShare: 0.75 },
  { quarter: "2024-Q2", revenueBillions: 60.3, freeCashFlowBillions: 20.6, sharesOutstandingBillions: 7.41, dividendPerShare: 0.75 },
  { quarter: "2024-Q3", revenueBillions: 63.8, freeCashFlowBillions: 22.9, sharesOutstandingBillions: 7.4, dividendPerShare: 0.83 },
  { quarter: "2024-Q4", revenueBillions: 67.2, freeCashFlowBillions: 24.5, sharesOutstandingBillions: 7.39, dividendPerShare: 0.83 },
  { quarter: "2025-Q1", revenueBillions: 61.1, freeCashFlowBillions: 21.8, sharesOutstandingBillions: 7.38, dividendPerShare: 0.83 },
  { quarter: "2025-Q2", revenueBillions: 65.4, freeCashFlowBillions: 23.7, sharesOutstandingBillions: 7.37, dividendPerShare: 0.83 },
  { quarter: "2025-Q3", revenueBillions: 69.7, freeCashFlowBillions: 26.1, sharesOutstandingBillions: 7.36, dividendPerShare: 0.9 },
  { quarter: "2025-Q4", revenueBillions: 73.3, freeCashFlowBillions: 27.4, sharesOutstandingBillions: 7.35, dividendPerShare: 0.9 },
  { quarter: "2026-Q1", revenueBillions: 66.8, freeCashFlowBillions: 24.2, sharesOutstandingBillions: 7.34, dividendPerShare: 0.9 },
  { quarter: "2026-Q2", revenueBillions: 71.2, freeCashFlowBillions: 26.8, sharesOutstandingBillions: 7.33, dividendPerShare: 0.9 },
  { quarter: "2026-Q3", revenueBillions: 75.6, freeCashFlowBillions: 28.7, sharesOutstandingBillions: 7.32, dividendPerShare: 0.98 },
  { quarter: "2026-Q4", revenueBillions: 79.9, freeCashFlowBillions: 30.1, sharesOutstandingBillions: 7.31, dividendPerShare: 0.98 },
];

export const stockData: CompanyData[] = [
  {
    symbol: "AAPL",
    name: "Apple",
    market: "NASDAQ",
    country: "United States",
    logo: "A",
    summary: "Consumer hardware and services.",
    introduction:
      "Apple designs and sells consumer electronics, software, and digital services, including iPhone, Mac, iPad, wearables, and a broad subscription ecosystem.",
    chartData: [
      { quarter: "2025-Q1", price: 182 },
      { quarter: "2025-Q2", price: 189 },
      { quarter: "2025-Q3", price: 196 },
      { quarter: "2025-Q4", price: 203 },
      { quarter: "2026-Q1", price: 211 },
      { quarter: "2026-Q2", price: 206 },
      { quarter: "2026-Q3", price: 218 },
      { quarter: "2026-Q4", price: 224 },
    ],
    metrics: [
      { label: "P/E", value: "30.1x" },
      { label: "EPS (TTM)", value: "$6.92" },
      { label: "Market Cap", value: "$3.35T" },
      { label: "Dividend Yield", value: "0.52%" },
      { label: "52W Range", value: "$165 - $228" },
      { label: "Beta", value: "1.21" },
    ],
    financials: aaplFinancials,
    news: [
      { title: "Apple expands AI features across devices", source: "Market Pulse", date: "2026-05-08", summary: "The company announced a staged rollout of on-device AI tools for productivity and messaging." },
      { title: "Services growth offsets softer hardware cycle", source: "Street Journal", date: "2026-04-29", summary: "Analysts noted recurring services revenue helped balance slower unit demand in mature categories." },
      { title: "Apple supplier diversification continues", source: "Global Tech Daily", date: "2026-04-17", summary: "Production allocation broadened across multiple regions to reduce concentration risk." },
      { title: "Developers focus on spatial and AI apps", source: "App Economy News", date: "2026-03-31", summary: "Ecosystem momentum remains strong as developers target new interfaces and subscription bundles." },
    ],
  },
  {
    symbol: "MSFT",
    name: "Microsoft",
    market: "NASDAQ",
    country: "United States",
    logo: "M",
    summary: "Platform-heavy business spanning cloud and software.",
    introduction:
      "Microsoft builds enterprise and consumer software platforms, cloud infrastructure through Azure, productivity applications, business solutions, and gaming services.",
    chartData: [
      { quarter: "2025-Q1", price: 408 },
      { quarter: "2025-Q2", price: 421 },
      { quarter: "2025-Q3", price: 437 },
      { quarter: "2025-Q4", price: 449 },
      { quarter: "2026-Q1", price: 462 },
      { quarter: "2026-Q2", price: 476 },
      { quarter: "2026-Q3", price: 489 },
      { quarter: "2026-Q4", price: 502 },
    ],
    metrics: [
      { label: "P/E", value: "35.8x" },
      { label: "EPS (TTM)", value: "$13.24" },
      { label: "Market Cap", value: "$3.70T" },
      { label: "Dividend Yield", value: "0.73%" },
      { label: "52W Range", value: "$385 - $505" },
      { label: "Beta", value: "0.94" },
    ],
    financials: msftFinancials,
    news: [
      { title: "Azure demand remains strong in enterprise", source: "Cloud Wire", date: "2026-05-10", summary: "Large enterprise renewals and AI workloads drove another quarter of cloud expansion." },
      { title: "Microsoft deepens security portfolio integration", source: "CISO Brief", date: "2026-04-26", summary: "Unified controls and telemetry were highlighted as key priorities across product lines." },
      { title: "Productivity suite adds workflow copilots", source: "Enterprise Stack", date: "2026-04-14", summary: "New workflow automation features target finance, operations, and customer support teams." },
      { title: "Gaming subscriptions show steady engagement", source: "Interactive Media Post", date: "2026-03-27", summary: "Management pointed to stable retention and broader multi-device usage in gaming services." },
    ],
  },
];

export function getStockByQuery(query?: string): CompanyData {
  const normalizedQuery = query?.trim().toLowerCase();

  if (!normalizedQuery) {
    return stockData[0];
  }

  return (
    stockData.find((stock) => stock.symbol.toLowerCase() === normalizedQuery) ??
    stockData.find((stock) => stock.name.toLowerCase() === normalizedQuery) ??
    stockData.find(
      (stock) =>
        stock.symbol.toLowerCase().includes(normalizedQuery) ||
        stock.name.toLowerCase().includes(normalizedQuery),
    ) ??
    stockData[0]
  );
}


export function getStockBySymbol(symbol?: string): CompanyData | undefined {
  const normalizedSymbol = symbol?.trim().toLowerCase();

  if (!normalizedSymbol) {
    return undefined;
  }

  return stockData.find((stock) => stock.symbol.toLowerCase() === normalizedSymbol);
}
