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
          background: "linear-gradient(135deg, #1E3A8A 0%, #1e40af 55%, #0F766E 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 36, fontWeight: 700 }}>
          <div style={{ width: 64, height: 64, borderRadius: 14, background: "#14B8A6", display: "flex", alignItems: "center", justifyContent: "center", color: "#0f172a", fontWeight: 800 }}>F</div>
          <div style={{ display: "flex" }}>
            <span>Friends</span>
            <span style={{ color: "#5eead4" }}>IT</span>
            <span>Solutions</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {kicker && <div style={{ fontSize: 28, color: "#99f6e4", textTransform: "uppercase", letterSpacing: 2 }}>{kicker}</div>}
          <div style={{ fontSize: title.length > 60 ? 56 : 68, fontWeight: 800, lineHeight: 1.1 }}>{title}</div>
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#bfdbfe" }}>
          {`${site.tagline} · ${site.url.replace(/^https?:\/\//, "")}`}
        </div>
      </div>
    ),
    ogSize,
  );
}
