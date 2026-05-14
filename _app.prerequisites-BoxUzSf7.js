import { T as jsxRuntimeExports } from "./server-DdGzs7CI.js";
import { u as useEduPilot } from "./use-edupilot-C3h9g_Tc.js";
import { R as Radar } from "./radar-B_gEpKtr.js";
import { S as Sparkles } from "./sparkles-DdzEQW01.js";
import { C as Calendar, T as TriangleAlert } from "./triangle-alert-DNw_LG9n.js";
import { c as createLucideIcon } from "./createLucideIcon-dwQAv870.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./router-CojGKCx8.js";
const __iconNode = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ],
  ["path", { d: "M12 8v4", key: "1got3b" }],
  ["path", { d: "M12 16h.01", key: "1drbdi" }]
];
const ShieldAlert = createLucideIcon("shield-alert", __iconNode);
function Prerequisites() {
  const {
    data,
    isLoading
  } = useEduPilot();
  if (isLoading || !data) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center min-h-[60vh] text-muted-foreground", children: "جاري تحميل رادار المتطلبات…" });
  }
  const {
    alerts,
    plan,
    student
  } = data;
  const passedCodes = new Set(student.passed_courses.map((c) => c.code));
  const futureByLevel = /* @__PURE__ */ new Map();
  for (const course of plan) {
    if (passedCodes.has(course.code)) continue;
    const arr = futureByLevel.get(course.level) ?? [];
    arr.push(course);
    futureByLevel.set(course.level, arr);
  }
  const levels = Array.from(futureByLevel.entries()).sort((a, b) => a[0] - b[0]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 max-w-7xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-2xl font-bold flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Radar, { className: "size-6 text-primary-royal" }),
        " رادار المتطلبات الأساسية"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "خط زمني للمواد التي يجب التخطيط لها مبكراً — لا تفوّتي نافذة التسجيل في المواد الحرجة والسنوية." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "bg-card border border-border rounded-2xl p-6 shadow-[var(--shadow-soft)]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-semibold flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "size-5 text-primary-royal" }),
          "تنبيهات استباقية من المحرّك"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[11px] text-muted-foreground", children: [
          alerts.length,
          " تنبيه نشط"
        ] })
      ] }),
      alerts.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground text-center py-8 border border-dashed border-border rounded-xl", children: "خطتك على المسار الصحيح — لا توجد تنبيهات حالياً." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3 md:grid-cols-2", children: alerts.map((a, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(AlertCard, { alert: a }, i)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "bg-card border border-border rounded-2xl p-6 shadow-[var(--shadow-soft)]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold mb-4", children: "شجرة المتطلبات حسب المستوى" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute right-4 top-0 bottom-0 w-px bg-border" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-8", children: levels.map(([level, courses]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative pr-12", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute right-0 top-1 size-9 rounded-full grid place-items-center border bg-primary-royal/15 text-primary-royal border-primary-royal/40", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "size-4" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold", children: [
            "المستوى ",
            level
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 grid gap-3 md:grid-cols-2", children: courses.map((c) => {
            const unlocks = plan.filter((p) => p.prerequisites.includes(c.code));
            const critical = unlocks.length >= 2 || c.yearly_only;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `rounded-xl border p-4 ${critical ? "border-destructive/40 bg-destructive/5" : "border-border bg-background"}`, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] font-mono text-muted-foreground", children: [
                    c.code,
                    " · ",
                    c.hours,
                    " ساعات"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-sm mt-0.5", children: c.name })
                ] }),
                critical && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] flex items-center gap-1 px-2 py-1 rounded-full bg-destructive text-destructive-foreground font-medium shrink-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "size-3" }),
                  " حرج"
                ] })
              ] }),
              c.prerequisites.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-[11px] text-muted-foreground", children: [
                "المتطلب السابق:",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono", children: c.prerequisites.join("، ") })
              ] }),
              unlocks.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 pt-3 border-t border-dashed border-border", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground", children: "يفتح الطريق إلى:" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1.5 flex flex-wrap gap-1.5", children: unlocks.map((u) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[11px] px-2 py-1 rounded-md bg-muted text-foreground/80", children: [
                  u.name,
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-muted-foreground mr-1", children: [
                    "(",
                    u.code,
                    ")"
                  ] })
                ] }, u.code)) })
              ] }),
              c.yearly_only && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-[11px] text-warning flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "size-3" }),
                " تُطرح سنوياً فقط"
              ] })
            ] }, c.code);
          }) })
        ] }, level)) })
      ] })
    ] })
  ] });
}
function AlertCard({
  alert
}) {
  const styles = alert.severity === "critical" ? "border-destructive/40 bg-destructive/5" : alert.severity === "warning" ? "border-warning/40 bg-warning/10" : "border-success/30 bg-success/5";
  const Icon = alert.severity === "critical" ? ShieldAlert : TriangleAlert;
  const iconColor = alert.severity === "critical" ? "text-destructive" : alert.severity === "warning" ? "text-warning" : "text-success";
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `rounded-xl border p-4 ${styles}`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `size-5 mt-0.5 shrink-0 ${iconColor}` }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold", children: alert.title }),
        alert.yearly && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] px-1.5 py-0.5 rounded bg-warning/20 text-warning font-medium", children: "سنوية" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1 leading-relaxed", children: alert.body }),
      alert.unlocks?.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2.5 flex flex-wrap gap-1.5", children: alert.unlocks.map((u) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] px-2 py-0.5 rounded-md bg-background border border-border", children: [
        u.name,
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-muted-foreground", children: [
          "(",
          u.code,
          ")"
        ] })
      ] }, u.code)) })
    ] })
  ] }) });
}
export {
  Prerequisites as component
};
