import { Outfit } from "next/font/google";
import "../globals.css";

const outfit = Outfit({ subsets: ["latin"], weight: ["300", "400", "500", "600"], variable: "--font-outfit", display: "swap" });

export const metadata = { title: "Admin Dashboard — FriendsITSolutions", robots: { index: false, follow: false } };

/** Standalone root layout: the admin area is English-only and outside the [locale] tree. */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={outfit.variable}>
      <body className="min-h-screen bg-background font-sans text-foreground">
        <header className="bg-deep px-6 py-4 text-cream">
          <span className="font-medium tracking-wide">FriendsIT Solutions · Admin</span>
        </header>
        {children}
      </body>
    </html>
  );
}
