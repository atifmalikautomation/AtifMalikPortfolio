"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { noteInteraction, track, trackingAllowed } from "@/lib/tracker-client";

const HEARTBEAT_VISIBLE_MS = 15_000;
const HEARTBEAT_HIDDEN_MS = 30_000;

/**
 * Invisible presence + page-view tracker for the public site (renders nothing).
 * Sends: page_view on every route change, heartbeat while the tab is open,
 * idle/active on visibility changes, page_exit on unload.
 */
export function VisitorTracker() {
  const pathname = usePathname();
  const lastBeat = useRef(0);

  // Page views (initial load + client-side navigations)
  useEffect(() => {
    if (!pathname || !trackingAllowed()) return;
    // Small delay so document.title reflects the new page
    const t = setTimeout(() => {
      track([{ t: "page_view", p: pathname, ti: document.title }]);
      lastBeat.current = Date.now();
    }, 300);
    return () => clearTimeout(t);
  }, [pathname]);

  // Heartbeat, visibility, interaction, unload — set up once
  useEffect(() => {
    if (!trackingAllowed()) return;

    const beat = () => {
      const hidden = document.visibilityState !== "visible";
      const every = hidden ? HEARTBEAT_HIDDEN_MS : HEARTBEAT_VISIBLE_MS;
      if (Date.now() - lastBeat.current < every - 1000) return;
      lastBeat.current = Date.now();
      track([{ t: "heartbeat", p: location.pathname }]);
    };
    const interval = setInterval(beat, 5_000);

    let lastMove = 0;
    const onInteract = (e: Event) => {
      if (e.type === "mousemove") {
        const now = Date.now();
        if (now - lastMove < 2000) return;
        lastMove = now;
      }
      noteInteraction();
    };
    const opts = { passive: true } as AddEventListenerOptions;
    const evs = ["pointerdown", "keydown", "scroll", "touchstart", "mousemove"];
    evs.forEach((ev) => window.addEventListener(ev, onInteract, opts));

    const onVisibility = () => {
      lastBeat.current = Date.now();
      if (document.visibilityState === "visible") {
        noteInteraction();
        track([{ t: "active", p: location.pathname }]);
      } else {
        track([{ t: "idle", p: location.pathname }], { beacon: true });
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    const onPageHide = () => track([{ t: "page_exit", p: location.pathname }], { beacon: true });
    window.addEventListener("pagehide", onPageHide);

    return () => {
      clearInterval(interval);
      evs.forEach((ev) => window.removeEventListener(ev, onInteract));
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pagehide", onPageHide);
    };
  }, []);

  return null;
}
