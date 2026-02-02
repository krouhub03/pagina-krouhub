//src\app\servicios\page.tsx
import { Metadata } from "next";
import ServicesContent from "@/components/sections/ServicesContent";

export const metadata: Metadata = {
  title: "Nuestros Servicios | KrouHub",
  description: "Explora nuestros servicios de Desarrollo Web, Marketing Digital y Automatización con Inteligencia Artificial.",
};

export default function Page() {
  return <ServicesContent />;
}