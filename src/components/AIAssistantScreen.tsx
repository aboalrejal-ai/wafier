import { useState, useRef, useEffect } from "react";
import Toast from "./ui/Toast";
import BottomNav from "./BottomNav";
import { ragChat } from "../lib/rag-chat";
import { useDashboardData } from "../hooks/useDashboardData";

type Screen = "login" | "dashboard" | "forecast" | "profile" | "ai" | "about";

interface Message {
  role: "user" | "ai";
  text: string;
  time: string;
  sources?: { title: string; source: string; url?: string }[];
}

type Effort = "fast" | "balanced" | "high";

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
    "يمكنك تقليل الفاتورة بعدة طرق:\n\n• ارفع درجة حرارة المكيف إلى 24°C\n• استخدم إضاءة LED بدلاً من التقليدية\n• افصل الأجهزة عن الكهرباء بدلاً من وضعها على الاستعداد\n• شغّل الأجهزة الثقيلة في ساعات الليل\n\nهذه الخطوات يمكنها توفير 20–30% شهرياً.",
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

interface AIAssistantScreenProps {
  onNavigate: (screen: Screen) => void;
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
          borderRadius: 20, padding: "5px 10px",
          color: "hsl(var(--color-gray-700))", fontSize: 12, fontWeight: 600,
          cursor: "pointer", fontFamily: "inherit",
          transition: "background 0.15s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "hsl(var(--color-gray-200))")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "hsl(var(--color-gray-100))")}
      >
        {effortLabels[effort]}
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
          style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <div style={{
          position: "absolute", bottom: "calc(100% + 8px)", left: "50%",
          transform: "translateX(-50%)",
          background: "#FFFFFF", borderRadius: 14,
          border: "1px solid #E5E7EB",
          boxShadow: CARD_SHADOW,
          zIndex: 50, minWidth: 200, overflow: "hidden",
          animation: "dropUp 0.15s ease",
        }}>
          <p style={{ margin: 0, padding: "12px 14px 8px", fontSize: 10, fontWeight: 600, color: "hsl(var(--color-gray-500))", letterSpacing: "0.08em" }}>
            مستوى الإجابة
          </p>
          {options.map((o) => (
            <button
              key={o.id}
              onClick={() => { onChange(o.id); setOpen(false); }}
              style={{
                display: "flex", alignItems: "center", gap: 10, width: "100%",
                padding: "10px 14px", border: "none", cursor: "pointer", fontFamily: "inherit",
                background: effort === o.id ? "hsl(var(--color-sa-50))" : "transparent",
                textAlign: "end",
                transition: "background 0.1s",
              }}
              onMouseEnter={(e) => { if (effort !== o.id) e.currentTarget.style.background = "hsl(var(--color-gray-50))"; }}
              onMouseLeave={(e) => { if (effort !== o.id) e.currentTarget.style.background = "transparent"; }}
            >
              {effort === o.id && (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--color-sa-600))" strokeWidth="2.5" strokeLinecap="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
              <div style={{ flex: 1, textAlign: "end" }}>
                <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: effort === o.id ? "hsl(var(--color-sa-700))" : "hsl(var(--color-gray-900))" }}>
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

function ReferenceSheet({ onClose }: { onClose: () => void }) {
  const options = [
    { icon: "📷", label: "التقاط صورة الفاتورة" },
    { icon: "🖼️", label: "اختيار من المكتبة" },
    { icon: "📄", label: "رفع ملف PDF" },
  ];

  return (
    <>
      <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(13,18,28,0.35)", zIndex: 400, animation: "fadeIn 0.2s ease" }} />
      <div style={{
        position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 401,
        background: "#FFFFFF", borderRadius: "20px 20px 0 0",
        padding: "12px 0 32px",
        boxShadow: "0 -8px 40px rgba(13,18,28,0.12)",
        animation: "slideUp 0.25s ease",
      }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
          <div style={{ width: 36, height: 4, borderRadius: 99, background: "hsl(var(--color-gray-200))" }} />
        </div>
        <p style={{ margin: "0 20px 12px", fontSize: 11, fontWeight: 600, color: "hsl(var(--color-gray-500))", letterSpacing: "0.06em", textAlign: "end" }}>
          أضف مرجعاً
        </p>
        {options.map((o) => (
          <button
            key={o.label}
            onClick={onClose}
            style={{
              display: "flex", alignItems: "center", gap: 14, width: "100%",
              padding: "14px 20px", border: "none", cursor: "pointer",
              background: "transparent", fontFamily: "inherit", textAlign: "end",
              transition: "background 0.1s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "hsl(var(--color-gray-50))")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            <div style={{ flex: 1, display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: 14, fontWeight: 500, color: "hsl(var(--color-gray-900))" }}>{o.label}</span>
              <span style={{ fontSize: 22 }}>{o.icon}</span>
            </div>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--color-gray-400))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
        ))}
      </div>
      <style>{`
        @keyframes fadeIn { from { opacity:0 } to { opacity:1 } }
        @keyframes slideUp { from { transform:translateY(100%) } to { transform:translateY(0) } }
      `}</style>
    </>
  );
}

export default function AIAssistantScreen({ onNavigate }: AIAssistantScreenProps) {
  const { spend, budget, forecast } = useDashboardData();
  const [messages, setMessages] = useState<Message[]>([
    { role: "ai", text: "مرحباً! أنا مساعد Wafier الذكي 🌿\nاسألني أي شيء عن استهلاك الطاقة، الفاتورة، أو نصائح التوفير.", time: getTime() },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [effort, setEffort] = useState<Effort>("high");
  const [listening, setListening] = useState(false);
  const [showRef, setShowRef] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const send = (text: string) => {
    if (!text.trim() || isTyping) return;
    const userMsg: Message = { role: "user", text: text.trim(), time: getTime() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
    setIsTyping(true);

    const delay = effort === "fast" ? 300 : effort === "balanced" ? 600 : 900;
    setTimeout(async () => {
      const result = await ragChat(text.trim(), { spend, budget, forecast });
      setMessages((prev) => [...prev, { role: "ai", text: result.reply, time: getTime(), sources: result.sources }]);
      setIsTyping(false);
    }, delay);
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px";
  };

  const toggleListening = () => {
    setListening((v) => !v);
    if (!listening) {
      setTimeout(() => setListening(false), 3000);
    }
  };

  const hasMessages = messages.length > 1;

  return (
    <div style={{
      display: "flex", flexDirection: "column", height: "100%",
      background: "#FCFCFD",
    }}>
      {/* Header */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "16px 16px 14px",
        background: "#FFFFFF",
        borderBottom: "1px solid #E5E7EB",
        flexShrink: 0,
      }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{
            width: 36, height: 36, borderRadius: "50%",
            background: "linear-gradient(135deg, hsl(var(--color-sa-700)), hsl(var(--color-sa-500)))",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
              <path d="M13 2L4.5 13.5H11L10 22L19.5 10.5H13L13 2Z" />
            </svg>
          </div>
          <div>
            <p style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "#0D121C", lineHeight: 1 }}>Wafier AI</p>
            <p style={{ margin: "2px 0 0", fontSize: 10, color: "#4D5761" }}>مدعوم بالذكاء الاصطناعي</p>
          </div>
        </div>

      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: "auto", padding: "20px 16px 8px" }}>
        {/* Welcome / empty state */}
        {!hasMessages && (
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <div style={{
              width: 72, height: 72, borderRadius: "50%",
              background: "linear-gradient(135deg, hsl(var(--color-sa-700)), hsl(var(--color-sa-500)))",
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 16px",
            }}>
              <svg width="36" height="36" viewBox="0 0 24 24" fill="white">
                <path d="M13 2L4.5 13.5H11L10 22L19.5 10.5H13L13 2Z" />
              </svg>
            </div>
            <p style={{ margin: "0 0 4px", fontSize: 20, fontWeight: 700, color: "#0D121C" }}>Wafier AI</p>
            <p style={{ margin: 0, fontSize: 13, color: "#4D5761" }}>كيف يمكنني مساعدتك اليوم؟</p>
          </div>
        )}

        {messages.map((m, i) => (
          <div key={i} style={{
            display: "flex",
            flexDirection: m.role === "user" ? "row" : "row-reverse",
            alignItems: "flex-end",
            gap: 8,
            marginBottom: 16,
          }}>
            {/* Avatar for AI */}
            {m.role === "ai" && (
              <div style={{
                width: 28, height: 28, borderRadius: "50%", flexShrink: 0,
                background: "linear-gradient(135deg, hsl(var(--color-sa-700)), hsl(var(--color-sa-500)))",
                display: "flex", alignItems: "center", justifyContent: "center",
                marginBottom: 2,
              }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="white">
                  <path d="M13 2L4.5 13.5H11L10 22L19.5 10.5H13L13 2Z" />
                </svg>
              </div>
            )}

            <div style={{ maxWidth: "78%", display: "flex", flexDirection: "column", alignItems: m.role === "user" ? "flex-start" : "flex-end" }}>
              <div style={{
                padding: "12px 16px",
                borderRadius: m.role === "user"
                  ? "18px 18px 4px 18px"
                  : "18px 18px 18px 4px",
                background: m.role === "user"
                  ? "#1B8354"
                  : "#FFFFFF",
                border: m.role === "user"
                  ? "1px solid #1B8354"
                  : "1px solid #E5E7EB",
                boxShadow: m.role === "user" ? "none" : CARD_SHADOW,
                color: m.role === "user" ? "#FFFFFF" : "#111927",
                fontSize: 14,
                lineHeight: 1.65,
                textAlign: "end",
                whiteSpace: "pre-line",
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
              <p style={{ margin: "4px 4px 0", fontSize: 10, color: "#4D5761" }}>{m.time}</p>
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div style={{ display: "flex", flexDirection: "row-reverse", alignItems: "flex-end", gap: 8, marginBottom: 16 }}>
            <div style={{
              width: 28, height: 28, borderRadius: "50%", flexShrink: 0,
              background: "linear-gradient(135deg, hsl(var(--color-sa-700)), hsl(var(--color-sa-500)))",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="white">
                <path d="M13 2L4.5 13.5H11L10 22L19.5 10.5H13L13 2Z" />
              </svg>
            </div>
            <div style={{
              padding: "14px 18px", borderRadius: "18px 18px 18px 4px",
              background: "#FFFFFF",
              border: "1px solid #E5E7EB",
              boxShadow: CARD_SHADOW,
              display: "flex", gap: 5, alignItems: "center",
            }}>
              {[0, 1, 2].map((d) => (
                <div key={d} style={{
                  width: 7, height: 7, borderRadius: "50%",
                  background: "hsl(var(--color-sa-400))",
                  animation: `bounce 1s ease ${d * 0.2}s infinite`,
                }} />
              ))}
            </div>
          </div>
        )}

        {/* Suggestion cards (only shown when no conversation yet) */}
        {!hasMessages && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 8 }}>
            {suggestions.map((s) => (
              <button
                key={s.text}
                onClick={() => send(s.text)}
                style={{
                  padding: "14px 12px", borderRadius: 14, textAlign: "end",
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
                <p style={{ margin: "0 0 6px", fontSize: 18 }}>{s.icon}</p>
                <p style={{ margin: 0, fontSize: 12, color: "#4D5761", lineHeight: 1.4 }}>{s.text}</p>
              </button>
            ))}
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input Bar — ChatGPT style */}
      <div style={{
        padding: "12px 14px 28px",
        flexShrink: 0,
      }}>
        <div style={{
          background: "#FFFFFF",
          borderRadius: 28,
          border: "1px solid #E5E7EB",
          padding: "6px 8px 6px 12px",
          display: "flex", alignItems: "flex-end", gap: 6,
          boxShadow: CARD_SHADOW,
        }}>
          {/* + Reference */}
          <button
            onClick={() => setShowRef(true)}
            style={{
              width: 34, height: 34, borderRadius: "50%", flexShrink: 0,
              background: "hsl(var(--color-gray-100))", border: "none", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#4D5761",
              transition: "background 0.15s",
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
            onChange={handleTextareaChange}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send(input);
              }
            }}
            placeholder="اسأل Wafier AI..."
            dir="rtl"
            rows={1}
            style={{
              flex: 1, background: "transparent", border: "none", outline: "none",
              resize: "none", padding: "8px 4px",
              fontSize: 14, color: "#111927", fontFamily: "inherit",
              lineHeight: 1.5, maxHeight: 120,
              overflowY: "auto",
            }}
          />

          {/* Right-side controls */}
          <div style={{ display: "flex", alignItems: "center", gap: 4, flexShrink: 0, alignSelf: "flex-end", marginBottom: 2 }}>
            {/* Effort */}
            <EffortDropdown effort={effort} onChange={setEffort} />

            {/* Mic */}
            <button
              onClick={toggleListening}
              style={{
                width: 34, height: 34, borderRadius: "50%", border: "none", cursor: "pointer",
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

            {/* Voice chat / send */}
            {input.trim() ? (
              <button
                onClick={() => send(input)}
                style={{
                  width: 36, height: 36, borderRadius: "50%", border: "none", cursor: "pointer",
                  background: "#1B8354",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "background 0.15s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#166A45")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#1B8354")}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            ) : (
              <button
                onClick={() => setToast("المحادثة الصوتية قريباً")}
                style={{
                  width: 36, height: 36, borderRadius: "50%", border: "none", cursor: "pointer",
                  background: "#1B8354",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "background 0.15s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#166A45")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#1B8354")}
              >
                {/* Sound wave icon */}
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

      <BottomNav current="ai" onNavigate={onNavigate} />

      {/* Overlays */}
      {showRef && <ReferenceSheet onClose={() => setShowRef(false)} />}
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}

      <style>{`
        @keyframes bounce { 0%,80%,100% { transform:translateY(0) } 40% { transform:translateY(-6px) } }
        textarea::placeholder { color: #9DA4AE; }
        textarea::-webkit-scrollbar { width: 0; }
      `}</style>
    </div>
  );
}
