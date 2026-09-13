import { Icons } from "./Icons";
import { useTheme } from "../contexts/ThemeContext";
import { useT } from "../i18n";

/** Capsule Light/Dark — recipe from aboalrejal ThemeToggle, Wafir tokens. */
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
        gap: compact ? 0 : 2,
        padding: compact ? 2 : 4,
        borderRadius: 999,
        background: "color-mix(in srgb, var(--muted) 50%, transparent)",
        border: "1px solid color-mix(in srgb, var(--border) 50%, transparent)",
        flexShrink: 0,
      }}
    >
      {(
        [
          { value: "light" as const, Icon: Icons.Sun, label: t("common.themeLight") },
          { value: "dark" as const, Icon: Icons.Moon, label: t("common.themeDark") },
        ] as const
      ).map(({ value, Icon, label }) => {
        const active = theme === value;
        return (
          <button
            key={value}
            type="button"
            title={label}
            aria-label={label}
            aria-pressed={active}
            className="tool-btn"
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
              boxShadow: active ? "0 0 0 2px var(--primary), var(--shadow-xs)" : "none",
              padding: 0,
            }}
          >
            <Icon size={icon} strokeWidth={2} />
          </button>
        );
      })}
    </div>
  );
}
