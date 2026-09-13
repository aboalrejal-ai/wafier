import { useT } from "../i18n";

export default function SyntheticNotice({ compact }: { compact?: boolean }) {
  const t = useT();
  return (
    <div
      style={{
        background: "hsl(var(--color-warning-25, 255 251 235))",
        border: "1px solid hsl(var(--color-warning-200, 253 230 138))",
        borderRadius: compact ? 8 : 10,
        padding: compact ? "6px 10px" : "8px 12px",
        fontSize: compact ? 11 : 12,
        color: "hsl(var(--color-warning-800, 146 64 14))",
        textAlign: "center",
        lineHeight: 1.5,
      }}
    >
      {t("synthetic")}
    </div>
  );
}
