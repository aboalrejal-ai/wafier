import { useTheme } from "../contexts/ThemeContext";
import { useT } from "../i18n";

function SunIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

function MoonIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 14.5A8.5 8.5 0 1 1 9.5 3a7 7 0 0 0 11.5 11.5z" />
    </svg>
  );
}

/** Capsule Light/Dark toggle — same idea as aboalrejal ThemeToggle. */
export default function ThemeToggle({ compact = false }: { compact?: boolean }) {
  const { theme, setTheme } = useTheme();
  const t = useT();
  const btn = compact ? 24 : 28;
  const icon = compact ? 12 : 14;

  return (
    <div
      role="group"
      aria-label={t("common.theme")}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 2,
        padding: compact ? 2 : 4,
        borderRadius: 999,
        background: "var(--surface-muted)",
        border: "1px solid var(--border)",
        flexShrink: 0,
      }}
    >
      {([
        { value: "light" as const, Icon: SunIcon, label: t("common.themeLight") },
        { value: "dark" as const, Icon: MoonIcon, label: t("common.themeDark") },
      ]).map(({ value, Icon, label }) => {
        const active = theme === value;
        return (
          <button
            key={value}
            type="button"
            title={label}
            aria-label={label}
            aria-pressed={active}
            onClick={() => setTheme(value)}
            style={{
              width: btn,
              height: btn,
              borderRadius: 999,
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: active ? "var(--card)" : "transparent",
              color: active ? "var(--primary)" : "var(--muted-foreground)",
              boxShadow: active ? "0 0 0 2px hsl(var(--color-sa-600) / 0.35)" : "none",
              transition: "background 0.15s, color 0.15s",
            }}
          >
            <Icon size={icon} />
          </button>
        );
      })}
    </div>
  );
}
