import { useState } from "react";

const presets = ["300", "400", "500", "600", "750", "1000"];

interface SetBudgetModalProps {
  onClose: () => void;
  onSet?: (amount: string) => void;
  initialAmount?: string;
}

export default function SetBudgetModal({ onClose, onSet, initialAmount = "500" }: SetBudgetModalProps) {
  const [amount, setAmount] = useState(initialAmount);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    onSet?.(amount);
    setTimeout(onClose, 1100);
  };

  return (
    <>
      <div
        onClick={onClose}
        style={{ position: "fixed", inset: 0, background: "hsl(var(--color-gray-950) / 0.45)", zIndex: 300, animation: "fadeIn 0.2s ease" }}
      />
      <div
        style={{
          position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 301,
          background: "#fff",
          borderRadius: "24px 24px 0 0",
          padding: "12px 24px 40px",
          boxShadow: "0 -8px 40px rgba(0,0,0,0.18)",
          animation: "slideUp 0.3s ease",
        }}
      >
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
          <div style={{ width: 36, height: 4, borderRadius: 99, background: "hsl(var(--color-gray-200))" }} />
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
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
          <div style={{ textAlign: "start" }}>
            <h2 style={{ margin: "0 0 2px", fontSize: 20, fontWeight: 700, color: "hsl(var(--color-gray-950))" }}>تحديد الميزانية</h2>
            <p style={{ margin: 0, fontSize: 12, color: "hsl(var(--color-gray-500))" }}>حدد ميزانيتك الشهرية للكهرباء</p>
          </div>
        </div>

        {/* Amount display */}
        <div style={{
          background: "hsl(var(--color-sa-25))",
          border: "1.5px solid hsl(var(--color-sa-200))",
          borderRadius: 16, padding: "20px",
          textAlign: "center", marginBottom: 20,
        }}>
          <p style={{ margin: "0 0 8px", fontSize: 12, color: "hsl(var(--color-gray-500))", fontWeight: 500 }}>الميزانية الشهرية</p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
            <span style={{ fontSize: 14, color: "hsl(var(--color-sa-600))", fontWeight: 600 }}>ر.س</span>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              style={{
                fontSize: 40, fontWeight: 800, color: "hsl(var(--color-gray-950))",
                border: "none", outline: "none", background: "transparent",
                width: 140, textAlign: "center", fontFamily: "inherit",
              }}
            />
          </div>
        </div>

        {/* Presets */}
        <p style={{ margin: "0 0 10px", fontSize: 12, color: "hsl(var(--color-gray-500))", textAlign: "start", fontWeight: 500 }}>
          اختر من القيم الشائعة
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, marginBottom: 24 }}>
          {presets.map((p) => (
            <button
              key={p}
              onClick={() => setAmount(p)}
              style={{
                padding: "10px",
                borderRadius: 10,
                border: amount === p ? "1.5px solid hsl(var(--color-sa-500))" : "1.5px solid hsl(var(--color-gray-200))",
                background: amount === p ? "hsl(var(--color-sa-25))" : "#fff",
                color: amount === p ? "hsl(var(--color-sa-700))" : "hsl(var(--color-gray-700))",
                fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
                transition: "all 0.15s",
              }}
            >
              {p} <span style={{ fontSize: 11, fontWeight: 400 }}>ر.س</span>
            </button>
          ))}
        </div>

        <button
          onClick={handleSave}
          style={{
            width: "100%", padding: "15px",
            background: saved
              ? "hsl(var(--color-sa-500))"
              : "linear-gradient(90deg, hsl(var(--color-sa-700)), hsl(var(--color-sa-600)))",
            border: "none", borderRadius: 14, cursor: "pointer",
            color: "#fff", fontSize: 15, fontWeight: 700, fontFamily: "inherit",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            transition: "background 0.3s",
            boxShadow: "0 4px 16px hsla(var(--color-sa-600), 0.35)",
          }}
        >
          {saved ? (
            <>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              تم تحديد الميزانية!
            </>
          ) : "تأكيد الميزانية"}
        </button>
      </div>
      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp { from { transform: translateY(100%) } to { transform: translateY(0) } }
      `}</style>
    </>
  );
}
