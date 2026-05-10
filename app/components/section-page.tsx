import type { ReactNode } from "react";

type SectionPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  metricLabel: string;
  metricValue: string;
  cards: Array<{
    title: string;
    body: string;
  }>;
  children?: ReactNode;
};

export function SectionPage({
  eyebrow,
  title,
  description,
  metricLabel,
  metricValue,
  cards,
  children,
}: SectionPageProps) {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-1 flex-col gap-6 px-4 pb-4 sm:px-6 sm:pb-6 lg:px-8 lg:pb-8">
      <section className="panel flex flex-col gap-6 p-6 sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--text-soft)]">
              {eyebrow}
            </p>
            <div className="space-y-3">
              <h1 className="text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl">
                {title}
              </h1>
              <p className="max-w-xl text-sm leading-7 text-[var(--text-soft)] sm:text-base">
                {description}
              </p>
            </div>
          </div>
          <div className="panel-muted w-full max-w-xs px-5 py-4">
            <p className="text-xs uppercase tracking-[0.22em] text-[var(--text-soft)]">
              {metricLabel}
            </p>
            <p className="mt-2 text-3xl font-semibold tracking-tight text-zinc-950">
              {metricValue}
            </p>
          </div>
        </div>
        {children}
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        {cards.map((card) => (
          <article key={card.title} className="panel p-5">
            <h2 className="text-base font-semibold text-zinc-950">
              {card.title}
            </h2>
            <p className="mt-3 text-sm leading-7 text-[var(--text-soft)]">
              {card.body}
            </p>
          </article>
        ))}
      </section>
    </main>
  );
}
