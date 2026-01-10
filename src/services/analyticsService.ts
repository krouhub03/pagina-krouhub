//  # Google Analytics, etc.
export class AnalyticsService {
    trackEvent(eventName: string, eventData: Record<string, string | number | boolean>): void {
        console.log(`Tracking event: ${eventName}`, eventData);
        // Lógica para enviar el evento a la plataforma de análisis
    }
}