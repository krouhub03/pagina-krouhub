"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { getCurrentPagePath, track } from "@/lib/tracking";

const THRESHOLDS = [25, 50, 75, 90];

export default function ScrollDepthTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams.toString();
  const firedThresholds = useRef<Set<number>>(new Set());

  useEffect(() => {
    firedThresholds.current.clear();

    const onScroll = () => {
      const doc = document.documentElement;
      const maxScrollable = doc.scrollHeight - doc.clientHeight;
      if (maxScrollable <= 0) {
        return;
      }

      const percent = Math.round((window.scrollY / maxScrollable) * 100);

      for (const threshold of THRESHOLDS) {
        if (percent >= threshold && !firedThresholds.current.has(threshold)) {
          firedThresholds.current.add(threshold);
          track("scroll_depth", {
            percent: threshold,
            page_path: getCurrentPagePath(),
          });
        }
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [pathname, search]);

  return null;
}
