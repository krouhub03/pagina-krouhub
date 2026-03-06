"use client";

import dynamic from "next/dynamic";

const ConsentBanner = dynamic(() => import("./ConsentBanner"), {
  ssr: false,
});

export default function ClientOnlyConsentBanner() {
  return <ConsentBanner />;
}
