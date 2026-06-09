import "server-only";

import { getStockByQuery, getStockBySymbol, type CompanyData, type FinancialQuarter } from "./data";

type YahooChartResponse = {
  chart?: {
    result?: Array<{
      timestamp?: number[];
      indicators?: {
        quote?: Array<{
          close?: Array<number | null>;
        }>;
      };
    }>;
  };
};

type YahooQuoteSummaryResult = {
  price?: {
    symbol?: string;
    shortName?: string;
    exchangeName?: string;
  };
  summaryProfile?: {
    country?: string;
    longBusinessSummary?: string;
  };
  summaryDetail?: {
    dividendYield?: { raw?: number };
    fiftyTwoWeekLow?: { raw?: number };
    fiftyTwoWeekHigh?: { raw?: number };
  };
  defaultKeyStatistics?: {
    beta?: { raw?: number };
    sharesOutstanding?: { raw?: number };
  };
  financialData?: {
    currentPrice?: { raw?: number };
    recommendationKey?: string;
    numberOfAnalystOpinions?: { raw?: number };
  };
  incomeStatementHistoryQuarterly?: {
    incomeStatementHistory?: Array<{
      endDate?: { fmt?: string };
      totalRevenue?: { raw?: number };
    }>;
  };
  cashflowStatementHistoryQuarterly?: {
    cashflowStatements?: Array<{
      endDate?: { fmt?: string };
      totalCashFromOperatingActivities?: { raw?: number };
      capitalExpenditures?: { raw?: number };
      dividendsPaid?: { raw?: number };
    }>;
  };
};

type YahooQuoteSummaryResponse = {
  quoteSummary?: {
    result?: YahooQuoteSummaryResult[];
  };
};

type YahooSearchResponse = {
  news?: Array<{
    title?: string;
    publisher?: string;
    providerPublishTime?: number;
    summary?: string;
  }>;
};

function formatBillions(rawValue?: number) {
  return rawValue ? rawValue / 1_000_000_000 : 0;
}

function formatQuarterLabel(dateString?: string) {
  if (!dateString) {
    return "Unknown";
  }

  const date = new Date(dateString);
  const quarter = Math.floor(date.getUTCMonth() / 3) + 1;

  return `${date.getUTCFullYear()}-Q${quarter}`;
}

function formatChartLabel(timestamp: number) {
  const date = new Date(timestamp * 1000);

  return date.toLocaleDateString("en-US", {
    month: "short",
    year: "2-digit",
    timeZone: "UTC",
  });
}

function formatPercent(value?: number) {
  if (value === undefined) {
    return "N/A";
  }

  return `${(value * 100).toFixed(2)}%`;
}

function formatCurrency(value?: number, decimals = 2) {
  if (value === undefined) {
    return "N/A";
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

function formatMarketCap(value?: number) {
  if (value === undefined) {
    return "N/A";
  }

  if (value >= 1_000_000_000_000) {
    return `$${(value / 1_000_000_000_000).toFixed(2)}T`;
  }

  if (value >= 1_000_000_000) {
    return `$${(value / 1_000_000_000).toFixed(2)}B`;
  }

  return formatCurrency(value, 0);
}

function formatRecommendation(recommendation?: string, analystCount?: number) {
  if (!recommendation) {
    return "N/A";
  }

  const label = recommendation
    .split(/[-_ ]+/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

  return analystCount ? `${label} (${analystCount})` : label;
}

function buildFinancials(
  summary: YahooQuoteSummaryResult | undefined,
  sharesOutstanding?: number,
): FinancialQuarter[] {
  const incomeStatements = summary?.incomeStatementHistoryQuarterly?.incomeStatementHistory ?? [];
  const cashflowStatements = summary?.cashflowStatementHistoryQuarterly?.cashflowStatements ?? [];

  const cashflowByDate = new Map(
    cashflowStatements.map((statement) => [statement.endDate?.fmt ?? "", statement]),
  );

  return incomeStatements
    .map((statement) => {
      const date = statement.endDate?.fmt;
      const matchingCashflow = cashflowByDate.get(date ?? "");
      const operatingCashflow = matchingCashflow?.totalCashFromOperatingActivities?.raw ?? 0;
      const capitalExpenditures = matchingCashflow?.capitalExpenditures?.raw ?? 0;
      const dividendsPaid = matchingCashflow?.dividendsPaid?.raw ?? 0;
      const perShareDividend =
        sharesOutstanding && dividendsPaid
          ? Math.abs(dividendsPaid) / sharesOutstanding
          : 0;

      return {
        quarter: formatQuarterLabel(date),
        revenueBillions: formatBillions(statement.totalRevenue?.raw),
        freeCashFlowBillions: formatBillions(operatingCashflow + capitalExpenditures),
        sharesOutstandingBillions: formatBillions(sharesOutstanding),
        dividendPerShare: perShareDividend,
      };
    })
    .filter((quarter) => quarter.revenueBillions > 0)
    .sort((a, b) => a.quarter.localeCompare(b.quarter));
}

async function fetchYahooJson(url: string) {
  const response = await fetch(url, {
    headers: {
      accept: "application/json",
      "user-agent": "Mozilla/5.0 Peakbase/1.0",
    },
    next: { revalidate: 300 },
  });

  if (!response.ok) {
    throw new Error(`Yahoo request failed: ${response.status}`);
  }

  return response.json();
}

export async function getYahooBackedStock(query?: string): Promise<CompanyData> {
  const fallbackStock = getStockByQuery(query);
  const symbol = (query ?? fallbackStock.symbol).trim().toUpperCase();

  try {
    const [chartResponse, summaryResponse, searchResponse] = await Promise.all([
      fetchYahooJson(
        `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=1mo&range=1y`,
      ) as Promise<YahooChartResponse>,
      fetchYahooJson(
        `https://query1.finance.yahoo.com/v10/finance/quoteSummary/${symbol}?modules=price,summaryProfile,summaryDetail,defaultKeyStatistics,financialData,incomeStatementHistoryQuarterly,cashflowStatementHistoryQuarterly`,
      ) as Promise<YahooQuoteSummaryResponse>,
      fetchYahooJson(
        `https://query1.finance.yahoo.com/v1/finance/search?q=${encodeURIComponent(symbol)}&quotesCount=1&newsCount=4`,
      ) as Promise<YahooSearchResponse>,
    ]);

    const summary = summaryResponse.quoteSummary?.result?.[0];
    const price = summary?.price;
    const profile = summary?.summaryProfile;
    const summaryDetail = summary?.summaryDetail;
    const keyStats = summary?.defaultKeyStatistics;
    const financialData = summary?.financialData;

    const chartResult = chartResponse.chart?.result?.[0];
    const timestamps = chartResult?.timestamp ?? [];
    const closes = chartResult?.indicators?.quote?.[0]?.close ?? [];
    const chartData = timestamps
      .map((timestamp, index) => ({
        quarter: formatChartLabel(timestamp),
        price: closes[index] ?? null,
      }))
      .filter((point): point is { quarter: string; price: number } => point.price !== null);

    const sharesOutstanding = keyStats?.sharesOutstanding?.raw;
    const financials = buildFinancials(summary, sharesOutstanding);

    const fallbackBySymbol = getStockBySymbol(symbol);
    const sourceForFallback = fallbackBySymbol ?? fallbackStock;
    const currentPrice = financialData?.currentPrice?.raw ?? chartData.at(-1)?.price;
    const rangeLow = summaryDetail?.fiftyTwoWeekLow?.raw;
    const rangeHigh = summaryDetail?.fiftyTwoWeekHigh?.raw;

    return {
      symbol: price?.symbol ?? sourceForFallback.symbol,
      name: price?.shortName ?? sourceForFallback.name,
      market: price?.exchangeName ?? sourceForFallback.market,
      country: profile?.country ?? sourceForFallback.country,
      logo: sourceForFallback.logo,
      introduction: profile?.longBusinessSummary ?? sourceForFallback.introduction,
      summary: sourceForFallback.summary,
      chartData: chartData.length > 0 ? chartData : sourceForFallback.chartData,
      metrics: [
        {
          label: "Price",
          value: formatCurrency(currentPrice),
        },
        {
          label: "Market Cap",
          value: formatMarketCap(
            currentPrice && sharesOutstanding ? currentPrice * sharesOutstanding : undefined,
          ),
        },
        {
          label: "Dividend Yield",
          value: formatPercent(summaryDetail?.dividendYield?.raw),
        },
        {
          label: "52W Range",
          value:
            rangeLow !== undefined && rangeHigh !== undefined
              ? `${formatCurrency(rangeLow, 0)} - ${formatCurrency(rangeHigh, 0)}`
              : "N/A",
        },
        {
          label: "Beta",
          value: keyStats?.beta?.raw !== undefined ? keyStats.beta.raw.toFixed(2) : "N/A",
        },
        {
          label: "Analyst View",
          value: formatRecommendation(
            financialData?.recommendationKey,
            financialData?.numberOfAnalystOpinions?.raw,
          ),
        },
      ],
      financials: financials.length > 0 ? financials : sourceForFallback.financials,
      news:
        searchResponse.news?.map((item) => ({
          title: item.title ?? "Untitled",
          source: item.publisher ?? "Yahoo Finance",
          date: item.providerPublishTime
            ? new Date(item.providerPublishTime * 1000).toISOString().slice(0, 10)
            : "N/A",
          summary: item.summary ?? "No summary available.",
        })) ?? sourceForFallback.news,
    };
  } catch {
    return fallbackStock;
  }
}
