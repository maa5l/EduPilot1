import { T as jsxRuntimeExports } from "./server-DdGzs7CI.js";
import { L as Link } from "./router-CojGKCx8.js";
import { u as useEduPilot } from "./use-edupilot-C3h9g_Tc.js";
import { R as Radar } from "./radar-B_gEpKtr.js";
import { c as createLucideIcon } from "./createLucideIcon-dwQAv870.js";
import { C as Calendar, T as TriangleAlert } from "./triangle-alert-DNw_LG9n.js";
import { C as CircleCheck } from "./circle-check-CXvPibrl.js";
import { B as BookOpen } from "./book-open-Y6djn9lE.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const __iconNode$2 = [
  [
    "path",
    {
      d: "M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",
      key: "169zse"
    }
  ]
];
const Activity = createLucideIcon("activity", __iconNode$2);
const __iconNode$1 = [
  ["path", { d: "M7 7h10v10", key: "1tivn9" }],
  ["path", { d: "M7 17 17 7", key: "1vkiza" }]
];
const ArrowUpRight = createLucideIcon("arrow-up-right", __iconNode$1);
const __iconNode = [
  ["path", { d: "M16 7h6v6", key: "box55l" }],
  ["path", { d: "m22 7-8.5 8.5-5-5L2 17", key: "1t1m79" }]
];
const TrendingUp = createLucideIcon("trending-up", __iconNode);
function Dashboard() {
  const {
    data,
    isLoading
  } = useEduPilot();
  if (isLoading || !data) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center min-h-[60vh] text-muted-foreground", children: "جاري تحميل بياناتك من محرك EduPilot…" });
  }
  const {
    student,
    alerts,
    bridges,
    load,
    plan
  } = data;
  const firstName = student.student_name.split(" ")[0] || "الطالبة";
  const currentTermCourses = student.current_term_courses.map((code) => plan.find((c) => c.code === code)).filter((c) => Boolean(c));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 max-w-7xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl p-6 lg:p-8 text-primary-foreground relative overflow-hidden", style: {
      background: "var(--gradient-hero)"
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-white/80", children: student.program || "الفصل القادم — 1447هـ" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "mt-1 text-2xl lg:text-3xl font-bold", children: [
            "أهلاً ",
            firstName,
            " 👋"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-white/85 max-w-xl text-sm", children: [
            "لديكِ ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: alerts.length }),
            " تنبيهات و",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: bridges.length }),
            " جسور معرفة موصى بها هذا الترم."
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/prerequisites", className: "rounded-lg bg-white text-primary px-4 py-2 text-sm font-medium hover:bg-white/90 transition flex items-center gap-2 self-start", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Radar, { className: "size-4" }),
          " فتح رادار المتطلبات"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "aria-hidden": true, className: "absolute -left-16 -bottom-20 size-72 rounded-full bg-white/10 blur-3xl" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 md:grid-cols-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(KPI, { label: "ثقل الترم القادم", value: `${Math.round(load.weighted_load)}%`, hint: load.status_ar, tone: load.status === "Stressful" ? "warning" : "success", icon: Activity }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(KPI, { label: "الساعات المسجلة", value: `${load.total_hours}`, hint: "من 18 ساعة مسموحة", tone: "primary", icon: Calendar }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(KPI, { label: "المعدل التراكمي", value: student.gpa.toFixed(2), hint: `من ${student.passed_courses.length} مواد مجتازة`, tone: "success", icon: CircleCheck })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 lg:grid-cols-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "lg:col-span-2 bg-card border border-border rounded-2xl p-6 shadow-[var(--shadow-soft)]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold", children: "ثقل المواد المسجلة" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "تحليل صعوبة كل مادة بناءً على الساعات والمتطلبات السابقة" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "size-5 text-primary-royal" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 space-y-5", children: load.breakdown.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(CourseLoadRow, { course: c }, c.code)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(LoadFooter, { load })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "bg-card border border-border rounded-2xl p-6 shadow-[var(--shadow-soft)]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold", children: "تنبيهات المتطلبات الأساسية" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-xs px-2 py-1 rounded-full font-medium ${alerts.some((a) => a.severity === "critical") ? "bg-destructive/10 text-destructive" : "bg-warning/15 text-warning"}`, children: alerts.some((a) => a.severity === "critical") ? "عاجل" : alerts.length ? "للمراجعة" : "ممتاز" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 space-y-3", children: [
          alerts.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground text-center py-6", children: "لا توجد تنبيهات حالياً — خطتك على المسار الصحيح." }),
          alerts.slice(0, 3).map((a, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(AlertCard, { alert: a }, `${a.course_code}-${i}`))
        ] }),
        alerts.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/prerequisites", className: "mt-5 w-full rounded-lg border border-border hover:bg-muted text-sm py-2 flex items-center justify-center gap-2 transition", children: [
          "عرض كل التنبيهات ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "size-4" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "bg-card border border-border rounded-2xl p-6 shadow-[var(--shadow-soft)]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-semibold flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "size-5 text-primary-royal" }),
          "مواد الترم القادم"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[11px] text-muted-foreground", children: [
          currentTermCourses.length,
          " مواد · ",
          load.total_hours,
          " ساعة"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-2 md:grid-cols-2 lg:grid-cols-3", children: currentTermCourses.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `rounded-xl border p-3 ${c.yearly_only ? "border-warning/40 bg-warning/5" : "border-border bg-background"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] font-mono text-muted-foreground", children: [
            c.code,
            " · ",
            c.hours,
            " ساعات"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium truncate", children: c.name })
        ] }),
        c.yearly_only && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-warning whitespace-nowrap", children: "سنوية" })
      ] }) }, c.code)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/knowledge-bridge", className: "group block bg-card border border-border rounded-2xl p-6 shadow-[var(--shadow-soft)] hover:border-primary-royal/50 hover:shadow-md transition", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-12 rounded-xl bg-primary-royal/10 grid place-items-center text-primary-royal shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "size-6" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold", children: "جسور المعرفة" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: bridges.length > 0 ? `لدينا ${bridges.length} جسر مراجعة موصى به لتعزيز أساسك قبل بدء المواد الصعبة.` : "تابع مواد ترمك القادم مع مصادر مختارة بعناية." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-medium text-primary-royal flex items-center gap-1 shrink-0 group-hover:gap-2 transition-all", children: [
        "افتح الجسور ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "size-4" })
      ] })
    ] }) })
  ] });
}
function CourseLoadRow({
  course
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline justify-between text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: course.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
          course.code,
          " · ",
          course.hours,
          " ساعات"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-xs text-muted-foreground", children: [
        course.difficulty,
        "%"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 h-2 rounded-full bg-muted overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full rounded-full transition-all", style: {
      width: `${course.difficulty}%`,
      background: course.difficulty > 75 ? "var(--destructive)" : course.difficulty > 55 ? "var(--gradient-load)" : "var(--success)"
    } }) })
  ] });
}
function LoadFooter({
  load
}) {
  const stressful = load.status === "Stressful";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `mt-6 rounded-xl border p-4 flex items-center justify-between gap-3 ${stressful ? "border-warning/40 bg-warning/5" : "border-success/30 bg-success/5"}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: stressful ? "ترم مرهق ⚠️" : "ترم متوازن ✓" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5 leading-relaxed", children: [
        "متوسط الصعوبة ",
        /* @__PURE__ */ jsxRuntimeExports.jsxs("b", { children: [
          load.avg_difficulty,
          "%"
        ] }),
        " · الثقل المرجَّح",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsxs("b", { children: [
          load.weighted_load,
          "%"
        ] }),
        " · إجمالي الساعات ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: load.total_hours }),
        "."
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-[11px] px-2.5 py-1 rounded-full font-medium ${stressful ? "bg-warning/20 text-warning" : "bg-success/15 text-success"}`, children: load.status })
  ] });
}
function KPI({
  label,
  value,
  hint,
  tone,
  icon: Icon
}) {
  const toneClasses = {
    primary: "text-primary-royal bg-primary-royal/10",
    success: "text-success bg-success/10",
    warning: "text-warning bg-warning/15"
  }[tone];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl p-5 shadow-[var(--shadow-soft)]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `size-4 ${tone === "primary" ? "text-primary-royal" : tone === "success" ? "text-success" : "text-warning"}` })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex items-baseline justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl font-bold tracking-tight", children: value }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-[11px] px-2 py-1 rounded-full font-medium ${toneClasses}`, children: hint })
    ] })
  ] });
}
function AlertCard({
  alert
}) {
  const styles = alert.severity === "critical" ? "border-destructive/30 bg-destructive/5" : alert.severity === "warning" ? "border-warning/40 bg-warning/10" : "border-success/30 bg-success/5";
  const iconColor = alert.severity === "critical" ? "text-destructive" : alert.severity === "warning" ? "text-warning" : "text-success";
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `rounded-xl border p-3 ${styles}`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: `size-4 mt-0.5 ${iconColor}` }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: alert.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1 leading-relaxed", children: alert.body })
    ] })
  ] }) });
}
export {
  Dashboard as component
};
