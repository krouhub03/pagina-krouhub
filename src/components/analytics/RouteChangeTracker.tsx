"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { getCurrentPagePath, track } from "@/lib/tracking";

export default function RouteChangeTracker() {
  const pathname = usePathname();
  const previousPathRef = useRef<string | null>(null);

  useEffect(() => {
    const currentPath = getCurrentPagePath();
    if (!currentPath) {
      return;
    }

    track("page_view", {
      page_path: currentPath,
      page_title: document.title || "",
      previous_path: previousPathRef.current,
      referrer: document.referrer || "",
    });

    previousPathRef.current = currentPath;
  }, [pathname]);

  return null;
}
