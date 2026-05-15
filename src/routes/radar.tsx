import { createFileRoute } from "@tanstack/react-router";
import AppLayout from "@/components/AppLayout";
import { ArrowLeft, Loader2, Zap, CheckCircle2, ShieldAlert, GitBranch, CalendarRange } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchDashboardData } from "@/lib/api";

export const Route = createFileRoute("/radar")({ component: RadarPage });

type Alert = {
  severity: string;
  title: string;
  body: string;
  course_code?: string;
  yearly?: boolean;
};

type Alternative = {
  code: string;
  name: string;
  skill_match: number;
  difficulty: number;
  rationale: string;
};

type PathReroute = {
  blocked_course_code: string;
  blocked_course_name: string;
  scenario: string;
  delay_if_wait_terms: number;
  delay_if_wait_label: string;
  blocked_unlocks: { code: string; name: string }[];
  alternatives: Alternative[];
  expected_outcome: string;
  next_term_suggestion: string;
};

type TermBlock = {
  term_label: string;
  courses: { code: string; name: string; hours: number }[];
  total_hours: number;
  focus: string;
};

type EarlyGradPlanType = {
  id: string;
  title: string;
  summary: string;
  estimated_terms_saved: string;
  terms: TermBlock[];
};

function RadarPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["dashboard"],
    queryFn: fetchDashboardData,
  });

  if (isLoading) {
    return (
      <AppLayout title="الرادار الاستباقي">
        <div className="flex min-h-[50vh] items-center justify-center">
          <Loader2 className="h-10 w-10 animate-spin text-[color:var(--royal)]" />
        </div>
      </AppLayout>
    );
  }

  const alerts: Alert[] = data?.alerts || [];
  const reroutes: PathReroute[] = data?.shortest_path?.reroutes || [];
  const graphNodes = data?.shortest_path?.graph_nodes ?? 0;
  const earlyPlans: EarlyGradPlanType[] = data?.shortest_path?.early_graduation_plans || [];
  const isStruggling = Boolean(data?.shortest_path?.is_struggling);
  const failedList: string[] = data?.student?.failed_or_dropped || [];

  return (
    <AppLayout title="الرادار الاستباقي للمتطلبات الأساسية">
      <div className="mb-10 text-center">
        <p className="mx-auto max-w-4xl text-sm leading-relaxed text-muted-foreground">
          رصد ذكي للمواد السنوية والمتطلبات الأساسية. الخطة ممثّلة كشبكة ({graphNodes} عقدة) —
          عند التعثر أو الحذف يحسب المحرك أقصر مسار بديل بمواد تلائم قدراتك.
        </p>
      </div>

      {isStruggling && earlyPlans.length > 0 && (
        <section className="mb-12">
          <div className="mb-6 flex flex-col items-center gap-2 text-center md:flex-row md:justify-between md:text-right">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[color:var(--royal)]/15 text-[color:var(--royal)]">
                <CalendarRange className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-extrabold text-[color:var(--navy)]">خطط مقترحة للتخرج المبكر</h2>
                <p className="text-xs text-muted-foreground">
                  {failedList.length > 0
                    ? `حالة متعثرة: ${failedList.join("، ")} — جدول مقترح لاستعادة الزمن وتجميع الساعات`
                    : "سيناريو خطر على المسار — بدائل تسجيل على عدة فصول"}
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {earlyPlans.map((plan) => (
              <article
                key={plan.id}
                className="overflow-hidden rounded-3xl border-2 border-[color:var(--royal)]/25 bg-card shadow-[var(--shadow-card)]"
              >
                <div className="bg-gradient-to-l from-[color:var(--navy)] to-[color:var(--royal)] px-6 py-4 text-white">
                  <h3 className="text-base font-extrabold">{plan.title}</h3>
                  <p className="mt-1 text-[11px] text-white/85 leading-relaxed">{plan.summary}</p>
                  <p className="mt-2 text-[10px] font-bold text-[color:var(--success)]">{plan.estimated_terms_saved}</p>
                </div>
                <div className="space-y-4 p-5">
                  {plan.terms.map((term, idx) => (
                    <div
                      key={`${plan.id}-${idx}-${term.term_label}`}
                      className="rounded-2xl border border-border bg-muted/20 p-4"
                    >
                      <div className="mb-2 flex items-center justify-between gap-2">
                        <span className="text-[10px] font-extrabold text-[color:var(--royal)]">
                          {term.term_label}
                        </span>
                        <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-bold">
                          {term.total_hours} ساعة
                        </span>
                      </div>
                      <ul className="space-y-1.5">
                        {term.courses.map((c) => (
                          <li
                            key={c.code}
                            className="flex items-center justify-between gap-2 text-xs"
                          >
                            <span className="font-medium text-[color:var(--navy)]">{c.name}</span>
                            <span className="shrink-0 rounded bg-white px-1.5 py-0.5 text-[10px] font-bold ring-1 ring-border">
                              {c.code} · {c.hours}س
                            </span>
                          </li>
                        ))}
                      </ul>
                      {term.focus && (
                        <p className="mt-2 border-t border-border pt-2 text-[10px] leading-relaxed text-muted-foreground">
                          {term.focus}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      <div className="mb-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {alerts.length > 0 ? (
          alerts.map((alert, idx) => (
            <div
              key={`${alert.course_code}-${idx}`}
              className="rounded-3xl border border-border bg-card p-6 shadow-sm transition hover:shadow-md"
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold bg-red-50 text-red-600">
                  <ShieldAlert className="h-3.5 w-3.5" />
                  {alert.severity === "critical" ? "خطر مرتفع" : "تنبيه"}
                </div>
              </div>
              <h3 className="text-lg font-extrabold text-[color:var(--navy)]">{alert.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{alert.body}</p>
              <div className="mt-8">
                <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-4">
                  التوصية:
                </div>
                <div className="flex items-center gap-2 text-[11px] font-bold text-[color:var(--navy)]">
                  <ArrowLeft className="h-3.5 w-3.5 text-[color:var(--royal)]" />
                  {alert.yearly ? "سجّلي المادة في أقرب فرصة — مادة سنوية" : "راجعي الخطة مع المستشار"}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center text-muted-foreground">
            لا توجد تنبيهات نشطة حالياً.
          </div>
        )}
      </div>

      {reroutes.map((reroute) => (
        <section
          key={reroute.blocked_course_code}
          className="mb-8 rounded-3xl border border-border bg-card shadow-sm overflow-hidden border-b-4 border-b-[color:var(--navy)]"
        >
          <div className="flex items-center justify-between bg-white px-8 py-5 border-b border-border">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[color:var(--navy)] text-white shadow-xl">
              <Zap className="h-5 w-5" />
            </div>
            <div className="text-right">
              <h3 className="text-lg font-extrabold text-[color:var(--navy)]">
                أقصر مسار بديل — {reroute.blocked_course_name}
              </h3>
              <p className="text-[10px] text-muted-foreground font-medium">{reroute.scenario}</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-0">
            <div className="p-8 border-l border-border bg-green-50/20">
              <div className="mb-6 flex items-center justify-end gap-2 text-[10px] font-extrabold text-[color:var(--success)] uppercase tracking-wider">
                النتيجة المتوقعة <CheckCircle2 className="h-4 w-4" />
              </div>
              <div className="text-right">
                <div className="text-base font-extrabold text-[color:var(--success)]">
                  {reroute.expected_outcome}
                </div>
                <p className="mt-3 text-[10px] leading-relaxed text-muted-foreground">
                  {reroute.next_term_suggestion}
                </p>
              </div>
            </div>

            <div className="p-8 border-l border-border bg-slate-50/30">
              <div className="mb-6 flex items-center justify-end text-[10px] font-extrabold text-[color:var(--royal)] uppercase">
                البدائل المقترحة (حسب ملاءمة مهاراتك)
              </div>
              <div className="space-y-3 text-right">
                {reroute.alternatives.map((alt) => (
                  <div
                    key={alt.code}
                    className="rounded-lg border border-border bg-white px-3 py-2 text-xs"
                  >
                    <div className="flex items-center justify-between font-bold text-[color:var(--navy)]">
                      <span>{alt.code}</span>
                      <span className="text-[color:var(--success)]">{alt.skill_match}% ملاءمة</span>
                    </div>
                    <div className="mt-1 font-medium">{alt.name}</div>
                    <p className="mt-1 text-[10px] text-muted-foreground">{alt.rationale}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-8">
              <div className="mb-6 flex items-center justify-end text-[10px] font-extrabold text-red-500 uppercase">
                المسار المتعثر
              </div>
              <div className="text-right text-[10px] text-muted-foreground leading-relaxed space-y-2">
                <p>{reroute.delay_if_wait_label}</p>
                {reroute.blocked_unlocks.length > 0 && (
                  <div>
                    <div className="font-bold text-red-600 mb-1">مواد تُغلق بدونها:</div>
                    <ul className="space-y-1">
                      {reroute.blocked_unlocks.map((u) => (
                        <li key={u.code}>
                          {u.code} — {u.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="flex items-center justify-end gap-1 mt-4 text-[color:var(--navy)] font-bold">
                  <GitBranch className="h-3.5 w-3.5" />
                  الالتفاف الذكي عبر مواد لا تتطلب {reroute.blocked_course_code}
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {reroutes.length === 0 && (
        <section className="rounded-3xl border border-dashed border-border bg-muted/20 p-10 text-center text-sm text-muted-foreground">
          لا توجد سيناريوهات التفاف حالياً — خطتك متوازنة.
        </section>
      )}
    </AppLayout>
  );
}
