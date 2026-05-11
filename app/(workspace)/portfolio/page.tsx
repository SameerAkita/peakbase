import { SectionPage } from "../../components/section-page";

export default function PortfolioPage() {
  return (
    <SectionPage
      eyebrow="Portfolio"
      title="A tidy space for holdings, projects, and progress."
      description="This section uses the same visual language as the dashboard, so moving between views feels consistent while still giving each page a clear job."
      metricLabel="Tracked Items"
      metricValue="28"
      cards={[
        {
          title: "Allocation",
          body: "Use this card zone for category splits, project mix, or any other grouped breakdown that benefits from a clean bordered layout.",
        },
        {
          title: "Performance",
          body: "A calm panel system makes it easier to show numerical movement without the screen feeling heavy or overdesigned.",
        },
        {
          title: "Watchlist",
          body: "This is a good fit for a short list of upcoming opportunities, targets, or portfolio actions.",
        },
      ]}
    >
      <div className="panel-muted p-5">
        <p className="text-sm font-semibold text-zinc-950">Portfolio Summary</p>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-(--text-soft)">
          The structure here is intentionally simple so we can plug in real
          tables, charts, or item grids later without having to rethink the
          shell.
        </p>
      </div>
    </SectionPage>
  );
}
