import { SectionPage } from "../../../components/section-page";

export default function CommunityPortfoliosPage() {
  return (
    <SectionPage
      eyebrow="Community Portfolios"
      title="Explore how community portfolios are organized."
      description="This page can hold grouped portfolios, leaderboards, curated collections, or shared investment themes from the community."
      metricLabel="Tracked Portfolios"
      metricValue="24"
      cards={[
        {
          title: "Top Performers",
          body: "Use this box to highlight standout portfolios, weekly movers, or strategies attracting the most attention.",
        },
        {
          title: "Shared Themes",
          body: "Surface collections around sectors, risk profiles, or macro ideas so visitors can browse community conviction quickly.",
        },
        {
          title: "Following Activity",
          body: "This area works well for showing which community portfolios are being followed, copied, or discussed most often.",
        },
      ]}
    >
      <div className="grid gap-4 md:grid-cols-2">
        <div className="panel-muted p-5">
          <p className="text-sm font-semibold text-zinc-950">Featured Lists</p>
          <p className="mt-3 text-sm leading-7 text-[var(--text-soft)]">
            Reserve this for curated portfolio shelves, editor picks, or
            community-led baskets that deserve front-page placement.
          </p>
        </div>
        <div className="panel-muted p-5">
          <p className="text-sm font-semibold text-zinc-950">Recent Changes</p>
          <p className="mt-3 text-sm leading-7 text-[var(--text-soft)]">
            This can become a live stream of allocations, additions, exits, or
            portfolio commentary from the broader community.
          </p>
        </div>
      </div>
    </SectionPage>
  );
}
