import { ragChat } from "../../lib/rag-chat";
import { useDashboardData } from "../../hooks/useDashboardData";
import { useState, useRef, useEffect } from "react";
import Sidebar from "./Sidebar";
import Toast from "../ui/Toast";
import { useT } from "../../i18n";

type Screen = "login" | "dashboard" | "forecast" | "profile" | "ai" | "about";
type Effort = "fast" | "balanced" | "high";

interface Message {
  role: "user" | "ai";
  text: string;
  time: string;
  sources?: { title: string; source: string; url?: string }[];
}

const effortLabels: Record<Effort, string> = {
  fast: "سريع",
  balanced: "متوسط",
  high: "عالي",
};

const CARD_SHADOW = "0 1px 3px 0 hsl(220 39% 11% / .10), 0 1px 2px 0 hsl(220 39% 11% / .06)";

const suggestions = [
  { icon: "💡", text: "كيف أوفر في فاتورة الكهرباء؟" },
  { icon: "❄️", text: "ما هي أسباب ارتفاع استهلاك المكيف؟" },
  { icon: "🌡️", text: "نصائح للموجة الحارة القادمة" },
  { icon: "📊", text: "تحليل استهلاكي مقارنة بالشهر الماضي" },
];

const aiReplies: Record<string, string> = {
  "كيف أوفر في فاتورة الكهرباء؟":
    "يمكنك تقليل الفاتورة بعدة طرق:\n\n• قلّل مدة تشغيل المكيف والمساحة المبردة (KAPSARC)\n• استخدم مكيفاً عالي الكفاءة وفق SASO 2663\n• استخدم إضاءة LED وعزلاً حرارياً\n• افصل الأجهزة عن الكهرباء بدلاً من وضعها على الاستعداد\n• شغّل الأجهزة الثقيلة في ساعات الليل\n\nتقديرات توفير تختلف حسب المبنى — ليست ضماناً.",
  "ما هي أسباب ارتفاع استهلاك المكيف؟":
    "أهم الأسباب:\n\n• درجة حرارة منخفضة جداً (أقل من 22°C)\n• فلتر متسخ يقلل الكفاءة بنسبة تصل لـ 15%\n• عزل حراري ضعيف للجدران والنوافذ\n• أبواب ونوافذ مفتوحة أثناء التشغيل\n\nتنظيف الفلتر كل شهر هو أسهل خطوة وأكثرها تأثيراً.",
  "نصائح للموجة الحارة القادمة":
    "استعد للموجة الحارة بهذه الخطوات:\n\n• اضبط المكيف على 26°C بدلاً من 18°C\n• استخدم الستائر العاكسة خلال ساعات 10ص–4م\n• شغّل الأجهزة الثقيلة في المساء\n• تأكد من سلامة عزل الأسطح\n\nهذا سيقلص الزيادة المتوقعة في فاتورتك بشكل ملحوظ.",
  "تحليل استهلاكي مقارنة بالشهر الماضي":
    "بناءً على بياناتك الحالية:\n\n• استهلاكك هذا الشهر: 193.20 ر.س\n• الشهر الماضي: 230.50 ر.س\n• نسبة التحسن: ↓ 16.2%\n\nالمكيف لا يزال أكبر مصدر للاستهلاك (50%). إذا خفضت استخدامه ساعتين يومياً ستوفر حوالي 35 ر.س إضافية.",
};

function getTime() {
  return new Date().toLocaleTimeString("ar-SA", { hour: "2-digit", minute: "2-digit" });
}

function EffortDropdown({ effort, onChange }: { effort: Effort; onChange: (e: Effort) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const options: { id: Effort; icon: string; label: string; desc: string }[] = [
    { id: "high", icon: "🔬", label: "عالي", desc: "إجابات معمّقة ودقيقة" },
    { id: "balanced", icon: "⚖️", label: "متوسط", desc: "توازن بين السرعة والجودة" },
    { id: "fast", icon: "⚡", label: "سريع", desc: "ردود فورية" },
  ];

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          display: "flex", alignItems: "center", gap: 4,
          background: "hsl(var(--color-gray-100))", border: "none",
          borderRadius: 20, padding: "6px 12px",
          color: "hsl(var(--color-gray-700))", fontSize: 13, fontWeight: 600,
          cursor: "pointer", fontFamily: "inherit",
          transition: "background 0.15s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "hsl(var(--color-gray-200))")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "hsl(var(--color-gray-100))")}
      >
        {effortLabels[effort]}
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
          style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <div style={{
          position: "absolute", bottom: "calc(100% + 10px)", left: "50%",
          transform: "translateX(-50%)",
          background: "#FFFFFF", borderRadius: 14,
          border: "1px solid #E5E7EB",
          boxShadow: CARD_SHADOW,
          zIndex: 50, minWidth: 220, overflow: "hidden",
          animation: "dropUp 0.15s ease",
        }}>
          <p style={{ margin: 0, padding: "12px 16px 8px", fontSize: 10, fontWeight: 600, color: "hsl(var(--color-gray-500))", letterSpacing: "0.08em" }}>
            مستوى الإجابة
          </p>
          {options.map((o) => (
            <button
              key={o.id}
              onClick={() => { onChange(o.id); setOpen(false); }}
              style={{
                display: "flex", alignItems: "center", gap: 10, width: "100%",
                padding: "11px 16px", border: "none", cursor: "pointer", fontFamily: "inherit",
                background: effort === o.id ? "hsl(var(--color-sa-50))" : "transparent",
                textAlign: "start", transition: "background 0.1s",
              }}
              onMouseEnter={(e) => { if (effort !== o.id) e.currentTarget.style.background = "hsl(var(--color-gray-50))"; }}
              onMouseLeave={(e) => { if (effort !== o.id) e.currentTarget.style.background = "transparent"; }}
            >
              {effort === o.id && (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--color-sa-600))" strokeWidth="2.5" strokeLinecap="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
              <div style={{ flex: 1, textAlign: "start" }}>
                <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: effort === o.id ? "hsl(var(--color-sa-700))" : "hsl(var(--color-gray-900))" }}>
                  {o.icon} {o.label}
                </p>
                <p style={{ margin: "2px 0 0", fontSize: 11, color: "hsl(var(--color-gray-500))" }}>{o.desc}</p>
              </div>
            </button>
          ))}
        </div>
      )}
      <style>{`@keyframes dropUp { from { opacity:0; transform:translateX(-50%) translateY(6px) } to { opacity:1; transform:translateX(-50%) translateY(0) } }`}</style>
    </div>
  );
}

interface DesktopAIAssistantProps {
  onNavigate: (screen: Screen) => void;
}

export default function DesktopAIAssistant({ onNavigate }: DesktopAIAssistantProps) {
  const t = useT();
  const { spend, budget, forecast } = useDashboardData();
  const [messages, setMessages] = useState<Message[]>(() => [
    { role: "ai", text: t("ai.welcome"), time: getTime() },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [effort, setEffort] = useState<Effort>("high");
  const [listening, setListening] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const send = (text: string) => {
    if (!text.trim() || isTyping) return;
    setMessages((prev) => [...prev, { role: "user", text: text.trim(), time: getTime() }]);
    setInput("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
    setIsTyping(true);
    const delay = effort === "fast" ? 600 : effort === "balanced" ? 900 : 1400;
    setTimeout(async () => {
      const result = await ragChat(text.trim(), { spend, budget, forecast });
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: result.reply, time: getTime(), sources: result.sources },
      ]);
      setIsTyping(false);
    }, delay);
  };

  const hasMessages = messages.length > 1;

  return (
    <div style={{ display: "flex", height: "100%", width: "100%" }}>
      <Sidebar current="ai" onNavigate={onNavigate} />

      {/* Main chat area */}
      <div style={{
        flex: 1, display: "flex", flexDirection: "column",
        background: "#FCFCFD",
        overflow: "hidden",
      }}>
        {/* Header */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "flex-start",
          padding: "20px 32px 18px",
          background: "#FFFFFF",
          borderBottom: "1px solid #E5E7EB",
          flexShrink: 0,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ textAlign: "start" }}>
              <h1 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: "#0D121C" }}>Wafir AI</h1>
              <p style={{ margin: "2px 0 0", fontSize: 12, color: "#4D5761" }}>مدعوم بالذكاء الاصطناعي</p>
            </div>
            <div style={{
              width: 44, height: 44, borderRadius: "50%",
              background: "linear-gradient(135deg, hsl(var(--color-sa-700)), hsl(var(--color-sa-500)))",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                <path d="M13 2L4.5 13.5H11L10 22L19.5 10.5H13L13 2Z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Messages — centered column */}
        <div style={{ flex: 1, overflowY: "auto", padding: "32px 0 8px" }}>
          <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 24px" }}>
            {/* Empty state */}
            {!hasMessages && (
              <div style={{ textAlign: "center", marginBottom: 40 }}>
                <div style={{
                  width: 88, height: 88, borderRadius: "50%",
                  background: "linear-gradient(135deg, hsl(var(--color-sa-700)), hsl(var(--color-sa-500)))",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 20px",
                }}>
                  <svg width="44" height="44" viewBox="0 0 24 24" fill="white">
                    <path d="M13 2L4.5 13.5H11L10 22L19.5 10.5H13L13 2Z" />
                  </svg>
                </div>
                <p style={{ margin: "0 0 6px", fontSize: 26, fontWeight: 700, color: "#0D121C" }}>Wafir AI</p>
                <p style={{ margin: 0, fontSize: 15, color: "#4D5761" }}>كيف يمكنني مساعدتك اليوم؟</p>
              </div>
            )}

            {messages.map((m, i) => (
              <div key={i} style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-end",
                gap: 10,
                marginBottom: 20,
              }}>
                {m.role === "ai" && (
                  <div style={{
                    width: 32, height: 32, borderRadius: "50%", flexShrink: 0,
                    background: "linear-gradient(135deg, hsl(var(--color-sa-700)), hsl(var(--color-sa-500)))",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    marginBottom: 2,
                  }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="white">
                      <path d="M13 2L4.5 13.5H11L10 22L19.5 10.5H13L13 2Z" />
                    </svg>
                  </div>
                )}
                <div style={{ maxWidth: "75%", display: "flex", flexDirection: "column", alignItems: m.role === "user" ? "flex-start" : "flex-end" }}>
                  <div style={{
                    padding: "14px 18px",
                    borderRadius: m.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                    background: m.role === "user" ? "#1B8354" : "#FFFFFF",
                    border: `1px solid ${m.role === "user" ? "#1B8354" : "#E5E7EB"}`,
                    boxShadow: m.role === "user" ? "none" : CARD_SHADOW,
                    color: m.role === "user" ? "#FFFFFF" : "#111927",
                    fontSize: 14, lineHeight: 1.7, textAlign: "start", whiteSpace: "pre-line",
                  }}>
                    {m.text}
                    {m.sources && m.sources.length > 0 && (
                      <div style={{ marginTop: 8, fontSize: 11, opacity: 0.85 }}>
                        {m.sources.map((s, i) => (
                          <div key={i}>
                            📎 {s.title} — {s.source}{" "}
                            {s.url && (
                              <a href={s.url} target="_blank" rel="noreferrer" style={{ color: "inherit", textDecoration: "underline" }}>
                                رابط المصدر
                              </a>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <p style={{ margin: "4px 4px 0", fontSize: 11, color: "#4D5761" }}>{m.time}</p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div style={{ display: "flex", flexDirection: "row", alignItems: "flex-end", gap: 10, marginBottom: 20 }}>
                <div style={{
                  width: 32, height: 32, borderRadius: "50%", flexShrink: 0,
                  background: "linear-gradient(135deg, hsl(var(--color-sa-700)), hsl(var(--color-sa-500)))",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="white">
                    <path d="M13 2L4.5 13.5H11L10 22L19.5 10.5H13L13 2Z" />
                  </svg>
                </div>
                <div style={{
                  padding: "16px 20px", borderRadius: "18px 18px 18px 4px",
                  background: "#FFFFFF", border: "1px solid #E5E7EB",
                  boxShadow: CARD_SHADOW,
                  display: "flex", gap: 6, alignItems: "center",
                }}>
                  {[0, 1, 2].map((d) => (
                    <div key={d} style={{
                      width: 8, height: 8, borderRadius: "50%",
                      background: "hsl(var(--color-sa-400))",
                      animation: `bounce 1s ease ${d * 0.2}s infinite`,
                    }} />
                  ))}
                </div>
              </div>
            )}

            {/* Suggestion grid */}
            {!hasMessages && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 8 }}>
                {suggestions.map((s) => (
                  <button
                    key={s.text}
                    onClick={() => send(s.text)}
                    style={{
                      padding: "18px 16px", borderRadius: 16, textAlign: "start",
                      border: "1px solid #E5E7EB",
                      background: "#FFFFFF",
                      boxShadow: CARD_SHADOW,
                      cursor: "pointer", fontFamily: "inherit",
                      transition: "background 0.15s, border-color 0.15s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "hsl(var(--color-sa-50))";
                      e.currentTarget.style.borderColor = "hsl(var(--color-sa-200))";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "#FFFFFF";
                      e.currentTarget.style.borderColor = "#E5E7EB";
                    }}
                  >
                    <p style={{ margin: "0 0 8px", fontSize: 22 }}>{s.icon}</p>
                    <p style={{ margin: 0, fontSize: 13, color: "#4D5761", lineHeight: 1.4 }}>{s.text}</p>
                  </button>
                ))}
              </div>
            )}
            <div ref={bottomRef} />
          </div>
        </div>

        {/* Input bar */}
        <div style={{ padding: "16px 0 28px", flexShrink: 0 }}>
          <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 24px" }}>
            <div style={{
              background: "#FFFFFF",
              borderRadius: 28,
              border: "1px solid #E5E7EB",
              padding: "8px 10px 8px 14px",
              display: "flex", alignItems: "flex-end", gap: 8,
              boxShadow: CARD_SHADOW,
            }}>
              {/* + Reference */}
              <button
                style={{
                  width: 36, height: 36, borderRadius: "50%", flexShrink: 0,
                  background: "hsl(var(--color-gray-100))", border: "none", cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#4D5761", transition: "background 0.15s",
                  alignSelf: "flex-end", marginBottom: 2,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "hsl(var(--color-gray-200))")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "hsl(var(--color-gray-100))")}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </button>

              {/* Textarea */}
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  e.target.style.height = "auto";
                  e.target.style.height = Math.min(e.target.scrollHeight, 140) + "px";
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(input); }
                }}
                placeholder={t("ai.placeholder")}
                dir="rtl"
                rows={1}
                style={{
                  flex: 1, background: "transparent", border: "none", outline: "none",
                  resize: "none", padding: "9px 4px",
                  fontSize: 15, color: "#111927", fontFamily: "inherit",
                  lineHeight: 1.5, maxHeight: 140, overflowY: "auto",
                }}
              />

              {/* Controls */}
              <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0, alignSelf: "flex-end", marginBottom: 2 }}>
                <EffortDropdown effort={effort} onChange={setEffort} />

                {/* Mic */}
                <button
                  onClick={() => setListening((v) => !v)}
                  style={{
                    width: 36, height: 36, borderRadius: "50%", border: "none", cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    background: listening ? "hsl(var(--color-danger) / 0.1)" : "hsl(var(--color-gray-100))",
                    color: listening ? "hsl(var(--color-danger))" : "#4D5761",
                    transition: "all 0.2s",
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                    <line x1="12" y1="19" x2="12" y2="23" />
                    <line x1="8" y1="23" x2="16" y2="23" />
                  </svg>
                </button>

                {/* Send / Voice */}
                {input.trim() ? (
                  <button
                    onClick={() => send(input)}
                    style={{
                      width: 38, height: 38, borderRadius: "50%", border: "none", cursor: "pointer",
                      background: "#1B8354",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      transition: "background 0.15s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#166A45")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "#1B8354")}
                  >
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="22" y1="2" x2="11" y2="13" />
                      <polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                  </button>
                ) : (
                  <button
                    onClick={() => setToast("المحادثة الصوتية قريباً")}
                    style={{
                      width: 38, height: 38, borderRadius: "50%", border: "none", cursor: "pointer",
                      background: "#1B8354",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      transition: "background 0.15s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#166A45")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "#1B8354")}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                      <rect x="2" y="9" width="2" height="6" rx="1" />
                      <rect x="6" y="6" width="2" height="12" rx="1" />
                      <rect x="10" y="4" width="2" height="16" rx="1" />
                      <rect x="14" y="6" width="2" height="12" rx="1" />
                      <rect x="18" y="9" width="2" height="6" rx="1" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
      <style>{`
        @keyframes bounce { 0%,80%,100% { transform:translateY(0) } 40% { transform:translateY(-6px) } }
        textarea::placeholder { color: #9DA4AE; }
        textarea::-webkit-scrollbar { width: 0; }
      `}</style>
    </div>
  );
}
