import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  as: Tag = "h2",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "center" | "left";
  className?: string;
  as?: "h1" | "h2";
}) {
  return (
    <div className={cn("mb-10 max-w-3xl md:mb-14", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && <p className="eyebrow mb-5">{eyebrow}</p>}
      <Tag className="display text-[34px] md:text-5xl lg:text-[56px]">{title}</Tag>
      {description && <p className="mt-5 text-lg font-light text-muted-foreground">{description}</p>}
    </div>
  );
}
