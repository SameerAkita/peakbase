import { SectionPage } from "../../components/section-page";

export default function CommunityPage() {
  return (
    <SectionPage
      eyebrow="Community"
      title="Keep people, posts, and activity in one calm place."
      description="The lighter treatment works especially well for communication-heavy pages because it stays readable and lets the content carry the emphasis."
      metricLabel="New Updates"
      metricValue="07"
      cards={[
        {
          title: "Conversations",
          body: "Great place for recent threads, direct messages, or discussion highlights that deserve quick access.",
        },
        {
          title: "Events",
          body: "You can use a surface like this for scheduled sessions, launches, or collaborative milestones.",
        },
        {
          title: "Members",
          body: "A clean card system also translates nicely to people directories, profile previews, and contributor summaries.",
        },
      ]}
    >
      <div className="grid gap-4 md:grid-cols-2">
        <div className="panel-muted p-5">
          <p className="text-sm font-semibold text-zinc-950">Activity Feed</p>
          <p className="mt-3 text-sm leading-7 text-[var(--text-soft)]">
            This section is ready for a feed or announcement stack while keeping
            the same restrained border and spacing system.
          </p>
        </div>
        <div className="panel-muted p-5">
          <p className="text-sm font-semibold text-zinc-950">Groups</p>
          <p className="mt-3 text-sm leading-7 text-[var(--text-soft)]">
            If you later add filters or tabs, they can sit comfortably here
            without changing the overall shell.
          </p>
        </div>
      </div>
    </SectionPage>
  );
}
