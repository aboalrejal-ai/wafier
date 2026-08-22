import { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "ai";
  text: string;
}

const suggestions = [
  "كيف أوفر في فاتورة الكهرباء؟",
  "ما هي أسباب ارتفاع استهلاك المكيف؟",
  "نصائح للموجة الحارة القادمة",
];

const aiReplies: Record<string, string> = {
  "كيف أوفر في فاتورة الكهرباء؟":
    "يمكنك تقليل الفاتورة بعدة طرق: ارفع درجة حرارة المكيف إلى 24°C، استخدم LED بدلاً من الإضاءة التقليدية، وافصل الأجهزة عن الكهرباء تماماً بدلاً من وضعها على الاستعداد. هذه الخطوات يمكنها توفير 20-30% شهرياً.",
  "ما هي أسباب ارتفاع استهلاك المكيف؟":
    "أهم الأسباب: درجة حرارة منخفضة جداً، فلتر متسخ يقلل الكفاءة، عزل حراري ضعيف، أو أبواب ونوافذ مفتوحة. تنظيف الفلتر كل شهر يمكنه تحسين الكفاءة بنسبة 15%.",
  "نصائح للموجة الحارة القادمة":
    "استعد للموجة الحارة بـ: ضبط المكيف على 26°C بدلاً من 18°C، استخدام الستائر العاكسة خلال ساعات الذروة، وتشغيل الأجهزة الثقيلة في المساء. هذا سيقلص الزيادة المتوقعة في الفاتورة.",
};

interface AIAssistantPanelProps {
  onClose: () => void;
}

export default function AIAssistantPanel({ onClose }: AIAssistantPanelProps) {
  const [messages, setMessages] = useState<Message[]>([
    { role: "ai", text: "مرحباً! أنا مساعد Wafier الذكي. كيف يمكنني مساعدتك في إدارة الطاقة وتوفير فاتورتك؟ 🌿" },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const send = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { role: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const reply = aiReplies[text] || "شكراً على سؤالك! بناءً على بيانات استهلاكك، أنصحك بمراجعة إعدادات المكيف وتقليل ساعات الاستخدام خلال فترة الذروة للحصول على أفضل توفير ممكن.";
      setMessages((prev) => [...prev, { role: "ai", text: reply }]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <>
      <div
        onClick={onClose}
        style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 200, animation: "fadeIn 0.2s ease" }}
      />
      <div
        style={{
          position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 201,
          background: "#fff",
          borderRadius: "24px 24px 0 0",
          height: "88vh",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 -8px 40px rgba(0,0,0,0.18)",
          animation: "slideUp 0.3s ease",
        }}
      >
        {/* Handle */}
        <div style={{ display: "flex", justifyContent: "center", paddingTop: 12, flexShrink: 0 }}>
          <div style={{ width: 36, height: 4, borderRadius: 99, background: "hsl(var(--color-gray-200))" }} />
        </div>

        {/* Header */}
        <div
          style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            padding: "14px 20px 14px",
            borderBottom: "1px solid hsl(var(--color-gray-100))",
            flexShrink: 0,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 40, height: 40, borderRadius: "50%",
              background: "linear-gradient(135deg, hsl(var(--color-sa-700)), hsl(var(--color-sa-500)))",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 2px 8px hsla(var(--color-sa-600), 0.4)",
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                <path d="M13 2L4.5 13.5H11L10 22L19.5 10.5H13L13 2Z" />
              </svg>
            </div>
            <div style={{ textAlign: "start" }}>
              <h2 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: "hsl(var(--color-gray-950))" }}>المساعد الذكي</h2>
              <p style={{ margin: 0, fontSize: 11, color: "hsl(var(--color-sa-600))", fontWeight: 500 }}>مدعوم بالذكاء الاصطناعي ✨</p>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "hsl(var(--color-gray-100))", border: "none", cursor: "pointer",
              width: 32, height: 32, borderRadius: "50%",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--color-gray-700))" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div style={{ flex: 1, overflowY: "auto", padding: "16px 16px 8px" }}>
          {messages.map((m, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                justifyContent: m.role === "user" ? "flex-start" : "flex-end",
                marginBottom: 12,
              }}
            >
              <div
                style={{
                  maxWidth: "78%",
                  padding: "12px 14px",
                  borderRadius: m.role === "user" ? "18px 18px 18px 4px" : "18px 18px 4px 18px",
                  background: m.role === "user" ? "#1B8354" : "#FFFFFF",
                  border: m.role === "user" ? "1px solid #1B8354" : "1px solid #E5E7EB",
                  boxShadow: m.role === "user" ? "none" : "0 1px 3px 0 hsl(220 39% 11% / .10), 0 1px 2px 0 hsl(220 39% 11% / .06)",
                  color: m.role === "user" ? "#FFFFFF" : "#111927",
                  fontSize: 13,
                  lineHeight: 1.6,
                  textAlign: "start",
                }}
              >
                {m.text}
              </div>
            </div>
          ))}

          {isTyping && (
            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 12 }}>
              <div style={{
                padding: "12px 16px", borderRadius: "18px 18px 4px 18px",
                background: "hsl(var(--color-sa-25))",
                border: "1px solid hsl(var(--color-sa-100))",
                display: "flex", gap: 4, alignItems: "center",
              }}>
                {[0, 1, 2].map((d) => (
                  <div key={d} style={{
                    width: 6, height: 6, borderRadius: "50%",
                    background: "hsl(var(--color-sa-400))",
                    animation: `bounce 1s ease ${d * 0.2}s infinite`,
                  }} />
                ))}
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Quick suggestions */}
        {messages.length <= 1 && (
          <div style={{ padding: "0 16px 8px", display: "flex", gap: 8, overflowX: "auto", flexShrink: 0 }}>
            {suggestions.map((s) => (
              <button
                key={s}
                onClick={() => send(s)}
                style={{
                  whiteSpace: "nowrap", flexShrink: 0,
                  padding: "8px 12px", borderRadius: 99,
                  border: "1.5px solid hsl(var(--color-sa-200))",
                  background: "hsl(var(--color-sa-25))",
                  color: "hsl(var(--color-sa-700))",
                  fontSize: 12, fontWeight: 500, cursor: "pointer", fontFamily: "inherit",
                }}
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div style={{
          padding: "12px 16px 24px",
          borderTop: "1px solid hsl(var(--color-gray-100))",
          display: "flex", gap: 10, flexShrink: 0,
        }}>
          <button
            onClick={() => send(input)}
            disabled={!input.trim()}
            style={{
              width: 44, height: 44, borderRadius: "50%",
              background: input.trim() ? "hsl(var(--color-sa-600))" : "hsl(var(--color-gray-200))",
              border: "none", cursor: input.trim() ? "pointer" : "default",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0, transition: "background 0.2s",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send(input)}
            placeholder="اسألني أي شيء عن الطاقة..."
            dir="rtl"
            style={{
              flex: 1, height: 44, borderRadius: 22,
              border: "1.5px solid hsl(var(--color-gray-200))",
              padding: "0 16px",
              fontSize: 13, outline: "none",
              fontFamily: "inherit", background: "hsl(var(--color-gray-25))",
              color: "hsl(var(--color-gray-900))",
            }}
            onFocus={(e) => (e.target.style.borderColor = "hsl(var(--color-sa-400))")}
            onBlur={(e) => (e.target.style.borderColor = "hsl(var(--color-gray-200))")}
          />
        </div>
      </div>
      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp { from { transform: translateY(100%) } to { transform: translateY(0) } }
        @keyframes bounce { 0%,80%,100% { transform: translateY(0) } 40% { transform: translateY(-6px) } }
      `}</style>
    </>
  );
}
