import { createFileRoute } from "@tanstack/react-router";
import AppLayout from "@/components/AppLayout";
import { Compass, CheckCircle2, Target, BookMarked, Loader2, Sparkles } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchDashboardData } from "@/lib/api";

export const Route = createFileRoute("/track")({ component: TrackPage });

const COLOR_MAP: Record<string, string> = {
  green: "var(--gradient-hero)",
  blue: "var(--royal)",
  navy: "var(--navy)",
};

type TrackPath = {
  id: string;
  title: string;
  suitability: number;
  reasons: string[];
  electives: { code: string; name: string }[];
  color_class: string;
};

type GradeHighlight = {
  code: string;
  name: string;
  grade: number;
  domain: string;
};

function TrackPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["dashboard"],
    queryFn: fetchDashboardData,
  });

  if (isLoading) {
    return (
      <AppLayout title="مسارك الأكاديمي">
        <div className="flex min-h-[50vh] items-center justify-center">
          <Loader2 className="h-10 w-10 animate-spin text-[color:var(--royal)]" />
        </div>
      </AppLayout>
    );
  }

  const track = data?.track_recommendation;
  const paths: TrackPath[] = track?.paths ?? data?.career_paths ?? [];
  const recommendedId = track?.recommended_track_id;
  const highlights: GradeHighlight[] = track?.grade_highlights ?? [];
  const summary = track?.analysis_summary ?? "";

  return (
    <AppLayout title="مسارك الأكاديمي">
      <section
        className="mb-6 overflow-hidden rounded-2xl p-6 text-white shadow-[var(--shadow-card)]"
        style={{ background: "var(--gradient-hero)" }}
      >
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15">
            <Compass className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold md:text-2xl">توصيات الذكاء الاصطناعي لمسارك</h2>
            <p className="mt-1 max-w-2xl text-sm text-white/80">
              {summary ||
                "يحلّل المحرك درجاتك فور تسجيل الدخول ويقارنها بمجالات البرمجة والرياضيات والشبكات لترشيح المسار الأنسب وموادك الاختيارية."}
            </p>
          </div>
        </div>
      </section>

      {highlights.length > 0 && (
        <section className="mb-6 rounded-2xl border border-border bg-card p-5 shadow-sm">
          <div className="mb-3 flex items-center gap-2 text-sm font-bold text-[color:var(--navy)]">
            <Sparkles className="h-4 w-4 text-[color:var(--royal)]" />
            أعلى درجاتك (تحليل القوة)
          </div>
          <div className="flex flex-wrap gap-2">
            {highlights.map((h) => (
              <span
                key={h.code}
                className="rounded-full border border-border bg-secondary px-3 py-1.5 text-xs font-bold"
              >
                {h.name} · {h.grade.toFixed(0)}% · {h.domain}
              </span>
            ))}
          </div>
        </section>
      )}

      <div className="grid gap-5 lg:grid-cols-3">
        {paths.map((t) => {
          const isBest = t.id === recommendedId;
          const barColor = COLOR_MAP[t.color_class] ?? "var(--royal)";
          return (
            <article
              key={t.id}
              className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)]"
            >
              <div className="relative p-5 text-white" style={{ background: barColor }}>
                {isBest && (
                  <span className="absolute end-3 top-3 rounded-full bg-[color:var(--success)] px-2 py-0.5 text-[10px] font-bold">
                    الأنسب لك
                  </span>
                )}
                <div className="text-[11px] uppercase tracking-wider text-white/70">المسار</div>
                <h3 className="mt-1 text-lg font-extrabold leading-tight">{t.title}</h3>
                <div className="mt-4 flex items-center gap-2">
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/20">
                    <div className="h-full rounded-full bg-white" style={{ width: `${t.suitability}%` }} />
                  </div>
                  <span className="text-sm font-extrabold">{t.suitability}%</span>
                </div>
                <div className="mt-1 text-[11px] text-white/70">درجة الملاءمة لقدراتك</div>
              </div>

              <div className="flex flex-1 flex-col p-5">
                <div>
                  <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase text-muted-foreground">
                    <Target className="h-3.5 w-3.5" /> لماذا هذا المسار؟
                  </div>
                  <ul className="mt-2 space-y-1.5">
                    {t.reasons.map((r) => (
                      <li key={r} className="flex items-start gap-2 text-xs">
                        <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[color:var(--success)]" />
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-5">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase text-muted-foreground">
                    <BookMarked className="h-3.5 w-3.5" /> مواد اختيارية مقترحة من خطتك
                  </div>
                  <div className="mt-2 space-y-1.5">
                    {t.electives.map((e) => (
                      <div
                        key={e.code}
                        className="flex items-center justify-between rounded-lg border border-border px-3 py-2"
                      >
                        <span className="text-sm">{e.name}</span>
                        <span className="rounded-md bg-secondary px-1.5 py-0.5 text-[10px] font-bold text-[color:var(--navy)]">
                          {e.code}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  className="mt-5 rounded-lg py-2 text-xs font-bold text-white transition hover:opacity-95"
                  style={{ background: barColor }}
                >
                  {isBest ? "المسار الموصى به" : "مقارنة مع المسار الموصى"}
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </AppLayout>
  );
}
