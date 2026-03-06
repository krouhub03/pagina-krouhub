"use client";

import Link from "next/link";
import { useState } from "react";
import { CONSENT_STORAGE_KEY, setConsent, type ConsentState } from "@/lib/tracking";

const acceptedConsent: ConsentState = {
  analytics: true,
  ads: true,
  adUserData: true,
  adPersonalization: true,
};

const rejectedConsent: ConsentState = {
  analytics: false,
  ads: false,
  adUserData: false,
  adPersonalization: false,
};

function persistConsent(consent: ConsentState): void {
  localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(consent));
  setConsent(consent);
}

export default function ConsentBanner() {
  const [isVisible, setIsVisible] = useState<boolean>(() => {
    if (typeof window === "undefined") {
      return false;
    }

    const saved = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!saved) {
      return true;
    }

    try {
      JSON.parse(saved);
      return false;
    } catch {
      return true;
    }
  });

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 z-[120] rounded-2xl border border-border bg-background/95 p-4 shadow-xl backdrop-blur-md md:left-auto md:max-w-xl">
      <p className="text-sm text-foreground">
        Usamos cookies para medir conversiones y mejorar el sitio. Puedes aceptar o rechazar las cookies no esenciales.
      </p>
      <p className="mt-2 text-xs text-muted-foreground">
        Mas detalles en{" "}
        <Link href="/politica-de-privacidad" className="underline hover:text-foreground">
          politica de privacidad
        </Link>
        .
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => {
            persistConsent(acceptedConsent);
            setIsVisible(false);
          }}
          className="rounded-lg bg-cyan-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-cyan-500"
        >
          Aceptar
        </button>
        <button
          type="button"
          onClick={() => {
            persistConsent(rejectedConsent);
            setIsVisible(false);
          }}
          className="rounded-lg border border-border px-3 py-2 text-sm font-semibold text-foreground transition hover:bg-muted"
        >
          Rechazar
        </button>
      </div>
    </div>
  );
}
