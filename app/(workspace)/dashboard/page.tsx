import { SectionPage } from "../../components/section-page";

export default function DashboardPage() {
  return (
    <SectionPage
      eyebrow="Dashboard"
      title="A quick read on everything that matters."
      description="This landing view keeps the most important signals close at hand, with quiet spacing and lightweight panels that feel crisp rather than crowded."
      metricLabel="Active Signals"
      metricValue="12"
      cards={[
        {
          title: "Daily Snapshot",
          body: "Track the latest movement across your workspace from one place, with room for alerts, activity, and short summaries.",
        },
        {
          title: "Pinned Focus",
          body: "Reserve this area for the things you want to revisit often, whether that is a project, a metric, or a note to yourself.",
        },
        {
          title: "Recent Changes",
          body: "A compact list like this works well for showing edits, releases, or account-level updates without overwhelming the page.",
        },
      ]}
    >
      <div className="grid gap-4 lg:grid-cols-[1.6fr_1fr]">
        <div className="panel-muted p-5">
          <p className="text-sm font-semibold text-zinc-950">Overview</p>
          <p className="mt-3 text-sm leading-7 text-[var(--text-soft)]">
            The main content area is set up to support charts, KPI rows, or any
            richer dashboard modules you want to add next.
          </p>
        </div>
        <div className="panel-muted p-5">
          <p className="text-sm font-semibold text-zinc-950">Status</p>
          <p className="mt-3 text-sm leading-7 text-[var(--text-soft)]">
            The sidebar remains fixed across routed pages, so the app already
            behaves like a real workspace shell instead of a one-page mock.
          </p>
        </div>
      </div>
    </SectionPage>
  );
}
