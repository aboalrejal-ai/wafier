import {
  SEASON_MULTIPLIERS,
  getSeasonCopy,
  type SeasonProfile,
} from "../lib/ml-predictor";

interface SeasonProfileCardProps {
  seasonProfile: string;
  temperature: number;
  variant?: "mobile" | "desktop";
}

function asSeason(value: string): SeasonProfile {
  if (value === "summer" || value === "winter") return value;
  return "baseline";
}

export default function SeasonProfileCard({
  seasonProfile,
  temperature,
  variant = "mobile",
}: SeasonProfileCardProps) {
  const profile = asSeason(seasonProfile);
  const copy = getSeasonCopy(profile);
  const multiplier = SEASON_MULTIPLIERS[profile];
  const isDesktop = variant === "desktop";

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: isDesktop ? 18 : 16,
        padding: isDesktop ? "22px 24px" : "16px 18px",
        border: "1px solid hsl(var(--color-gray-100))",
        boxShadow: isDesktop
          ? "0 1px 3px 0 hsl(220 39% 11% / .10), 0 1px 2px 0 hsl(220 39% 11% / .06)"
          : "none",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
        <div
          style={{
            background: "hsl(var(--color-sa-25))",
            color: "hsl(var(--color-sa-700))",
            border: "1px solid hsl(var(--color-sa-100))",
            borderRadius: 99,
            padding: "4px 10px",
            fontSize: 11,
            fontWeight: 700,
            flexShrink: 0,
          }}
          dir="ltr"
        >
          ×{multiplier.toFixed(2)}
        </div>
        <div style={{ textAlign: "start", flex: 1 }}>
          <p style={{ margin: 0, fontSize: 11, color: "hsl(var(--color-gray-500))", fontWeight: 600 }}>
            Winter Profile · MLFO
          </p>
          <h2 style={{ margin: "4px 0 0", fontSize: isDesktop ? 18 : 15, fontWeight: 800, color: "hsl(var(--color-gray-950))" }}>
            {copy.title}
          </h2>
        </div>
      </div>

      <p style={{ margin: "12px 0 0", fontSize: 12, color: "hsl(var(--color-gray-600))", lineHeight: 1.6, textAlign: "start" }}>
        {copy.explanation}
      </p>

      <div style={{ display: "flex", justifyContent: "flex-start", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
        <span
          style={{
            fontSize: 11,
            fontWeight: 600,
            color: "hsl(var(--color-gray-700))",
            background: "hsl(var(--color-gray-50))",
            border: "1px solid hsl(var(--color-gray-200))",
            borderRadius: 8,
            padding: "5px 10px",
          }}
        >
          الحرارة الحالية {temperature}°C
        </span>
      </div>

      {copy.winterTip && (
        <p style={{ margin: "12px 0 0", fontSize: 12, color: "hsl(var(--color-sa-700))", lineHeight: 1.6, textAlign: "start" }}>
          {copy.winterTip}
        </p>
      )}
    </div>
  );
}
