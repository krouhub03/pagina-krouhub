"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Script from "next/script";
import Link from "next/link";
import { Star, Check, ArrowRight, ArrowLeft, Send, Sparkles, Loader2, Home, AlertCircle, CheckCircle2 } from "lucide-react";

// --- Sub-components (Sin cambios) ---

const StarRating = ({ value, onChange }: { value: number; onChange: (val: number) => void }) => {
    const [hover, setHover] = useState(0);
    return (
        <div className="flex gap-2 justify-center my-4">
            {[1, 2, 3, 4, 5].map((star) => (
                <button
                    key={star}
                    type="button"
                    onClick={() => onChange(star)}
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(0)}
                    className="transition-transform active:scale-90"
                >
                    <Star
                        size={32}
                        className={`${(hover || value) >= star ? "fill-cyan-400 text-cyan-400" : "text-gray-600"} transition-colors`}
                    />
                </button>
            ))}
        </div>
    );
};

const ScaleRating = ({ value, onChange, max = 5, labels }: { value: number; onChange: (val: number) => void, max?: number, labels?: { [key: number]: string } }) => {
    const start = max === 11 ? 0 : 1;
    const count = max === 11 ? 11 : 5;

    return (
        <div className="flex flex-col gap-2 my-4">
            <div className="flex flex-wrap justify-center gap-2">
                {Array.from({ length: count }, (_, i) => i + start).map((num) => (
                    <button
                        key={num}
                        type="button"
                        onClick={() => onChange(num)}
                        className={`w-10 h-10 rounded-lg border transition-all flex items-center justify-center font-bold ${value === num
                            ? "bg-cyan-500 border-cyan-400 text-white shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                            : "bg-white/5 border-white/10 text-gray-400 hover:border-white/30"
                            }`}
                    >
                        {num}
                    </button>
                ))}
            </div>
            {labels && (
                <div className="flex justify-between text-xs text-gray-500 px-1 mt-1 font-medium italic">
                    <span>{labels[start]}</span>
                    <span>{labels[max === 11 ? 10 : max]}</span>
                </div>
            )}
        </div>
    );
};

// --- Main Form Component ---

interface EncuestaWebProps {
    surveyId?: string;
    userName?: string;
    userId?: string;
    userEmail?: string;
}

export default function EncuestaWeb({ userName, userId, surveyId, userEmail }: EncuestaWebProps) {
    const name = userName || "Cliente";

    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState({
        q1: 0, q2: 0, q3: 0, q4: 0, q5: "", q6: -1, q7: [] as string[], q8: "",
    });

    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        return () => {
            const badge = document.querySelector('.grecaptcha-badge');
            if (badge && badge.parentElement) badge.parentElement.removeChild(badge);
        };
    }, []);

    const updateField = (field: string, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const toggleCheckbox = (value: string) => {
        const current = formData.q7;
        if (current.includes(value)) {
            updateField("q7", current.filter(item => item !== value));
        } else {
            updateField("q7", [...current, value]);
        }
    };

    const nextStep = () => setStep(s => Math.min(s + 1, 8));
    const prevStep = () => setStep(s => Math.max(s - 1, 0));

    // Corrección 1: handleFormSubmit ahora no recibe evento de formulario, sino que se invoca manualmente
    const handleFinalSubmit = async () => {
        // Validación extra: Si no estamos en el paso final, no enviamos nada.
        if (step < 8) return;

        setStatus("loading");
        setErrorMessage("");

        try {
            const siteKey = "6Ldg3EgsAAAAAFMJ1c9b5fA-MswgA2EbKpyxnrps";

            const tokenPromise = new Promise<string | null>((resolve) => {
                const grecaptcha = (window as any).grecaptcha;
                if (!grecaptcha || !grecaptcha.enterprise) {
                    resolve(null);
                    return;
                }
                grecaptcha.enterprise.ready(async () => {
                    try {
                        const t = await grecaptcha.enterprise.execute(siteKey, { action: 'submit_survey' });
                        resolve(t);
                    } catch (err) {
                        resolve(null);
                    }
                });
            });

            const timeoutPromise = new Promise<null>((resolve) => setTimeout(() => resolve(null), 4000));
            const token = await Promise.race([tokenPromise, timeoutPromise]);

            const apiPayload = {
                userName: name,
                userId: userId,
                userEmail: userEmail,
                surveyId: surveyId,
                answers: formData,
                recaptchaToken: token
            };

            const response = await fetch("/api/survey", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(apiPayload),
            });

            if (response.ok) {
                setStatus("success");
            } else {
                const data = await response.json();
                throw new Error(data.error || "Error al enviar la encuesta");
            }

        } catch (error: any) {
            console.error("Error envío encuesta:", error);
            setStatus("error");
            setErrorMessage(error.message || "Ocurrió un error. Intenta de nuevo.");
        }
    };

    if (status === "success") {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-xl mx-auto text-center min-h-[80vh] flex flex-col justify-center px-6"
            >
                <div className="w-20 h-20 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-cyan-500/30 ring-1 ring-cyan-500/50">
                    <CheckCircle2 size={40} className="text-cyan-400" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">¡Muchas gracias, {name}!</h2>
                <p className="text-gray-400 text-lg mb-10">
                    Tu opinión es fundamental para nosotros. Seguiremos trabajando para ofrecerte el mejor servicio posible.
                </p>
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                    <Link href="/" className="inline-flex items-center gap-2 px-8 py-3 bg-cyan-600 hover:bg-cyan-500 border border-transparent rounded-xl text-white font-semibold transition-all shadow-lg shadow-cyan-900/20">
                        <Home size={18} />
                        Volver al inicio
                    </Link>
                </motion.div>
            </motion.div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-6 min-h-[100vh] flex flex-col justify-center py-12 relative">
            <Script src="https://www.google.com/recaptcha/enterprise.js?render=6Ldg3EgsAAAAAFMJ1c9b5fA-MswgA2EbKpyxnrps" strategy="afterInteractive" />

            {status === "error" && (
                <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-red-500/10 border border-red-500/20 p-4 rounded-xl flex items-center gap-3 text-red-400 text-sm shadow-xl backdrop-blur-md">
                    <AlertCircle size={18} />
                    <span>{errorMessage}</span>
                    <button onClick={() => setStatus("idle")} className="ml-2 underline hover:text-red-300">Reintentar</button>
                </div>
            )}

            <header className="mb-12 text-center">
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-widest mb-4">
                    <Sparkles size={12} />
                    Feedback Experience
                </motion.div>
            </header>

            <div className="w-full h-1 bg-white/5 rounded-full mb-12 overflow-hidden">
                <motion.div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500" animate={{ width: `${(step / 8) * 100}%` }} />
            </div>

            {/* Corrección 2: Bloqueamos totalmente el envío nativo del formulario */}
            <form onSubmit={(e) => e.preventDefault()} className="space-y-12">
                <AnimatePresence mode="wait">

                    {/* ... STEPS 0 AL 7 IGUAL QUE ANTES (Copiados abajo resumidos) ... */}
                    {step === 0 && (
                        <motion.div key="step0" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="text-center space-y-8 py-10">
                            <h2 className="text-5xl font-bold text-white mb-6">¡Hola, {name}!</h2>
                            <p className="text-xl text-gray-400 leading-relaxed max-w-lg mx-auto">
                                Ha sido un placer trabajar en el desarrollo de tu sitio web. Para mejorar constantemente mis servicios en <span className="text-cyan-400 font-semibold">Brayan</span>, me encantaría conocer tu opinión sincera. No te tomará más de 3 minutos.
                            </p>
                            <div className="pt-6">
                                <button type="button" onClick={nextStep} className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-10 py-4 rounded-2xl font-bold transition-all hover:scale-105 shadow-[0_0_30px_rgba(6,182,212,0.3)]">
                                    Comenzar Encuesta
                                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {step === 1 && (<motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-10"><div className="text-center space-y-4"><span className="text-cyan-400 text-sm font-bold tracking-widest uppercase">Sección 1: Impacto y Diseño</span><h3 className="text-2xl font-bold text-white">1. ¿Qué tanto sientes que el diseño final refleja la identidad y valores de tu marca?</h3><ScaleRating value={formData.q1} onChange={(val) => updateField("q1", val)} labels={{ 1: "Nada", 5: "Totalmente" }} /></div></motion.div>)}
                    {step === 2 && (<motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-10"><div className="text-center space-y-4"><span className="text-cyan-400 text-sm font-bold tracking-widest uppercase">Sección 1: Impacto y Diseño</span><h3 className="text-2xl font-bold text-white">2. ¿Consideras que la navegación del sitio es intuitiva y fácil de usar para tus clientes finales?</h3><ScaleRating value={formData.q2} onChange={(val) => updateField("q2", val)} labels={{ 1: "Muy difícil", 5: "Muy fácil" }} /></div></motion.div>)}
                    {step === 3 && (<motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-10"><div className="text-center space-y-4"><span className="text-cyan-400 text-sm font-bold tracking-widest uppercase">Sección 1: Impacto y Diseño</span><h3 className="text-2xl font-bold text-white">3. ¿Cómo calificarías el rendimiento y la velocidad de carga del sitio en dispositivos móviles y escritorio?</h3><ScaleRating value={formData.q3} onChange={(val) => updateField("q3", val)} labels={{ 1: "Lento", 5: "Excelente" }} /></div></motion.div>)}
                    {step === 4 && (<motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-10"><div className="text-center space-y-4"><span className="text-cyan-400 text-sm font-bold tracking-widest uppercase">Sección 2: Gestión del Proyecto</span><h3 className="text-2xl font-bold text-white">4. ¿Cómo calificarías la comunicación (claridad, tiempos de respuesta y disposición) durante el proceso?</h3><StarRating value={formData.q4} onChange={(val) => updateField("q4", val)} /></div></motion.div>)}
                    {step === 5 && (
                        <motion.div key="step5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-10">
                            <div className="text-center space-y-4">
                                <span className="text-cyan-400 text-sm font-bold tracking-widest uppercase">Sección 2: Gestión del Proyecto</span>
                                <h3 className="text-2xl font-bold text-white">5. Respecto a los tiempos de entrega acordados:</h3>
                                <div className="grid gap-3 max-w-md mx-auto text-left">
                                    {["Se cumplieron puntualmente.", "Hubo retrasos mínimos, pero bien justificados.", "No se cumplieron los plazos."].map((opt) => (
                                        <label key={opt} className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${formData.q5 === opt ? "bg-cyan-500/10 border-cyan-500/50" : "bg-white/5 border-white/10 hover:border-white/30"}`}>
                                            <input type="radio" name="q5" className="hidden" checked={formData.q5 === opt} onChange={() => updateField("q5", opt)} />
                                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${formData.q5 === opt ? "border-cyan-400" : "border-gray-600"}`}>
                                                {formData.q5 === opt && <div className="w-2.5 h-2.5 bg-cyan-400 rounded-full" />}
                                            </div>
                                            <span className={formData.q5 === opt ? "text-white font-medium" : "text-gray-400"}>{opt}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}
                    {step === 6 && (<motion.div key="step6" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-10"><div className="text-center space-y-4 pt-6"><span className="text-cyan-400 text-sm font-bold tracking-widest uppercase">Sección 3: Recomendación (NPS)</span><h3 className="text-2xl font-bold text-white">6. En una escala del 0 al 10, ¿qué tan probable es que recomiendes mis servicios a un colega o empresa?</h3><ScaleRating value={formData.q6} onChange={(val) => updateField("q6", val)} max={11} labels={{ 0: "Nada probable", 10: "Muy probable" }} /></div></motion.div>)}
                    {step === 7 && (
                        <motion.div key="step7" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-10">
                            <div className="text-center space-y-8 pt-6">
                                <div className="space-y-2">
                                    <span className="text-cyan-400 text-sm font-bold tracking-widest uppercase">Sección 3: Recomendación y Futuro</span>
                                    <h3 className="text-3xl font-bold text-white max-w-xl mx-auto">7. ¿Qué otros servicios te gustaría integrar en el futuro para seguir creciendo?</h3>
                                    <p className="text-sm text-gray-500">(Puedes marcar varios)</p>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-left max-w-4xl mx-auto">
                                    {["Mantenimiento web mensual.", "Optimización SEO avanzada.", "Creación de landing pages para campañas.", "Integración de pasarelas de pago o e-commerce.", "Formación para gestionar mi propio contenido."].map((opt) => (
                                        <label key={opt} className={`group flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${formData.q7.includes(opt) ? "bg-cyan-500/10 border-cyan-500/50" : "bg-white/5 border-white/10 hover:border-white/30"}`}>
                                            <input type="checkbox" className="hidden" checked={formData.q7.includes(opt)} onChange={() => toggleCheckbox(opt)} />
                                            <div className={`flex-shrink-0 w-5 h-5 rounded border flex items-center justify-center transition-colors ${formData.q7.includes(opt) ? "bg-cyan-500 border-cyan-400" : "border-gray-600 group-hover:border-gray-400"}`}>
                                                {formData.q7.includes(opt) && <Check size={14} className="text-white" />}
                                            </div>
                                            <span className={`text-sm leading-tight ${formData.q7.includes(opt) ? "text-white font-medium" : "text-gray-400"}`}>{opt}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {step === 8 && (
                        <motion.div key="step8" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-10">
                            <div className="text-center space-y-4">
                                <span className="text-cyan-400 text-sm font-bold tracking-widest uppercase">Sección 4: Testimonio</span>
                                <h3 className="text-2xl font-bold text-white">8. ¿Podrías describir brevemente qué fue lo que más te gustó de trabajar conmigo y qué problema principal resolvimos con esta web?</h3>
                                {/* IMPORTANTE: En este textarea ahora puedes presionar ENTER libremente 
                                    porque el formulario tiene e.preventDefault() en onSubmit 
                                */}
                                <textarea
                                    className="w-full h-40 bg-white/5 border border-white/10 rounded-2xl p-6 text-white placeholder:text-gray-600 focus:outline-none focus:border-cyan-500/50 transition-colors resize-none"
                                    placeholder="Tu activo más valioso..."
                                    value={formData.q8}
                                    onChange={(e) => updateField("q8", e.target.value)}
                                />
                                <p className="text-xs text-gray-500 italic mt-2">Nota: Al responder esto, nos autorizas a compartir tu comentario como testimonio en nuestro portafolio/redes sociales.</p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className={`justify-between items-center pt-8 border-t border-white/5 ${step === 0 ? "hidden" : "flex"}`}>
                    <button
                        type="button"
                        onClick={prevStep}
                        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                    >
                        <ArrowLeft size={18} />
                        {step === 1 ? "Volver al inicio" : "Anterior"}
                    </button>

                    {step < 8 ? (
                        <button
                            type="button"
                            onClick={nextStep}
                            disabled={(step === 1 && !formData.q1) || (step === 2 && !formData.q2) || (step === 3 && !formData.q3) || (step === 4 && !formData.q4) || (step === 5 && !formData.q5) || (step === 6 && formData.q6 === -1)}
                            className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(6,182,212,0.2)] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Siguiente
                            <ArrowRight size={18} />
                        </button>
                    ) : (
                        <button
                            type="button"  // CORRECCIÓN 3: ES TYPE="BUTTON" (No submit)
                            onClick={handleFinalSubmit} // Acción manual
                            disabled={status === "loading"}
                            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-10 py-3 rounded-xl font-bold transition-all shadow-[0_0_25px_rgba(6,182,212,0.3)] hover:scale-105 disabled:opacity-70 disabled:cursor-wait"
                        >
                            {status === "loading" ? <><Loader2 size={18} className="animate-spin" /> Enviando...</> : <>Enviar Encuesta <Send size={18} /></>}
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}