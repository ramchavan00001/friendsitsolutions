"use client";
import dynamic from "next/dynamic";

// Loaded after hydration so the chat bundle never blocks first paint.
const ChatWidget = dynamic(() => import("./chat-widget"), { ssr: false });

export function LazyWidgets() {
  return <ChatWidget />;
}
