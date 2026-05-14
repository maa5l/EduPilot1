import { T as jsxRuntimeExports } from "./server-DdGzs7CI.js";
import { H as Handshake } from "./handshake-CYvTGdpX.js";
import { C as CircleCheck } from "./circle-check-CXvPibrl.js";
import { c as createLucideIcon } from "./createLucideIcon-dwQAv870.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const __iconNode$1 = [
  [
    "path",
    {
      d: "m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526",
      key: "1yiouv"
    }
  ],
  ["circle", { cx: "12", cy: "8", r: "6", key: "1vp47v" }]
];
const Award = createLucideIcon("award", __iconNode$1);
const __iconNode = [
  ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
  ["path", { d: "M10 14 21 3", key: "gplh6r" }],
  ["path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6", key: "a6xqqp" }]
];
const ExternalLink = createLucideIcon("external-link", __iconNode);
const partnerships = [{
  code: "CS370",
  name: "شبكات الحاسب الآلي",
  department: "علوم الحاسب",
  status: "active",
  partners: [{
    name: "Cisco Networking Academy",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Cisco_logo_blue_2016.svg/2560px-Cisco_logo_blue_2016.svg.png",
    cert: "CCNA — Cisco Certified Network Associate",
    benefit: "خصم 70% على رسوم الاختبار + وصول مجاني لمنصة NetAcad"
  }]
}, {
  code: "CS340",
  name: "نظم قواعد البيانات",
  department: "علوم الحاسب",
  status: "active",
  partners: [{
    name: "Oracle Academy",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Oracle_logo.svg/2560px-Oracle_logo.svg.png",
    cert: "Oracle Database SQL Certified Associate",
    benefit: "محتوى المنهج معتمد كمسار رسمي للشهادة"
  }]
}, {
  code: "CS450",
  name: "الحوسبة السحابية",
  department: "علوم الحاسب",
  status: "active",
  partners: [{
    name: "Amazon Web Services Academy",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Amazon_Web_Services_Logo.svg/2560px-Amazon_Web_Services_Logo.svg.png",
    cert: "AWS Certified Cloud Practitioner",
    benefit: "قسيمة اختبار مجانية بعد إتمام المادة بنجاح"
  }, {
    name: "Microsoft Learn for Educators",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Microsoft_logo_%282012%29.svg/2560px-Microsoft_logo_%282012%29.svg.png",
    cert: "Microsoft Azure Fundamentals (AZ-900)",
    benefit: "وصول مجاني لمختبرات Azure التعليمية"
  }]
}, {
  code: "CS451",
  name: "تعلّم الآلة",
  department: "علوم الحاسب",
  status: "active",
  partners: [{
    name: "Google for Education",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/2560px-Google_2015_logo.svg.png",
    cert: "Google AI Essentials",
    benefit: "شهادة معتمدة تُضاف لملف LinkedIn"
  }, {
    name: "IBM SkillsBuild",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IBM_logo.svg/2560px-IBM_logo.svg.png",
    cert: "IBM Machine Learning Professional",
    benefit: "مسار تعليمي متكامل + شارة رقمية معتمدة"
  }]
}, {
  code: "CS465",
  name: "الأمن السيبراني",
  department: "علوم الحاسب",
  status: "active",
  partners: [{
    name: "EC-Council Academia",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/EC-Council_logo.png/640px-EC-Council_logo.png",
    cert: "Certified Ethical Hacker (CEH)",
    benefit: "خصم 60% على رسوم الاختبار للطلاب"
  }]
}, {
  code: "CS440",
  name: "هندسة البرمجيات",
  department: "علوم الحاسب",
  status: "recommended",
  partners: [{
    name: "Atlassian University",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Atlassian-logo.svg/2560px-Atlassian-logo.svg.png",
    cert: "Atlassian Agile Project Management",
    benefit: "شراكة مقترحة — قيد التفعيل من إدارة الكلية"
  }]
}];
function PartnershipsPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 max-w-7xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-2xl font-bold flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Handshake, { className: "size-6 text-primary-royal" }),
        " شراكات تعليمية"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1 max-w-3xl leading-relaxed", children: "ربط مباشر بين موادك الأكاديمية وأبرز الشهادات الاحترافية العالمية المعتمدة من شركاء جامعة الباحة — خطوة دراسية واحدة تساوي خطوتين في سوق العمل." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4", children: partnerships.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "bg-card border border-border rounded-2xl p-6 shadow-[var(--shadow-soft)]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between flex-wrap gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] font-mono text-muted-foreground", children: [
            c.code,
            " · ",
            c.department
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-lg mt-0.5", children: c.name })
        ] }),
        c.status === "active" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[11px] flex items-center gap-1 px-2.5 py-1 rounded-full bg-success/10 text-success font-medium", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "size-3" }),
          " شراكة فعّالة"
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] px-2.5 py-1 rounded-full bg-warning/15 text-warning font-medium", children: "شراكة مقترحة" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 grid gap-3 md:grid-cols-2", children: c.partners.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-background p-4 hover:border-primary-royal/40 transition flex flex-col", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 flex items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: p.logo, alt: p.name, className: "max-h-9 max-w-[140px] object-contain", loading: "lazy" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-3 text-sm font-medium flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "size-4 text-primary-royal shrink-0" }),
          " ",
          p.cert
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-2 leading-relaxed flex-1", children: p.benefit }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-3 text-[11px] text-muted-foreground", children: [
          "شريك: ",
          p.name
        ] })
      ] }, p.name)) })
    ] }, c.code)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-primary-royal/5 border border-primary-royal/20 rounded-2xl p-5 flex items-start gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "size-5 text-primary-royal shrink-0 mt-0.5" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: "كيف أستفيد من الشراكة؟" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1 leading-relaxed", children: "عند تسجيلك في مادة لها شراكة فعّالة، يصلك تلقائياً كود التفعيل عبر بريدك الجامعي خلال أول أسبوعين من بداية الفصل." })
      ] })
    ] })
  ] });
}
export {
  PartnershipsPage as component
};
