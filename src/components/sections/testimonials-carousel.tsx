"use client";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { TestimonialCard } from "./cards";
import { Button } from "@/components/ui/button";
import type { Testimonial } from "@/content/types";
import { cn } from "@/lib/utils";

export function TestimonialsCarousel({ items }: { items: Testimonial[] }) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [perPage, setPerPage] = useState(3);
  const pages = Math.ceil(items.length / perPage);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => {
      setPerPage(mq.matches ? 3 : 1);
      setIndex(0);
    };
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!playing || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % pages), 7000);
    return () => clearInterval(t);
  }, [playing, pages]);

  const go = (d: number) => setIndex((i) => (i + d + pages) % pages);

  return (
    <div role="region" aria-roledescription="carousel" aria-label="Client testimonials">
      <div className="overflow-hidden">
        <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${index * 100}%)` }}>
          {Array.from({ length: pages }).map((_, p) => (
            <div
              key={p}
              role="group"
              aria-roledescription="slide"
              aria-label={`${p + 1} of ${pages}`}
              aria-hidden={p !== index}
              className="grid w-full shrink-0 gap-5 md:grid-cols-3"
            >
              {items.slice(p * perPage, p * perPage + perPage).map((t) => (
                <TestimonialCard key={t.id} t={t} />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-8 flex items-center justify-center gap-3">
        <Button variant="outline" size="icon" onClick={() => go(-1)} aria-label="Previous testimonials"><ChevronLeft /></Button>
        <div className="flex">
          {Array.from({ length: pages }).map((_, p) => (
            <button
              key={p}
              type="button"
              onClick={() => setIndex(p)}
              aria-label={`Show testimonials ${p + 1}`}
              aria-current={p === index}
              className="grid h-11 min-w-6 place-items-center px-1"
            >
              <span className={cn("block h-2.5 rounded-full transition-all", p === index ? "w-8 bg-gold" : "w-2.5 bg-sage-dark dark:bg-forest-light")} />
            </button>
          ))}
        </div>
        <Button variant="outline" size="icon" onClick={() => go(1)} aria-label="Next testimonials"><ChevronRight /></Button>
        <Button variant="ghost" size="icon" onClick={() => setPlaying((v) => !v)} aria-label={playing ? "Pause auto-rotation" : "Start auto-rotation"}>
          {playing ? <Pause /> : <Play />}
        </Button>
      </div>
    </div>
  );
}
