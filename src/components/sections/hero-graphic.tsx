"use client";
import { motion, useReducedMotion } from "framer-motion";
import { Cloud, Code2, ShieldCheck } from "lucide-react";

export function HeroGraphic({ projects }: { projects: number }) {
  const reduce = useReducedMotion();
  const float = (delay: number) =>
    reduce ? {} : { animate: { y: [0, -10, 0] }, transition: { duration: 5, repeat: Infinity, ease: "easeInOut" as const, delay } };

  // Decorative illustration: a stylised dashboard with floating service badges.
  return (
    <div className="relative mx-auto w-full max-w-lg" aria-hidden="true">
      <motion.div
        initial={reduce ? false : { opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="relative rounded-2xl border bg-card p-5 shadow-2xl"
      >
        <div className="mb-4 flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full bg-red-400" />
          <span className="h-3 w-3 rounded-full bg-amber-400" />
          <span className="h-3 w-3 rounded-full bg-emerald-400" />
          <span className="ml-3 h-5 flex-1 rounded bg-secondary" />
        </div>
        <div className="grid grid-cols-3 gap-3">
          {[
            ["Uptime", "99.98%"],
            ["Projects", `${projects}+`],
            ["Tickets", "< 1 hr"],
          ].map(([k, v]) => (
            <div key={k} className="rounded-xl bg-secondary p-3">
              <p className="text-[11px] text-muted-foreground">{k}</p>
              <p className="font-heading text-lg font-bold">{v}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-xl bg-secondary p-4">
          <div className="flex h-32 items-end gap-2">
            {[40, 65, 50, 80, 60, 95, 75, 100].map((h, i) => (
              <motion.span
                key={i}
                className="flex-1 rounded-t bg-gradient-to-t from-brand-blue to-brand-teal"
                initial={reduce ? false : { height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ duration: 0.8, delay: 0.3 + i * 0.07 }}
              />
            ))}
          </div>
        </div>
        <div className="mt-4 space-y-2">
          {[85, 70, 55].map((w) => (
            <div key={w} className="h-2.5 rounded bg-secondary" style={{ width: `${w}%` }} />
          ))}
        </div>
      </motion.div>

      <motion.div {...float(0)} className="absolute -left-6 top-10 flex items-center gap-2 rounded-xl border bg-card px-3 py-2 shadow-lg">
        <Code2 className="h-5 w-5 text-brand-blue dark:text-blue-400" /> <span className="text-sm font-semibold">Custom Software</span>
      </motion.div>
      <motion.div {...float(1.2)} className="absolute -right-4 top-1/3 flex items-center gap-2 rounded-xl border bg-card px-3 py-2 shadow-lg">
        <Cloud className="h-5 w-5 text-brand-teal" /> <span className="text-sm font-semibold">Cloud Ready</span>
      </motion.div>
      <motion.div {...float(2.4)} className="absolute -bottom-5 left-10 flex items-center gap-2 rounded-xl border bg-card px-3 py-2 shadow-lg">
        <ShieldCheck className="h-5 w-5 text-emerald-500" /> <span className="text-sm font-semibold">Secured 24/7</span>
      </motion.div>
    </div>
  );
}
