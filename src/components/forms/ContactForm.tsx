"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Script from "next/script";
import { Send, User, Mail, MessageSquare, Phone, CheckCircle2, Loader2, AlertCircle } from "lucide-react";

export default function ContactForm() {
    // Estado del formulario (Tus variables en Español)
    const [formData, setFormData] = useState({
        nombre: "",
        email: "",
        telefono: "",
        servicio: "Desarrollo y Diseño Web",
        mensaje: ""
    });

    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");

    // Limpiar badge de reCAPTCHA cuando el componente se desmonte
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
            // --- RECAPTCHA ENTERPRISE ---
            const siteKey = "6Ldg3EgsAAAAAFMJ1c9b5fA-MswgA2EbKpyxnrps";

            // Esperar a que grecaptcha esté listo
            const token = await new Promise<string>((resolve, reject) => {
                const grecaptcha = (window as any).grecaptcha;
                if (!grecaptcha || !grecaptcha.enterprise) {
                    reject(new Error("reCAPTCHA not loaded"));
                    return;
                }

                grecaptcha.enterprise.ready(async () => {
                    try {
                        const token = await grecaptcha.enterprise.execute(siteKey, { action: 'submit' });
                        resolve(token);
                    } catch (err) {
                        reject(err);
                    }
                });
            });

            // AQUÍ ESTÁ LA CORRECCIÓN:
            // Convertimos tus datos (español) a lo que espera la API (inglés)
            const apiPayload = {
                name: formData.nombre,
                email: formData.email,
                phone: formData.telefono,
                subject: formData.servicio,
                message: formData.mensaje,
                recaptchaToken: token // Enviamos el token para su verificación
            };

            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(apiPayload), // Enviamos el payload traducido
            });

            if (response.ok) {
                setStatus("success");
                setFormData({
                    nombre: "",
                    email: "",
                    telefono: "",
                    servicio: "Desarrollo y Diseño Web",
                    mensaje: ""
                });
            } else {
                const data = await response.json();
                throw new Error(data.error || "Error al enviar el mensaje");
            }
        } catch (error: any) {
            console.error("Error:", error);
            setStatus("error");
            setErrorMessage(error.message || "Algo salió mal. Por favor intenta de nuevo.");
        }
    };

    if (status === "success") {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-[#0B0F19]/80 backdrop-blur-3xl border border-cyan-500/20 p-10 rounded-[32px] text-center"
            >
                <div className="w-20 h-20 bg-cyan-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="text-cyan-400" size={40} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">¡Mensaje Enviado!</h3>
                <p className="text-gray-400 mb-8">
                    Gracias por contactarnos. Hemos recibido tu mensaje correctamente.
                </p>
                <button
                    onClick={() => setStatus("idle")}
                    className="text-cyan-400 font-semibold hover:text-cyan-300 transition-colors"
                >
                    Enviar otro mensaje
                </button>
            </motion.div>
        );
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="relative bg-[#0B0F19]/80 backdrop-blur-3xl border border-white/10 p-6 md:p-10 rounded-[24px] lg:rounded-[32px] space-y-4 md:space-y-5 shadow-xl"
        >
            <Script
                src="https://www.google.com/recaptcha/enterprise.js?render=6Ldg3EgsAAAAAFMJ1c9b5fA-MswgA2EbKpyxnrps"
                strategy="afterInteractive"
            />
            {status === "error" && (
                <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl flex items-center gap-3 text-red-400 text-sm">
                    <AlertCircle size={18} />
                    <span>{errorMessage}</span>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                <div className="space-y-1.5">
                    <label className="text-[9px] lg:text-[10px] font-mono text-gray-500 uppercase tracking-widest ml-1">Nombre</label>
                    <div className="relative group">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-cyan-400 transition-colors" size={16} />
                        <input
                            required
                            type="text"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            placeholder="Tu nombre"
                            className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder:text-gray-700 focus:outline-none focus:border-cyan-500/40 transition-all text-sm"
                        />
                    </div>
                </div>

                <div className="space-y-1.5">
                    <label className="text-[9px] lg:text-[10px] font-mono text-gray-500 uppercase tracking-widest ml-1">Teléfono</label>
                    <div className="relative group">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-cyan-400 transition-colors" size={16} />
                        <input
                            required
                            type="tel"
                            name="telefono"
                            value={formData.telefono}
                            onChange={handleChange}
                            placeholder="+34..."
                            className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder:text-gray-700 focus:outline-none focus:border-cyan-500/40 transition-all text-sm"
                        />
                    </div>
                </div>
            </div>

            <div className="space-y-1.5">
                <label className="text-[9px] lg:text-[10px] font-mono text-gray-500 uppercase tracking-widest ml-1">Email</label>
                <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-purple-400 transition-colors" size={16} />
                    <input
                        required
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="email@empresa.com"
                        className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder:text-gray-700 focus:outline-none focus:border-purple-500/40 transition-all text-sm"
                    />
                </div>
            </div>

            <div className="space-y-1.5">
                <label className="text-[9px] lg:text-[10px] font-mono text-gray-500 uppercase tracking-widest ml-1">¿Qué necesitas?</label>
                <select
                    name="servicio"
                    value={formData.servicio}
                    onChange={handleChange}
                    className="w-full bg-[#0B0F19] border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-white/20 transition-all text-sm appearance-none cursor-pointer"
                >
                    <option>Desarrollo y Diseño Web</option>
                    <option>Marketing y Growth</option>
                    <option>Automatizaciones</option>
                </select>
            </div>

            <div className="space-y-1.5">
                <label className="text-[9px] lg:text-[10px] font-mono text-gray-500 uppercase tracking-widest ml-1">Mensaje</label>
                <div className="relative group">
                    <MessageSquare className="absolute left-4 top-3 text-gray-600 group-focus-within:text-white transition-colors" size={16} />
                    <textarea
                        required
                        name="mensaje"
                        value={formData.mensaje}
                        onChange={handleChange}
                        rows={4}
                        placeholder="Cuéntanos un poco..."
                        className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder:text-gray-700 focus:outline-none focus:border-white/20 transition-all resize-none text-sm"
                    ></textarea>
                </div>
            </div>

            <motion.button
                disabled={status === "loading"}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-gradient-to-r from-cyan-600 to-indigo-600 p-[1px] rounded-xl overflow-hidden mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <div className="w-full h-full bg-[#0B0F19]/90 py-3.5 rounded-[11px] flex items-center justify-center gap-2">
                    {status === "loading" ? (
                        <>
                            <Loader2 size={16} className="text-white animate-spin" />
                            <span className="text-white font-bold text-sm tracking-wide">Enviando...</span>
                        </>
                    ) : (
                        <>
                            <span className="text-white font-bold text-sm tracking-wide">Comenzar Ahora</span>
                            <Send size={16} className="text-white" />
                        </>
                    )}
                </div>
            </motion.button>
        </form>
    );
}