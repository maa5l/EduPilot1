import { M as useRouter, $ as getDefaultExportFromCjs, r as reactExports, T as jsxRuntimeExports, _ as Outlet } from "./server-DdGzs7CI.js";
import { A as AbstractChat, D as DefaultChatTransport, L as Link } from "./router-CojGKCx8.js";
import { l as logo } from "./bu-logo-CzxaDSQ8.js";
import { S as Sparkles } from "./sparkles-DdzEQW01.js";
import { c as createLucideIcon } from "./createLucideIcon-dwQAv870.js";
import { u as useEduPilot } from "./use-edupilot-C3h9g_Tc.js";
import { R as Radar } from "./radar-B_gEpKtr.js";
import { B as BookOpen } from "./book-open-Y6djn9lE.js";
import { H as Handshake } from "./handshake-CYvTGdpX.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
function useRouterState(opts) {
  const contextRouter = useRouter({ warn: opts?.router === void 0 });
  const router = opts?.router || contextRouter;
  {
    const state = router.stores.__store.get();
    return opts?.select ? opts.select(state) : state;
  }
}
const __iconNode$5 = [
  ["path", { d: "M10.268 21a2 2 0 0 0 3.464 0", key: "vwvbt9" }],
  [
    "path",
    {
      d: "M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326",
      key: "11g9vi"
    }
  ]
];
const Bell = createLucideIcon("bell", __iconNode$5);
const __iconNode$4 = [
  ["rect", { width: "7", height: "9", x: "3", y: "3", rx: "1", key: "10lvy0" }],
  ["rect", { width: "7", height: "5", x: "14", y: "3", rx: "1", key: "16une8" }],
  ["rect", { width: "7", height: "9", x: "14", y: "12", rx: "1", key: "1hutg5" }],
  ["rect", { width: "7", height: "5", x: "3", y: "16", rx: "1", key: "ldoo1y" }]
];
const LayoutDashboard = createLucideIcon("layout-dashboard", __iconNode$4);
const __iconNode$3 = [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]];
const LoaderCircle = createLucideIcon("loader-circle", __iconNode$3);
const __iconNode$2 = [
  ["path", { d: "m16 17 5-5-5-5", key: "1bji2h" }],
  ["path", { d: "M21 12H9", key: "dn1m92" }],
  ["path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4", key: "1uf3rs" }]
];
const LogOut = createLucideIcon("log-out", __iconNode$2);
const __iconNode$1 = [
  [
    "path",
    {
      d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
      key: "1ffxy3"
    }
  ],
  ["path", { d: "m21.854 2.147-10.94 10.939", key: "12cjpa" }]
];
const Send = createLucideIcon("send", __iconNode$1);
const __iconNode = [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
];
const X = createLucideIcon("x", __iconNode);
var throttleit;
var hasRequiredThrottleit;
function requireThrottleit() {
  if (hasRequiredThrottleit) return throttleit;
  hasRequiredThrottleit = 1;
  function throttle2(function_, wait) {
    if (typeof function_ !== "function") {
      throw new TypeError(`Expected the first argument to be a \`function\`, got \`${typeof function_}\`.`);
    }
    let timeoutId;
    let lastCallTime = 0;
    return function throttled(...arguments_) {
      clearTimeout(timeoutId);
      const now = Date.now();
      const timeSinceLastCall = now - lastCallTime;
      const delayForNextCall = wait - timeSinceLastCall;
      if (delayForNextCall <= 0) {
        lastCallTime = now;
        function_.apply(this, arguments_);
      } else {
        timeoutId = setTimeout(() => {
          lastCallTime = Date.now();
          function_.apply(this, arguments_);
        }, delayForNextCall);
      }
    };
  }
  throttleit = throttle2;
  return throttleit;
}
var throttleitExports = /* @__PURE__ */ requireThrottleit();
const throttleFunction = /* @__PURE__ */ getDefaultExportFromCjs(throttleitExports);
var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  member.set(obj, value);
  return value;
};
function throttle(fn, waitMs) {
  return waitMs != null ? throttleFunction(fn, waitMs) : fn;
}
var _messages, _status, _error, _messagesCallbacks, _statusCallbacks, _errorCallbacks, _callMessagesCallbacks, _callStatusCallbacks, _callErrorCallbacks;
var ReactChatState = class {
  constructor(initialMessages2 = []) {
    __privateAdd(this, _messages, void 0);
    __privateAdd(this, _status, "ready");
    __privateAdd(this, _error, void 0);
    __privateAdd(this, _messagesCallbacks, /* @__PURE__ */ new Set());
    __privateAdd(this, _statusCallbacks, /* @__PURE__ */ new Set());
    __privateAdd(this, _errorCallbacks, /* @__PURE__ */ new Set());
    this.pushMessage = (message) => {
      __privateSet(this, _messages, __privateGet(this, _messages).concat(message));
      __privateGet(this, _callMessagesCallbacks).call(this);
    };
    this.popMessage = () => {
      __privateSet(this, _messages, __privateGet(this, _messages).slice(0, -1));
      __privateGet(this, _callMessagesCallbacks).call(this);
    };
    this.replaceMessage = (index, message) => {
      __privateSet(this, _messages, [
        ...__privateGet(this, _messages).slice(0, index),
        // We deep clone the message here to ensure the new React Compiler (currently in RC) detects deeply nested parts/metadata changes:
        this.snapshot(message),
        ...__privateGet(this, _messages).slice(index + 1)
      ]);
      __privateGet(this, _callMessagesCallbacks).call(this);
    };
    this.snapshot = (value) => structuredClone(value);
    this["~registerMessagesCallback"] = (onChange, throttleWaitMs) => {
      const callback = throttleWaitMs ? throttle(onChange, throttleWaitMs) : onChange;
      __privateGet(this, _messagesCallbacks).add(callback);
      return () => {
        __privateGet(this, _messagesCallbacks).delete(callback);
      };
    };
    this["~registerStatusCallback"] = (onChange) => {
      __privateGet(this, _statusCallbacks).add(onChange);
      return () => {
        __privateGet(this, _statusCallbacks).delete(onChange);
      };
    };
    this["~registerErrorCallback"] = (onChange) => {
      __privateGet(this, _errorCallbacks).add(onChange);
      return () => {
        __privateGet(this, _errorCallbacks).delete(onChange);
      };
    };
    __privateAdd(this, _callMessagesCallbacks, () => {
      __privateGet(this, _messagesCallbacks).forEach((callback) => callback());
    });
    __privateAdd(this, _callStatusCallbacks, () => {
      __privateGet(this, _statusCallbacks).forEach((callback) => callback());
    });
    __privateAdd(this, _callErrorCallbacks, () => {
      __privateGet(this, _errorCallbacks).forEach((callback) => callback());
    });
    __privateSet(this, _messages, initialMessages2);
  }
  get status() {
    return __privateGet(this, _status);
  }
  set status(newStatus) {
    __privateSet(this, _status, newStatus);
    __privateGet(this, _callStatusCallbacks).call(this);
  }
  get error() {
    return __privateGet(this, _error);
  }
  set error(newError) {
    __privateSet(this, _error, newError);
    __privateGet(this, _callErrorCallbacks).call(this);
  }
  get messages() {
    return __privateGet(this, _messages);
  }
  set messages(newMessages) {
    __privateSet(this, _messages, [...newMessages]);
    __privateGet(this, _callMessagesCallbacks).call(this);
  }
};
_messages = /* @__PURE__ */ new WeakMap();
_status = /* @__PURE__ */ new WeakMap();
_error = /* @__PURE__ */ new WeakMap();
_messagesCallbacks = /* @__PURE__ */ new WeakMap();
_statusCallbacks = /* @__PURE__ */ new WeakMap();
_errorCallbacks = /* @__PURE__ */ new WeakMap();
_callMessagesCallbacks = /* @__PURE__ */ new WeakMap();
_callStatusCallbacks = /* @__PURE__ */ new WeakMap();
_callErrorCallbacks = /* @__PURE__ */ new WeakMap();
var _state;
var Chat = class extends AbstractChat {
  constructor({ messages, ...init }) {
    const state = new ReactChatState(messages);
    super({ ...init, state });
    __privateAdd(this, _state, void 0);
    this["~registerMessagesCallback"] = (onChange, throttleWaitMs) => __privateGet(this, _state)["~registerMessagesCallback"](onChange, throttleWaitMs);
    this["~registerStatusCallback"] = (onChange) => __privateGet(this, _state)["~registerStatusCallback"](onChange);
    this["~registerErrorCallback"] = (onChange) => __privateGet(this, _state)["~registerErrorCallback"](onChange);
    __privateSet(this, _state, state);
  }
};
_state = /* @__PURE__ */ new WeakMap();
function useChat({
  experimental_throttle: throttleWaitMs,
  resume = false,
  ...options
} = {}) {
  const callbacksRef = reactExports.useRef(
    !("chat" in options) ? {
      onToolCall: options.onToolCall,
      onData: options.onData,
      onFinish: options.onFinish,
      onError: options.onError,
      sendAutomaticallyWhen: options.sendAutomaticallyWhen
    } : {}
  );
  if (!("chat" in options)) {
    callbacksRef.current = {
      onToolCall: options.onToolCall,
      onData: options.onData,
      onFinish: options.onFinish,
      onError: options.onError,
      sendAutomaticallyWhen: options.sendAutomaticallyWhen
    };
  }
  const optionsWithCallbacks = {
    ...options,
    onToolCall: (arg) => {
      var _a, _b;
      return (_b = (_a = callbacksRef.current).onToolCall) == null ? void 0 : _b.call(_a, arg);
    },
    onData: (arg) => {
      var _a, _b;
      return (_b = (_a = callbacksRef.current).onData) == null ? void 0 : _b.call(_a, arg);
    },
    onFinish: (arg) => {
      var _a, _b;
      return (_b = (_a = callbacksRef.current).onFinish) == null ? void 0 : _b.call(_a, arg);
    },
    onError: (arg) => {
      var _a, _b;
      return (_b = (_a = callbacksRef.current).onError) == null ? void 0 : _b.call(_a, arg);
    },
    sendAutomaticallyWhen: (arg) => {
      var _a, _b, _c;
      return (_c = (_b = (_a = callbacksRef.current).sendAutomaticallyWhen) == null ? void 0 : _b.call(_a, arg)) != null ? _c : false;
    }
  };
  const chatRef = reactExports.useRef(
    "chat" in options ? options.chat : new Chat(optionsWithCallbacks)
  );
  const shouldRecreateChat = "chat" in options && options.chat !== chatRef.current || "id" in options && chatRef.current.id !== options.id;
  if (shouldRecreateChat) {
    chatRef.current = "chat" in options ? options.chat : new Chat(optionsWithCallbacks);
  }
  const subscribeToMessages = reactExports.useCallback(
    (update) => chatRef.current["~registerMessagesCallback"](update, throttleWaitMs),
    // `chatRef.current.id` is required to trigger re-subscription when the chat ID changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [throttleWaitMs, chatRef.current.id]
  );
  const messages = reactExports.useSyncExternalStore(
    subscribeToMessages,
    () => chatRef.current.messages,
    () => chatRef.current.messages
  );
  const status = reactExports.useSyncExternalStore(
    chatRef.current["~registerStatusCallback"],
    () => chatRef.current.status,
    () => chatRef.current.status
  );
  const error = reactExports.useSyncExternalStore(
    chatRef.current["~registerErrorCallback"],
    () => chatRef.current.error,
    () => chatRef.current.error
  );
  const setMessages = reactExports.useCallback(
    (messagesParam) => {
      if (typeof messagesParam === "function") {
        messagesParam = messagesParam(chatRef.current.messages);
      }
      chatRef.current.messages = messagesParam;
    },
    [chatRef]
  );
  reactExports.useEffect(() => {
    if (resume) {
      chatRef.current.resumeStream();
    }
  }, [resume, chatRef]);
  return {
    id: chatRef.current.id,
    messages,
    setMessages,
    sendMessage: chatRef.current.sendMessage,
    regenerate: chatRef.current.regenerate,
    clearError: chatRef.current.clearError,
    stop: chatRef.current.stop,
    error,
    resumeStream: chatRef.current.resumeStream,
    status,
    /**
     * @deprecated Use `addToolOutput` instead.
     */
    addToolResult: chatRef.current.addToolOutput,
    addToolOutput: chatRef.current.addToolOutput,
    addToolApprovalResponse: chatRef.current.addToolApprovalResponse
  };
}
const transport = new DefaultChatTransport({ api: "/api/chat" });
const initialMessages = [
  {
    id: "welcome",
    role: "assistant",
    parts: [
      {
        type: "text",
        text: "أهلاً 👋 أنا **مستشارك الذكي** في EduPilot. اسألني عن ثقل موادك، المتطلبات الأساسية، أفضل المصادر التعليمية، أو الشهادات الاحترافية المرتبطة بمسارك."
      }
    ]
  }
];
function AiAdvisorButton() {
  const [open, setOpen] = reactExports.useState(false);
  const [input, setInput] = reactExports.useState("");
  const scrollRef = reactExports.useRef(null);
  const { messages, sendMessage, status } = useChat({
    id: "advisor",
    messages: initialMessages,
    transport
  });
  const isLoading = status === "submitted" || status === "streaming";
  reactExports.useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, status]);
  const submit = async () => {
    const t = input.trim();
    if (!t || isLoading) return;
    setInput("");
    await sendMessage({ text: t });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        "aria-label": "مستشارك الذكي",
        onClick: () => setOpen((v) => !v),
        className: "fixed bottom-6 left-6 z-50 size-14 rounded-full grid place-items-center text-primary-foreground shadow-[0_10px_30px_-8px_rgba(15,42,90,0.55)] hover:scale-105 active:scale-95 transition",
        style: { background: "var(--gradient-hero)" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "size-6" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -top-1 -right-1 size-3 rounded-full bg-success ring-2 ring-background" })
        ]
      }
    ),
    open && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed bottom-24 left-6 z-50 w-[min(380px,calc(100vw-2rem))] h-[min(560px,calc(100vh-8rem))] bg-card border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "px-4 py-3 flex items-center justify-between text-primary-foreground",
          style: { background: "var(--gradient-hero)" },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-9 rounded-full bg-white/15 backdrop-blur grid place-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "size-4" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "leading-tight", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold", children: "مستشارك الذكي" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-white/70", children: "يردّ خلال ثوانٍ" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setOpen(false), className: "text-white/80 hover:text-white", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "size-4" }) })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref: scrollRef, className: "flex-1 overflow-y-auto p-4 space-y-3 bg-muted/30", children: [
        messages.map((m) => {
          const text = m.parts.map((p) => p.type === "text" ? p.text : "").join("");
          const mine = m.role === "user";
          return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `flex ${mine ? "justify-start" : "justify-end"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: `max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${mine ? "bg-primary-royal text-primary-foreground rounded-bl-sm" : "bg-card border border-border rounded-br-sm"}`,
              children: text
            }
          ) }, m.id);
        }),
        isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl rounded-br-sm px-3.5 py-2.5 text-sm text-muted-foreground flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "size-3.5 animate-spin" }),
          " يكتب…"
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "form",
        {
          onSubmit: (e) => {
            e.preventDefault();
            submit();
          },
          className: "border-t border-border p-3 flex items-center gap-2 bg-background",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                value: input,
                onChange: (e) => setInput(e.target.value),
                placeholder: "اسأل عن مادة، متطلب، أو مصدر…",
                className: "flex-1 h-10 rounded-lg border border-input bg-background px-3 text-sm outline-none focus:border-primary-royal focus:ring-2 focus:ring-primary-royal/20 transition",
                disabled: isLoading
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "submit",
                disabled: isLoading || !input.trim(),
                className: "size-10 rounded-lg bg-primary text-primary-foreground grid place-items-center hover:bg-primary-royal transition disabled:opacity-50",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "size-4" })
              }
            )
          ]
        }
      )
    ] })
  ] });
}
const nav = [
  { to: "/dashboard", label: "اللوحة", icon: LayoutDashboard },
  { to: "/prerequisites", label: "رادار المتطلبات", icon: Radar },
  { to: "/knowledge-bridge", label: "جسور المعرفة", icon: BookOpen },
  { to: "/partnerships", label: "شراكات تعليمية", icon: Handshake }
];
function AppShell() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const { data } = useEduPilot();
  const studentName = data?.student?.student_name ?? "الطالبة";
  const studentId = data?.student?.student_id ?? "—";
  const initials = studentName.split(" ").filter(Boolean).slice(0, 2).map((w) => w[0]).join("");
  const alertCount = data?.alerts?.length ?? 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen flex w-full bg-muted/40", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "w-64 shrink-0 bg-sidebar text-sidebar-foreground flex flex-col", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-5 flex items-center gap-3 border-b border-sidebar-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-10 rounded-lg bg-white grid place-items-center p-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: logo, alt: "BU", className: "size-8 object-contain" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "leading-tight", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold", children: "EduPilot" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-sidebar-foreground/60", children: "جامعة الباحة" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "flex-1 p-3 space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "px-3 pt-3 pb-2 text-[11px] uppercase tracking-wider text-sidebar-foreground/50", children: "القائمة الرئيسية" }),
        nav.map((item) => {
          const active = path === item.to;
          const Icon = item.icon;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: item.to,
              className: `flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition ${active ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-[var(--shadow-soft)]" : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground"}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "size-4" }),
                item.label
              ]
            },
            item.to
          );
        })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 border-t border-sidebar-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 px-2 py-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-9 rounded-full bg-sidebar-primary grid place-items-center text-xs font-semibold", children: initials || "ط" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 leading-tight min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium truncate", children: studentName }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-sidebar-foreground/60 font-mono", children: studentId })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/",
            className: "text-sidebar-foreground/60 hover:text-sidebar-foreground",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "size-4" })
          }
        )
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "h-16 bg-background border-b border-border flex items-center justify-between gap-4 px-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "size-2 rounded-full bg-success" }),
          "متصل بـ Blackboard Ultra"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: "/prerequisites",
            className: "relative size-10 rounded-lg hover:bg-muted grid place-items-center text-muted-foreground",
            "aria-label": "التنبيهات",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "size-5" }),
              alertCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-destructive text-destructive-foreground text-[10px] font-bold grid place-items-center", children: alertCount })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1 p-6 lg:p-8 overflow-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AiAdvisorButton, {})
  ] });
}
const SplitComponent = AppShell;
export {
  SplitComponent as component
};
