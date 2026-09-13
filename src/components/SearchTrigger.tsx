import { Icons } from "./Icons";
import { useT } from "../i18n";

/** Header search trigger — aboalrejal search-input recipe. */
export default function SearchTrigger({ onOpen, compact = false }: { onOpen: () => void; compact?: boolean }) {
  const t = useT();

  if (compact) {
    return (
      <button
        type="button"
        onClick={onOpen}
        aria-label={t("common.search")}
        className="tool-btn"
        style={{
          width: 40,
          height: 40,
          borderRadius: 10,
          border: "1px solid color-mix(in srgb, var(--border) 50%, transparent)",
          background: "var(--card)",
          color: "var(--muted-foreground)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Icons.Search size={18} strokeWidth={2} />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onOpen}
      className="tool-btn"
      style={{
        width: "100%",
        maxWidth: 420,
        height: 40,
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "0 14px",
        borderRadius: 10,
        border: "1px solid color-mix(in srgb, var(--border) 50%, transparent)",
        background: "var(--surface-muted)",
        color: "var(--muted-foreground)",
        cursor: "pointer",
        fontFamily: "inherit",
        fontSize: 13,
        fontWeight: 500,
        transition: "border-color var(--duration-fast) var(--ease-out-expo), background var(--duration-fast) var(--ease-out-expo)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "color-mix(in srgb, var(--foreground) 20%, transparent)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "color-mix(in srgb, var(--border) 50%, transparent)";
      }}
    >
      <Icons.Search size={16} strokeWidth={2} />
      <span style={{ flex: 1, textAlign: "start", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
        {t("common.searchPlaceholder")}
      </span>
      <span
        style={{
          fontSize: 10,
          fontWeight: 700,
          fontFamily: "var(--font-mono)",
          letterSpacing: "0.25em",
          padding: "3px 7px",
          borderRadius: 6,
          border: "1px solid var(--border)",
          background: "var(--card)",
          color: "var(--muted-foreground)",
          boxShadow: "var(--shadow-xs)",
          display: "inline-flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Icons.Command size={10} strokeWidth={2.5} />K
      </span>
    </button>
  );
}
