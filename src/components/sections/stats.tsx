"use client";
import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(reduce ? to : 0);
  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, to, { duration: 1.6, ease: "easeOut", onUpdate: (v) => setValue(Math.round(v)) });
    return () => controls.stop();
  }, [inView, reduce, to]);
  return (
    <span ref={ref}>
      {value.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}

export function Stats({ items }: { items: { value: number; suffix?: string; label: string }[] }) {
  return (
    <section aria-label="Company statistics" className="py-14">
      <div className="container">
        <dl className="grid grid-cols-2 gap-6 md:grid-cols-5">
          {items.map((s) => (
            <div key={s.label} className="flex flex-col-reverse rounded-2xl border bg-card p-6 text-center shadow-sm">
              <dt className="mt-1 text-sm text-muted-foreground">{s.label}</dt>
              <dd className="font-heading text-3xl font-extrabold text-primary dark:text-accent md:text-4xl">
                <Counter to={s.value} suffix={s.suffix} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
