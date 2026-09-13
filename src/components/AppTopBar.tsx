import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useDashboardData } from "../hooks/useDashboardData";
import { useT } from "../i18n";
import { demoService } from "../services/data-service";
import CommandPalette, { type AppPage } from "./CommandPalette";
import { Icons } from "./Icons";
import LanguageIconButton from "./LanguageIconButton";
import NotificationsPanel from "./panels/NotificationsPanel";
import SearchTrigger from "./SearchTrigger";
import ThemeToggle from "./ThemeToggle";

const PAGE_PATH: Record<AppPage, string> = {
  dashboard: "/dashboard",
  forecast: "/forecast",
  ai: "/ai",
  profile: "/profile",
  about: "/about",
  "hackathon-kb": "/hackathon/kb",
  "hackathon-gaps": "/hackathon/gaps",
  "hackathon-readiness": "/hackathon/readiness",
};

export function navigateToAppPage(navigate: ReturnType<typeof useNavigate>, page: AppPage) {
  navigate(PAGE_PATH[page]);
}

export default function AppTopBar({
  title,
  subtitle,
  onNavigate,
  compact = false,
  showTitle = true,
  notificationsVariant = "desktop",
}: {
  title?: string;
  subtitle?: string;
  onNavigate?: (page: AppPage) => void;
  compact?: boolean;
  showTitle?: boolean;
  notificationsVariant?: "desktop" | "mobile";
}) {
  const t = useT();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { notifications } = useDashboardData();
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const unread = notifications.some((n) => !n.read);

  const handleNavigate = (page: AppPage) => {
    if (onNavigate) onNavigate(page);
    else navigateToAppPage(navigate, page);
  };

  const markAllRead = () => {
    demoService.markAllNotificationsRead();
    queryClient.invalidateQueries({ queryKey: ["dashboard"] });
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 40,
          display: "flex",
          alignItems: "center",
          gap: compact ? 8 : 16,
          padding: compact ? "10px 16px" : "12px 24px",
          background: "color-mix(in srgb, var(--background) 80%, transparent)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: "1px solid var(--border)",
          transition: "background var(--duration-medium) var(--ease-out-expo), border-color var(--duration-medium) var(--ease-out-expo)",
        }}
      >
        {showTitle && title ? (
          <div style={{ minWidth: 0, flexShrink: 1, textAlign: "start" }}>
            <h1
              style={{
                margin: 0,
                fontSize: compact ? 18 : 20,
                fontWeight: 700,
                color: "var(--foreground)",
                letterSpacing: "-0.02em",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {title}
            </h1>
            {subtitle ? (
              <p style={{ margin: "2px 0 0", fontSize: 12, color: "var(--muted-foreground)", whiteSpace: "nowrap" }}>
                {subtitle}
              </p>
            ) : null}
          </div>
        ) : null}

        {!compact ? (
          <div style={{ flex: 1, display: "flex", justifyContent: "center", minWidth: 0, paddingInline: 12 }}>
            <SearchTrigger onOpen={() => setPaletteOpen(true)} />
          </div>
        ) : (
          <div style={{ flex: 1 }} />
        )}

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginInlineStart: "auto",
            flexShrink: 0,
          }}
        >
          {compact ? <SearchTrigger compact onOpen={() => setPaletteOpen(true)} /> : null}

          <button
            type="button"
            aria-label={t("notifications.title")}
            className="tool-btn"
            onClick={() => setNotifOpen(true)}
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
              position: "relative",
            }}
          >
            <Icons.Bell size={20} strokeWidth={1.8} />
            {unread ? (
              <span
                style={{
                  position: "absolute",
                  top: 8,
                  insetInlineEnd: 8,
                  width: 8,
                  height: 8,
                  borderRadius: 999,
                  background: "hsl(var(--color-sa-600))",
                }}
              />
            ) : null}
          </button>

          <LanguageIconButton />
          <ThemeToggle compact={compact} />
        </div>
      </header>

      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} onNavigate={handleNavigate} />
      {notifOpen ? (
        <NotificationsPanel
          variant={notificationsVariant}
          notifications={notifications}
          onClose={() => setNotifOpen(false)}
          onMarkAllRead={markAllRead}
        />
      ) : null}
    </>
  );
}
