// src/app/api/survey/route.ts
import { NextResponse } from 'next/server';
import { EmailService } from '@/services/emailService';
import { getFirstEnv } from '@/lib/server/env';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const {
            userName,
            userId,
            surveyId,
            answers,
            recaptchaToken
        } = body;

        // --- 1. VERIFICACIÓN RECAPTCHA (Modo Tolerante) ---
        let isHuman = true;

        try {
            const projectID = process.env.RECAPTCHA_PROJECT_ID;
            const apiKey = process.env.RECAPTCHA_API_KEY;
            const siteKey = "6Ldg3EgsAAAAAFMJ1c9b5fA-MswgA2EbKpyxnrps";

            if (projectID && apiKey && recaptchaToken) {
                const verifyUrl = `https://recaptchaenterprise.googleapis.com/v1/projects/${projectID}/assessments?key=${apiKey}`;
                const verifyResponse = await fetch(verifyUrl, {
                    method: 'POST',
                    body: JSON.stringify({
                        event: {
                            token: recaptchaToken,
                            siteKey: siteKey,
                            expectedAction: 'submit_survey'
                        }
                    })
                });

                const verifyData = await verifyResponse.json();
                if (!verifyResponse.ok) {
                    console.warn("⚠️ Advertencia Config reCAPTCHA Survey:", verifyData.error?.message);
                } else if (verifyData.riskAnalysis?.score < 0.3) {
                    console.warn("🤖 Bot detectado en encuesta");
                    isHuman = false;
                }
            }
        } catch (err) {
            console.error("Error conexión reCAPTCHA:", err);
        }

        if (!isHuman) {
            return NextResponse.json({ error: "Actividad sospechosa" }, { status: 403 });
        }

        // --- 2. CONFIGURACIÓN EMAIL ---
        const emailService = new EmailService();
        const adminEmail =
            getFirstEnv(['ADMIN_EMAIL']) ||
            getFirstEnv(['SMTP_USER', 'MAIL_USER', 'EMAIL_USER', 'HOSTINGER_EMAIL', 'HOSTINGER_SMTP_USER']);

        if (!adminEmail) {
            return NextResponse.json({ error: "Error servidor correo" }, { status: 500 });
        }

        // Estilos visuales (Dark Mode corporativo)
        const theme = {
            bgMain: "#0f172a",
            bgCard: "#1e293b",
            primary: "#06b6d4", // Cyan
            textMain: "#f8fafc",
            textSec: "#94a3b8",
            border: "#334155"
        };

        const logoUrl = "https://krouhub.com/KrouHub_Logo_blanco.png";

        // --- 3. GENERAR HTML DEL REPORTE ---
        const reportHtml = `
            <div style="background-color: ${theme.bgMain}; font-family: 'Segoe UI', sans-serif; padding: 40px 0;">
                <div style="background-color: ${theme.bgCard}; max-width: 600px; margin: 0 auto; padding: 30px; border-radius: 12px; border: 1px solid ${theme.border}; color: ${theme.textMain};">
                    
                    <div style="text-align: center; margin-bottom: 30px;">
                        <img src="${logoUrl}" alt="KrouHub" width="140" style="display: block; margin: 0 auto;">
                        <h2 style="color: ${theme.primary}; margin-top: 20px;">📊 Nueva Encuesta Recibida</h2>
                    </div>

                    <div style="background-color: rgba(6, 182, 212, 0.1); padding: 15px; border-radius: 8px; margin-bottom: 30px; border: 1px solid rgba(6, 182, 212, 0.2);">
                        <table width="100%" style="border-collapse: collapse;">
                            <tr>
                                <td style="color: ${theme.textSec}; font-size: 12px; text-transform: uppercase;">Cliente</td>
                                <td style="text-align: right; font-weight: bold;">${userName}</td>
                            </tr>
                            <tr>
                                <td style="color: ${theme.textSec}; font-size: 12px; text-transform: uppercase;">ID Cliente</td>
                                <td style="text-align: right;">${userId || 'N/A'}</td>
                            </tr>
                            <tr>
                                <td style="color: ${theme.textSec}; font-size: 12px; text-transform: uppercase;">Encuesta</td>
                                <td style="text-align: right;">${surveyId || 'General'}</td>
                            </tr>
                        </table>
                    </div>

                    <h3 style="border-bottom: 1px solid ${theme.border}; padding-bottom: 10px; color: ${theme.textSec}; font-size: 14px; text-transform: uppercase;">Resultados</h3>

                    <div style="margin-top: 20px;">
                        <p style="margin-bottom: 5px; color: ${theme.textSec}; font-size: 13px;">1. Identidad y Valores</p>
                        <div style="font-size: 18px; font-weight: bold; margin-bottom: 15px;">${answers.q1} / 5</div>

                        <p style="margin-bottom: 5px; color: ${theme.textSec}; font-size: 13px;">2. Navegación</p>
                        <div style="font-size: 18px; font-weight: bold; margin-bottom: 15px;">${answers.q2} / 5</div>

                        <p style="margin-bottom: 5px; color: ${theme.textSec}; font-size: 13px;">3. Rendimiento</p>
                        <div style="font-size: 18px; font-weight: bold; margin-bottom: 15px;">${answers.q3} / 5</div>

                        <p style="margin-bottom: 5px; color: ${theme.textSec}; font-size: 13px;">4. Comunicación</p>
                        <div style="font-size: 18px; font-weight: bold; margin-bottom: 15px;">${answers.q4} ⭐</div>

                        <p style="margin-bottom: 5px; color: ${theme.textSec}; font-size: 13px;">5. Cumplimiento de Tiempos</p>
                        <div style="font-size: 16px; margin-bottom: 15px; color: ${theme.primary};">${answers.q5}</div>

                        <div style="background-color: ${theme.bgMain}; padding: 20px; border-radius: 8px; text-align: center; margin: 30px 0;">
                            <span style="display: block; color: ${theme.textSec}; font-size: 12px; text-transform: uppercase;">NPS (Recomendación)</span>
                            <span style="font-size: 42px; font-weight: bold; color: ${answers.q6 >= 9 ? '#4ade80' : answers.q6 >= 7 ? '#facc15' : '#f87171'};">${answers.q6}/10</span>
                        </div>

                        <p style="margin-bottom: 5px; color: ${theme.textSec}; font-size: 13px;">7. Interés en Servicios Futuros</p>
                        <div style="margin-bottom: 20px;">
                            ${answers.q7.length > 0
                ? answers.q7.map((s: string) => `<span style="display:inline-block; background: ${theme.border}; padding: 4px 8px; border-radius: 4px; font-size: 12px; margin-right: 5px; margin-bottom: 5px;">${s}</span>`).join('')
                : '<span style="color: #64748b; font-style: italic;">Ninguno seleccionado</span>'
            }
                        </div>

                        <p style="margin-bottom: 5px; color: ${theme.textSec}; font-size: 13px;">8. Testimonio</p>
                        <blockquote style="border-left: 4px solid ${theme.primary}; margin: 0; padding-left: 15px; font-style: italic; color: ${theme.textMain}; background: rgba(255,255,255,0.05); padding: 15px; border-radius: 0 8px 8px 0;">
                            "${answers.q8 || 'Sin testimonio'}"
                        </blockquote>
                    </div>

                    <div style="margin-top: 40px; text-align: center; color: ${theme.textSec}; font-size: 12px;">
                        © ${new Date().getFullYear()} KrouHub System
                    </div>
                </div>
            </div>
        `;

        // --- 4. ENVIAR CORREO AL ADMIN ---
        await emailService.sendEmail(
            adminEmail,
            `Encuesta Completada: ${userName}`,
            reportHtml
        );

        return NextResponse.json({ success: true });

    } catch (error: any) {
        console.error("Error API Survey:", error);
        return NextResponse.json({ error: "Error interno" }, { status: 500 });
    }
}
