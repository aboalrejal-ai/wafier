import { useT } from "../i18n";

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.3-4.3" />
    </svg>
  );
}

/** Header search trigger — looks like an input, opens CommandPalette. */
export default function SearchTrigger({ onOpen, compact = false }: { onOpen: () => void; compact?: boolean }) {
  const t = useT();

  if (compact) {
    return (
      <button
        type="button"
        onClick={onOpen}
        aria-label={t("common.search")}
        style={{
          width: 40,
          height: 40,
          borderRadius: 10,
          border: "1px solid var(--border)",
          background: "var(--card)",
          color: "var(--muted-foreground)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <SearchIcon />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onOpen}
      style={{
        width: "100%",
        maxWidth: 420,
        height: 40,
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "0 14px",
        borderRadius: 10,
        border: "1px solid var(--border)",
        background: "var(--surface-muted)",
        color: "var(--muted-foreground)",
        cursor: "pointer",
        fontFamily: "inherit",
        fontSize: 13,
        fontWeight: 500,
      }}
    >
      <SearchIcon />
      <span style={{ flex: 1, textAlign: "start", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
        {t("common.searchPlaceholder")}
      </span>
      <span
        style={{
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: "0.06em",
          padding: "3px 7px",
          borderRadius: 6,
          border: "1px solid var(--border)",
          background: "var(--card)",
          color: "var(--muted-foreground)",
        }}
      >
        ⌘K
      </span>
    </button>
  );
}
