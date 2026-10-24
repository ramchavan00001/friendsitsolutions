import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const ogSize = { width: 1200, height: 630 };

/** Branded Open Graph image used site-wide and per blog post. */
export function ogImage({ title, kicker }: { title: string; kicker?: string }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#123A2C",
          color: "#F4F1E8",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 34, fontWeight: 500 }}>
          <div style={{ width: 60, height: 60, borderRadius: 999, border: "2px solid #C9A24B", display: "flex", alignItems: "center", justifyContent: "center", color: "#C9A24B", fontWeight: 500 }}>F</div>
          <div style={{ display: "flex" }}>
            <span>FriendsIT Solutions</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {kicker && <div style={{ fontSize: 28, color: "#C9A24B", textTransform: "uppercase", letterSpacing: 6 }}>{kicker}</div>}
          <div style={{ fontSize: title.length > 60 ? 56 : 68, fontWeight: 300, lineHeight: 1.1 }}>{title}</div>
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#B9C7BE" }}>
          {`${site.tagline} · ${site.url.replace(/^https?:\/\//, "")}`}
        </div>
      </div>
    ),
    ogSize,
  );
}
