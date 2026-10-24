import { Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";
import { site } from "@/content/site";

const items = [
  { href: site.social.linkedin, label: "LinkedIn", Icon: Linkedin },
  { href: site.social.facebook, label: "Facebook", Icon: Facebook },
  { href: site.social.instagram, label: "Instagram", Icon: Instagram },
  { href: site.social.x, label: "X (Twitter)", Icon: Twitter },
  { href: site.social.youtube, label: "YouTube", Icon: Youtube },
];

export function SocialIcons({ className }: { className?: string }) {
  return (
    <ul className={className ?? "flex gap-2"}>
      {items.map(({ href, label, Icon }) => (
        <li key={label}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${site.name} on ${label}`}
            className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-brand-teal hover:text-slate-950"
          >
            <Icon className="h-4 w-4" aria-hidden="true" />
          </a>
        </li>
      ))}
    </ul>
  );
}
