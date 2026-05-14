import { T as jsxRuntimeExports } from "./server-DdGzs7CI.js";
import { u as useEduPilot } from "./use-edupilot-C3h9g_Tc.js";
import { B as BookOpen } from "./book-open-Y6djn9lE.js";
import { c as createLucideIcon } from "./createLucideIcon-dwQAv870.js";
import { S as Sparkles } from "./sparkles-DdzEQW01.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./router-CojGKCx8.js";
const __iconNode$3 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
  ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }]
];
const CircleAlert = createLucideIcon("circle-alert", __iconNode$3);
const __iconNode$2 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 6v6l4 2", key: "mmk7yg" }]
];
const Clock = createLucideIcon("clock", __iconNode$2);
const __iconNode$1 = [
  [
    "path",
    {
      d: "M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",
      key: "10ikf1"
    }
  ]
];
const Play = createLucideIcon("play", __iconNode$1);
const __iconNode = [
  [
    "path",
    {
      d: "M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17",
      key: "1q2vi4"
    }
  ],
  ["path", { d: "m10 15 5-3-5-3z", key: "1jp15x" }]
];
const Youtube = createLucideIcon("youtube", __iconNode);
function KnowledgeBridge() {
  const {
    data,
    isLoading
  } = useEduPilot();
  if (isLoading || !data) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center min-h-[60vh] text-muted-foreground", children: "جاري تحضير جسور المعرفة…" });
  }
  const {
    bridges,
    student,
    plan
  } = data;
  const bridgesByCourse = /* @__PURE__ */ new Map();
  for (const b of bridges) {
    const arr = bridgesByCourse.get(b.course_code) ?? [];
    arr.push(b);
    bridgesByCourse.set(b.course_code, arr);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 max-w-7xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-2xl font-bold flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "size-6 text-primary-royal" }),
        " جسور المعرفة"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-1 max-w-3xl leading-relaxed", children: [
        "استناداً إلى تحليل سجلك الأكاديمي (",
        student.passed_courses.length,
        " ",
        "مادة مجتازة)، رصدنا المواد القادمة التي تحتاج إلى مراجعة استباقية لأن درجاتك في متطلباتها السابقة كانت دون 80/100."
      ] })
    ] }),
    bridges.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyBridges, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-5", children: Array.from(bridgesByCourse.entries()).map(([code, items]) => {
      const planCourse = plan.find((c) => c.code === code);
      const first = items[0];
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "bg-card border border-border rounded-2xl p-6 shadow-[var(--shadow-soft)]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between flex-wrap gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] font-mono text-muted-foreground", children: [
              code,
              " · ",
              planCourse?.hours ?? "—",
              " ساعات معتمدة"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-lg mt-0.5", children: first.course_name }),
            items.map((b, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 inline-flex items-center gap-2 text-xs rounded-lg bg-warning/10 text-warning border border-warning/30 px-3 py-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "size-3.5" }),
              "درجتك في",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("b", { className: "font-semibold", children: b.weak_prereq_name }),
              " ",
              "كانت",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsxs("b", { className: "font-mono", children: [
                Math.round(b.weak_prereq_grade),
                "/100"
              ] })
            ] }, `${b.weak_prereq_code}-${i}`)),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-3 max-w-2xl leading-relaxed", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-primary-royal font-medium", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "size-3 inline mr-1" }),
                "التوصية:"
              ] }),
              " ",
              first.recommendation
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[11px] px-2.5 py-1 rounded-full bg-primary-royal/10 text-primary-royal font-medium", children: [
            items.reduce((s, b) => s + b.micro_modules.length, 0),
            " ",
            "موديول قصير"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-3", children: items.flatMap((b) => b.micro_modules).map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: m.url, target: "_blank", rel: "noopener noreferrer", className: "rounded-xl border border-border bg-background p-4 hover:border-primary-royal/50 hover:shadow-[var(--shadow-soft)] transition flex flex-col group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-[11px] font-medium text-destructive", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Youtube, { className: "size-4" }),
              " YouTube"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-muted text-muted-foreground font-mono", children: m.language === "ar" ? "AR" : "EN" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2.5 font-medium text-sm leading-snug group-hover:text-primary-royal transition", children: m.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground mt-1", children: m.channel }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 pt-3 border-t border-dashed border-border flex items-center justify-between text-[11px] text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "size-3" }),
            " ",
            m.duration
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "mt-3 inline-flex items-center justify-center gap-1.5 text-xs font-medium text-primary-royal", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "size-3.5" }),
            " فتح المصدر"
          ] })
        ] }, m.url + m.title)) })
      ] }, code);
    }) })
  ] });
}
function EmptyBridges() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl p-10 shadow-[var(--shadow-soft)] text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-14 mx-auto rounded-2xl bg-success/15 text-success grid place-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "size-7" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 font-semibold", children: "أحسنتِ! أساسك قوي." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground max-w-md mx-auto leading-relaxed", children: "لا حاجة لجسور مراجعة هذا الترم — جميع متطلباتك السابقة للمواد الصعبة كانت بدرجة 80 أو أعلى." })
  ] });
}
export {
  KnowledgeBridge as component
};
