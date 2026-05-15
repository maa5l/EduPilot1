import { createFileRoute } from "@tanstack/react-router";
import AppLayout from "@/components/AppLayout";
import { Play, Clock, Loader2, ExternalLink } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchDashboardData } from "@/lib/api";

export const Route = createFileRoute("/bridge")({ component: BridgePage });

function youtubeThumb(url: string): string | null {
  const m = url.match(/(?:v=|youtu\.be\/)([\w-]{11})/);
  return m ? `https://img.youtube.com/vi/${m[1]}/mqdefault.jpg` : null;
}

type MicroModule = {
  title: string;
  channel: string;
  duration: string;
  language?: string;
  url: string;
};

function BridgePage() {
  const { data, isLoading } = useQuery({
    queryKey: ["dashboard"],
    queryFn: fetchDashboardData,
  });

  if (isLoading) {
    return (
      <AppLayout title="مركز جسور المعرفة">
        <div className="flex min-h-[50vh] items-center justify-center">
          <Loader2 className="h-10 w-10 animate-spin text-[color:var(--royal)]" />
        </div>
      </AppLayout>
    );
  }

  const bridges = data?.bridges || [];

  return (
    <AppLayout title="مركز جسور المعرفة">
      <div className="mb-8 text-center">
        <p className="mx-auto max-w-4xl text-sm font-medium leading-relaxed text-muted-foreground">
          لكل مادة في بلاك بورد، نختار لك مصادر من يوتيوب مرتبطة بفجوة المتطلب الضعيف — اضغطي البطاقة
          لفتح الرابط مباشرة في يوتيوب.
        </p>
      </div>

      <div className="space-y-10">
        {bridges.length > 0 ? (
          bridges.map((group: {
            course_code: string;
            course_name: string;
            weak_prereq_code?: string;
            weak_prereq_name?: string;
            weak_prereq_grade?: number;
            recommendation?: string;
            micro_modules?: MicroModule[];
          }, idx: number) => {
            const modules: MicroModule[] = Array.isArray(group.micro_modules) ? group.micro_modules : [];
            return (
              <section key={`${group.course_code}-${idx}`} className="rounded-[2rem] border border-border bg-card p-8 shadow-sm">
                <header className="mb-6 flex flex-col gap-3 border-b border-border pb-6 md:flex-row md:items-center md:justify-between">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-lg bg-[color:var(--navy)] px-3 py-1.5 text-[10px] font-extrabold uppercase text-white">
                      {group.course_code}
                    </span>
                    <h3 className="text-lg font-extrabold text-[color:var(--navy)]">{group.course_name}</h3>
                  </div>
                  <div className="rounded-full bg-green-50 px-3 py-1 text-[10px] font-extrabold text-[color:var(--success)]">
                    {modules.length} مصادر · جسر معرفة
                  </div>
                </header>

                {group.weak_prereq_name != null && (
                  <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                    <span className="font-bold text-[color:var(--navy)]">
                      متطلب يحتاج تقوية: {group.weak_prereq_name}
                    </span>
                    {typeof group.weak_prereq_grade === "number" && (
                      <span> ({group.weak_prereq_grade.toFixed(0)}/100)</span>
                    )}
                    <br />
                    {group.recommendation}
                  </p>
                )}

                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                  {modules.map((m, i) => {
                    const thumb = youtubeThumb(m.url);
                    const href = m.url?.startsWith("http") ? m.url : `https://www.youtube.com/results?search_query=${encodeURIComponent(m.title)}`;
                    return (
                      <a
                        key={`${m.title}-${i}`}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-background transition hover:border-[color:var(--royal)] hover:shadow-lg"
                      >
                        <div className="relative aspect-video overflow-hidden bg-secondary">
                          {thumb ? (
                            <img
                              src={thumb}
                              alt=""
                              className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                              loading="lazy"
                            />
                          ) : (
                            <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
                          )}
                          <div className="absolute inset-0 bg-black/25 transition group-hover:bg-black/35" />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/95 text-[color:var(--destructive)] shadow-lg transition group-hover:scale-110">
                              <Play className="h-5 w-5 -scale-x-100 fill-current" />
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-1 flex-col p-3">
                          <div className="line-clamp-2 text-xs font-extrabold leading-tight text-[color:var(--navy)] group-hover:text-[color:var(--royal)]">
                            {m.title}
                          </div>
                          <div className="mt-1 line-clamp-1 text-[10px] font-medium text-muted-foreground">{m.channel}</div>
                          <div className="mt-3 flex flex-1 items-end justify-between border-t border-border pt-2 text-[10px] font-bold text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3.5 shrink-0" /> {m.duration}
                            </span>
                            {m.language && (
                              <span className="rounded bg-secondary px-1 py-0.5 text-[9px] uppercase">{m.language}</span>
                            )}
                          </div>
                          <span className="mt-2 flex items-center justify-end gap-1 text-[10px] font-bold text-[color:var(--royal)]">
                            فتح في يوتيوب <ExternalLink className="h-3 w-3" />
                          </span>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </section>
            );
          })
        ) : (
          <div className="rounded-2xl border border-dashed border-border py-20 text-center text-muted-foreground">
            <p className="text-sm font-medium">لا توجد جسور مقترحة حالياً.</p>
            <p className="mx-auto mt-2 max-w-md text-xs">
              تظهر الجسور عندما تكون لديكِ مادة قادمة صعبة ودرجة أحد متطلباتها أقل من 80.
            </p>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
