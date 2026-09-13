import type { LucideProps } from "lucide-react";
import {
  Bell,
  CloudSun,
  Command,
  Droplets,
  FileText,
  Info,
  Languages,
  LayoutDashboard,
  Lightbulb,
  Moon,
  Search,
  Snowflake,
  Sparkles,
  Sun,
  Thermometer,
  User,
  Wallet,
  Zap,
  ChevronLeft,
  ChevronRight,
  X,
  Check,
  AlertTriangle,
  Shield,
  Bot,
  Monitor,
  Scale,
  Brain,
  TrendingDown,
  CreditCard,
  Archive,
  Camera,
  Image,
} from "lucide-react";

/** Wafir icon registry — lucide-react, same library as aboalrejal. */
export const Icons = {
  Bell,
  CloudSun,
  Command,
  Droplets,
  FileText,
  Info,
  Languages,
  LayoutDashboard,
  Lightbulb,
  Moon,
  Search,
  Snowflake,
  Sparkles,
  Sun,
  Thermometer,
  User,
  Wallet,
  Zap,
  ChevronLeft,
  ChevronRight,
  X,
  Check,
  AlertTriangle,
  Shield,
  Bot,
  Monitor,
  Scale,
  Brain,
  TrendingDown,
  CreditCard,
  Archive,
  Camera,
  Image,
} as const;

export type IconName = keyof typeof Icons;

export type IconProps = LucideProps;

export function DeviceIcon({ type, size = 18 }: { type: string; size?: number }) {
  if (type === "ac") return <Icons.Snowflake size={size} strokeWidth={1.8} />;
  if (type === "lights") return <Icons.Lightbulb size={size} strokeWidth={1.8} />;
  if (type === "tv") return <Icons.Monitor size={size} strokeWidth={1.8} />;
  return <Icons.Archive size={size} strokeWidth={1.8} />;
}

export default Icons;
