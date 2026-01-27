"use client";

import { motion } from "framer-motion";

export default function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen bg-[#020617] text-gray-400 pt-32 pb-20 px-6 sm:px-10 snap-start relative z-10">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-10"
                >
                    <header className="border-b border-white/10 pb-10">
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            POLÍTICA DE TRATAMIENTO DE DATOS PERSONALES
                        </h1>
                        <p className="text-gray-500 text-sm">Versión 1.0 | Última actualización: 26 de enero de 2026</p>
                    </header>

                    <section className="space-y-8 text-sm leading-relaxed text-gray-400">
                        <div>
                            <h2 className="text-xl font-bold text-white mb-4 uppercase tracking-wide">1. IDENTIFICACIÓN DEL RESPONSABLE</h2>
                            <p className="mb-4">
                                <strong>Razón Social:</strong> Krouhub S.A.S. <br />
                                <strong>Domicilio:</strong> Bogotá D.C., Colombia <br />
                                <strong>Correo:</strong> privacidad@krouhub.com
                            </p>
                            <p>
                                Krouhub S.A.S. actúa como Responsable del Tratamiento de los datos personales recopilados en el desarrollo de sus operaciones comerciales (desarrollo de software, marketing digital e Inteligencia Artificial).
                            </p>
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-white mb-4 uppercase tracking-wide">2. MARCO LEGAL</h2>
                            <p className="mb-4">Fundamentado en el derecho al Habeas Data (Artículo 15 de la Constitución Política) y regulado por:</p>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>Ley Estatutaria 1581 de 2012.</li>
                                <li>Decreto Reglamentario 1377 de 2013.</li>
                                <li>Circular Externa 002 de 2024 de la SIC (Inteligencia Artificial).</li>
                                <li>Ley 2300 de 2023 (Contacto comercial).</li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-white mb-4 uppercase tracking-wide">3. FINALIDADES DEL TRATAMIENTO</h2>
                            <p className="mb-4">Los datos se recolectan para las siguientes finalidades específicas:</p>
                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-white font-bold mb-2">Marketing Digital:</h3>
                                    <ul className="list-disc pl-5 space-y-1">
                                        <li>Gestión de leads y envío de propuestas comerciales.</li>
                                        <li>Campañas de remarketing y analítica web.</li>
                                        <li>Comunicaciones promocionales bajo la Ley 2300 de 2023.</li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="text-white font-bold mb-2">Desarrollo de Software:</h3>
                                    <ul className="list-disc pl-5 space-y-1">
                                        <li>Ejecución de contratos y soporte técnico.</li>
                                        <li>Pruebas de calidad (usando preferiblemente datos anonimizados).</li>
                                        <li>Mantenimiento de logs de seguridad.</li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="text-white font-bold mb-2">Inteligencia Artificial:</h3>
                                    <ul className="list-disc pl-5 space-y-1">
                                        <li>Procesamiento de consultas mediante agentes IA.</li>
                                        <li>Mejora de modelos locales (datos anonimizados).</li>
                                        <li>Transparencia algorítmica y supervisión humana.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-white mb-4 uppercase tracking-wide">4. POLÍTICA DE COOKIES</h2>
                            <p className="mb-4">Utilizamos cookies para mejorar la experiencia y analizar el tráfico:</p>
                            <ul className="list-disc pl-5 space-y-2">
                                <li><strong>Necesarias:</strong> Esenciales para el funcionamiento del sitio.</li>
                                <li><strong>Analíticas:</strong> Google Analytics y similares para medir el rendimiento.</li>
                                <li><strong>Publicidad:</strong> Facebook Pixel y otras para anuncios relevantes.</li>
                            </ul>
                            <p className="mt-4">El usuario puede configurar o rechazar las cookies no esenciales a través del banner de consentimiento o la configuración de su navegador.</p>
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-white mb-4 uppercase tracking-wide">5. DERECHOS DE LOS TITULARES (ARCO)</h2>
                            <p className="mb-4">Los titulares de los datos tienen derecho a:</p>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>Conocer, actualizar y rectificar su información.</li>
                                <li>Solicitar prueba de la autorización otorgada.</li>
                                <li>Ser informados sobre el uso dado a sus datos.</li>
                                <li>Revocar la autorización o solicitar la supresión (salvo obligación legal).</li>
                            </ul>
                        </div>

                        <div className="bg-white/[0.03] p-8 rounded-2xl border border-white/10">
                            <h2 className="text-xl font-bold text-white mb-4 uppercase tracking-wide">6. PROCEDIMIENTO DE HABEAS DATA</h2>
                            <p className="mb-4">Para ejercer sus derechos, puede contactarnos en:</p>
                            <p className="text-lg font-bold text-cyan-400 mb-4">privacidad@krouhub.com</p>
                            <div className="grid grid-cols-2 gap-4 text-xs">
                                <div>
                                    <p className="font-bold text-gray-500 uppercase">Consultas</p>
                                    <p>Plazo: 10 días hábiles.</p>
                                </div>
                                <div>
                                    <p className="font-bold text-gray-500 uppercase">Reclamos</p>
                                    <p>Plazo: 15 días hábiles.</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-white mb-4 uppercase tracking-wide">7. SEGURIDAD Y TRANSMISIÓN</h2>
                            <p>
                                Implementamos medidas técnicas como cifrado TLS y AES-256. Al utilizar servicios en la nube (AWS/Azure), los datos pueden ser transmitidos internacionalmente bajo acuerdos que garantizan la seguridad y confidencialidad exigida por la ley colombiana.
                            </p>
                        </div>
                    </section>

                    <footer className="pt-10 border-t border-white/10 text-xs text-gray-600">
                        <p>© 2026 Krouhub S.A.S. • Bogotá, Colombia</p>
                    </footer>
                </motion.div>
            </div>
        </div>
    );
}
