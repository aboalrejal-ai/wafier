import { useState, useRef, useEffect } from "react";

const options = ["آخر 3 أشهر", "آخر 6 أشهر", "آخر 12 شهراً", "هذا العام"];

interface PeriodPickerProps {
  value: string;
  onChange: (v: string) => void;
}

export default function PeriodPicker({ value, onChange }: PeriodPickerProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          display: "flex", alignItems: "center", gap: 6,
          background: "hsl(var(--color-gray-50))", border: "1px solid hsl(var(--color-gray-200))",
          borderRadius: 8, padding: "6px 10px", cursor: "pointer", fontFamily: "inherit",
          transition: "border-color 0.15s",
        }}
      >
        <svg
          width="12" height="12" viewBox="0 0 24 24" fill="none"
          stroke="hsl(var(--color-gray-500))" strokeWidth="2.5"
          style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
        <span style={{ fontSize: 12, color: "hsl(var(--color-gray-600))", fontFamily: "inherit" }}>{value}</span>
      </button>

      {open && (
        <div
          style={{
            position: "absolute", top: "calc(100% + 6px)", left: 0,
            background: "#fff",
            borderRadius: 12,
            border: "1px solid hsl(var(--color-gray-200))",
            boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
            zIndex: 100, minWidth: 150,
            overflow: "hidden",
            animation: "dropDown 0.15s ease",
          }}
        >
          {options.map((o) => (
            <button
              key={o}
              onClick={() => { onChange(o); setOpen(false); }}
              style={{
                display: "block", width: "100%", textAlign: "end",
                padding: "10px 14px",
                background: o === value ? "hsl(var(--color-sa-25))" : "#fff",
                border: "none", cursor: "pointer",
                fontSize: 13, fontFamily: "inherit",
                color: o === value ? "hsl(var(--color-sa-700))" : "hsl(var(--color-gray-700))",
                fontWeight: o === value ? 600 : 400,
                borderBottom: "1px solid hsl(var(--color-gray-100))",
                transition: "background 0.1s",
              }}
              onMouseEnter={(e) => { if (o !== value) e.currentTarget.style.background = "hsl(var(--color-gray-50))"; }}
              onMouseLeave={(e) => { if (o !== value) e.currentTarget.style.background = "#fff"; }}
            >
              {o}
            </button>
          ))}
        </div>
      )}
      <style>{`
        @keyframes dropDown { from { opacity: 0; transform: translateY(-6px) } to { opacity: 1; transform: translateY(0) } }
      `}</style>
    </div>
  );
}
