"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Script from "next/script";
import { Send, User, Mail, MessageSquare, Phone, CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { sendGTMEvent } from "@next/third-parties/google";

type GrecaptchaEnterprise = {
    ready: (callback: () => void) => void;
    execute: (siteKey: string, options: { action: string }) => Promise<string>;
};

type GrecaptchaWindow = Window & {
    grecaptcha?: {
        enterprise?: GrecaptchaEnterprise;
    };
};

export default function ContactForm() {
    const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "";

    const [formData, setFormData] = useState({
        nombre: "",
        email: "",
        telefono: "",
        servicio: "Desarrollo y Diseño Web",
        mensaje: ""
    });

    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        return () => {
            const badge = document.querySelector('.grecaptcha-badge');
            if (badge && badge.parentElement) {
                badge.parentElement.removeChild(badge);
            }
        };
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");
        setErrorMessage("");

        try {
            const siteKey = recaptchaSiteKey;
            if (!siteKey) throw new Error("Missing reCAPTCHA site key");

            const token = await new Promise<string>((resolve, reject) => {
                const grecaptcha = (window as GrecaptchaWindow).grecaptcha;
                const enterprise = grecaptcha?.enterprise;
                if (!enterprise) {
                    reject(new Error("reCAPTCHA not loaded"));
                    return;
                }
                enterprise.ready(async () => {
                    try {
                        const token = await enterprise.execute(siteKey, { action: "submit" });
                        resolve(token);
                    } catch (err) {
                        reject(err);
                    }
                });
            });

            const apiPayload = {
                name: formData.nombre,
                email: formData.email,
                phone: formData.telefono,
                subject: formData.servicio,
                message: formData.mensaje,
                recaptchaToken: token
            };

            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(apiPayload),
            });

            if (response.ok) {
                sendGTMEvent({
                    event: "form_submit",
                    form_name: "contact_form",
                    lead_type: formData.servicio,
                    page_path: window.location.pathname + window.location.search,
                });
                setStatus("success");
                setFormData({ nombre: "", email: "", telefono: "", servicio: "Desarrollo y Diseño Web", mensaje: "" });
            } else {
                const data = await response.json();
                throw new Error(data.error || "Error al enviar el mensaje");
            }
        } catch (error: unknown) {
            console.error("Error:", error);
            setStatus("error");
            const message = error instanceof Error ? error.message : "Algo salió mal. Por favor intenta de nuevo.";
            setErrorMessage(message);
        }
    };

    if (status === "success") {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-card/80 backdrop-blur-3xl border border-border p-6 rounded-[24px] text-center"
            >
                <div className="w-14 h-14 bg-cyan-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="text-cyan-400" size={28} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">¡Mensaje Enviado!</h3>
                <p className="text-gray-400 text-sm mb-5">
                    Gracias por contactarnos. Hemos recibido tu mensaje correctamente.
                </p>
                <button
                    onClick={() => setStatus("idle")}
                    className="text-cyan-400 text-sm font-semibold hover:text-cyan-300 transition-colors"
                >
                    Enviar otro mensaje
                </button>
            </motion.div>
        );
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="relative bg-card/80 backdrop-blur-md border border-border p-4 md:p-6 rounded-[20px] lg:rounded-[24px] space-y-3 shadow-xl"
        >
            {recaptchaSiteKey ? (
                <Script
                    src={`https://www.google.com/recaptcha/enterprise.js?render=${recaptchaSiteKey}`}
                    strategy="afterInteractive"
                />
            ) : null}

            {status === "error" && (
                <div className="bg-destructive/10 border border-destructive/20 p-3 rounded-lg flex items-center gap-2 text-destructive text-xs">
                    <AlertCircle size={14} />
                    <span>{errorMessage}</span>
                </div>
            )}
    <div id="contactanos" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-1">
                    <label className="text-[8px] font-mono text-muted-foreground uppercase tracking-widest ml-1">Nombre</label>
                    <div className="relative group">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-cyan-500 transition-colors" size={13} />
                        <input
                            required
                            type="text"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            placeholder="Tu nombre"
                            className="w-full bg-background/50 border border-border rounded-lg py-2 pl-9 pr-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-cyan-500/40 transition-all text-xs"
                        />
                    </div>
                </div>

                <div className="space-y-1">
                    <label className="text-[8px] font-mono text-muted-foreground uppercase tracking-widest ml-1">Teléfono</label>
                    <div className="relative group">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-cyan-500 transition-colors" size={13} />
                        <input
                            required
                            type="tel"
                            name="telefono"
                            value={formData.telefono}
                            onChange={handleChange}
                            placeholder="+34..."
                            className="w-full bg-background/50 border border-border rounded-lg py-2 pl-9 pr-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-cyan-500/40 transition-all text-xs"
                        />
                    </div>
                </div>
            </div>

            <div className="space-y-1">
                <label className="text-[8px] font-mono text-muted-foreground uppercase tracking-widest ml-1">Email</label>
                <div className="relative group">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-purple-500 transition-colors" size={13} />
                    <input
                        required
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="email@empresa.com"
                        className="w-full bg-background/50 border border-border rounded-lg py-2 pl-9 pr-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-purple-500/40 transition-all text-xs"
                    />
                </div>
            </div>

            <div className="space-y-1">
                <label className="text-[8px] font-mono text-muted-foreground uppercase tracking-widest ml-1">¿Qué necesitas?</label>
                <select
                    name="servicio"
                    value={formData.servicio}
                    onChange={handleChange}
                    className="w-full bg-background/50 border border-border rounded-lg py-2 px-3 text-foreground focus:outline-none focus:border-border transition-all text-xs appearance-none cursor-pointer"
                >
                    <option>Desarrollo y Diseño Web</option>
                    <option>Automatizaciones</option>
                </select>
            </div>

            <div className="space-y-1">
                <label className="text-[8px] font-mono text-muted-foreground uppercase tracking-widest ml-1">Mensaje</label>
                <div className="relative group">
                    <MessageSquare className="absolute left-3 top-2.5 text-muted-foreground group-focus-within:text-foreground transition-colors" size={13} />
                    <textarea
                        required
                        name="mensaje"
                        value={formData.mensaje}
                        onChange={handleChange}
                        rows={3}
                        placeholder="Cuéntanos un poco..."
                        className="w-full bg-background/50 border border-border rounded-lg py-2 pl-9 pr-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-border transition-all resize-none text-xs"
                    ></textarea>
                </div>
            </div>

            <motion.button
                disabled={status === "loading"}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-gradient-to-r from-cyan-600 to-indigo-600 p-[1px] rounded-lg overflow-hidden mt-1 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <div className="w-full h-full bg-foreground/90 dark:bg-[#0B0F19]/90 py-2.5 rounded-[7px] flex items-center justify-center gap-2">
                    {status === "loading" ? (
                        <>
                            <Loader2 size={13} className="text-background dark:text-white animate-spin" />
                            <span className="text-background dark:text-white font-bold text-xs tracking-wide">Enviando...</span>
                        </>
                    ) : (
                        <>
                            <span className="text-background dark:text-white font-bold text-xs tracking-wide">Comenzar Ahora</span>
                            <Send size={13} className="text-background dark:text-white" />
                        </>
                    )}
                </div>
            </motion.button>
        </form>
    );
}
