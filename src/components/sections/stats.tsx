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

/** Deep green strip of key numbers with thin gold figures. */
export function Stats({ items }: { items: { value: number; suffix?: string; label: string; animate?: boolean }[] }) {
  return (
    <section aria-label="Company statistics" className="bg-deep text-cream">
      <div className="container">
        <dl className="grid grid-cols-2 md:grid-cols-5">
          {items.map((s, i) => (
            <div
              key={s.label}
              className={`flex flex-col-reverse py-10 md:px-6 ${i > 0 ? "md:border-l md:border-forest-light" : "md:pl-0"}`}
            >
              <dt className="mt-1 text-sm font-light tracking-[0.06em] text-[#B9C7BE]">{s.label}</dt>
              <dd className="text-5xl font-extralight leading-none text-gold md:text-[52px]">
                {s.animate === false ? `${s.value}${s.suffix ?? ""}` : <Counter to={s.value} suffix={s.suffix} />}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
