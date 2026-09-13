import { motion, useReducedMotion } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Staggered enter + light hover — aboalrejal QuickActionsGrid pattern. */
export default function MotionCard({
  children,
  index = 0,
  style,
  className,
}: {
  children: ReactNode;
  index?: number;
  style?: CSSProperties;
  className?: string;
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.35, ease: EASE }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.div>
  );
}
