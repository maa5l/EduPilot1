import { r as reactExports, T as jsxRuntimeExports } from "./server-DdGzs7CI.js";
import { u as useNavigate } from "./router-CojGKCx8.js";
import { l as logo } from "./bu-logo-CzxaDSQ8.js";
import { u as useEduPilot, l as loginDemo } from "./use-edupilot-C3h9g_Tc.js";
import { S as Sparkles } from "./sparkles-DdzEQW01.js";
import { c as createLucideIcon } from "./createLucideIcon-dwQAv870.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const __iconNode$1 = [
  ["rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2", key: "1w4ew1" }],
  ["path", { d: "M7 11V7a5 5 0 0 1 10 0v4", key: "fwvmzm" }]
];
const Lock = createLucideIcon("lock", __iconNode$1);
const __iconNode = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const ShieldCheck = createLucideIcon("shield-check", __iconNode);
function LoginPage() {
  const navigate = useNavigate();
  const {
    data,
    isLoading
  } = useEduPilot();
  const [studentId, setStudentId] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [submitting, setSubmitting] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (data?.student?.student_id) {
      setStudentId(data.student.student_id);
    }
  }, [data]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!studentId) return;
    setSubmitting(true);
    setError(null);
    try {
      await loginDemo(studentId, password || "demo");
      navigate({
        to: "/dashboard"
      });
    } catch (err) {
      setError(err.message || "تعذّر تسجيل الدخول");
      setSubmitting(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen grid lg:grid-cols-2 bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden lg:flex relative flex-col justify-between p-12 text-primary-foreground overflow-hidden", style: {
      background: "var(--gradient-hero)"
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-10 rounded-lg bg-white/15 backdrop-blur grid place-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "size-5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg font-semibold tracking-tight", children: "EduPilot" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-4xl font-bold leading-tight", children: [
          "ارتقِ برحلتك",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          "الأكاديمية مع EduPilot"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/85 text-lg max-w-md leading-relaxed", children: 'صُمم ليرشدك في كل خطوة — حلّل ثقل فصلك، تابع المتطلبات الأساسية، واعبر "جسور المعرفة" قبل بداية كل مادة.' }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm text-white/75", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "size-4" }),
          "تكامل آمن مع نظام جامعة الباحة"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "aria-hidden": true, className: "absolute -bottom-32 -left-32 size-96 rounded-full bg-white/5 blur-3xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "aria-hidden": true, className: "absolute -top-24 -right-24 size-80 rounded-full bg-white/10 blur-3xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "relative z-10 text-xs text-white/60", children: "© 2026 جامعة الباحة — EduPilot" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center px-6 py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: logo, alt: "شعار جامعة الباحة", className: "size-24 object-contain" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-2xl font-bold text-primary", children: "جامعة الباحة" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "بوابة الخدمات الإلكترونية للطلاب" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "mt-10 space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "text-sm font-medium text-foreground flex items-center gap-1.5", children: [
            "الرقم الجامعي",
            /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "size-3 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground font-normal mr-auto", children: "مستخرج تلقائياً من السجل" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { required: true, readOnly: true, value: studentId, placeholder: isLoading ? "جارٍ القراءة من السجل…" : "44XXXXXXX", className: "w-full h-11 rounded-lg border border-input bg-muted/40 px-4 text-sm outline-none cursor-not-allowed font-mono tracking-wider text-foreground" }),
          data?.student?.student_name && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-success flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "size-3" }),
            data.student.student_name
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium text-foreground", children: "كلمة المرور" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { required: true, type: "password", value: password, onChange: (e) => setPassword(e.target.value), placeholder: "أي كلمة مرور للتجربة", className: "w-full h-11 rounded-lg border border-input bg-background px-4 text-sm outline-none focus:border-primary-royal focus:ring-2 focus:ring-primary-royal/20 transition" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground", children: "في النموذج الأولي تُقبل أي كلمة مرور للوصول إلى لوحة الطالبة." })
        ] }),
        error && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive", children: error }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2 text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", className: "rounded border-input accent-[var(--primary-royal)]" }),
            "تذكرني"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", className: "text-primary-royal hover:underline", children: "نسيت كلمة المرور؟" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: submitting || !studentId, className: "w-full h-11 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary-royal transition shadow-[var(--shadow-soft)] disabled:opacity-70", children: submitting ? "جاري الدخول…" : "دخول" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-8 text-center text-xs text-muted-foreground", children: "بالدخول فإنك توافق على سياسة الاستخدام لخدمات الجامعة الإلكترونية" })
    ] }) })
  ] });
}
export {
  LoginPage as component
};
