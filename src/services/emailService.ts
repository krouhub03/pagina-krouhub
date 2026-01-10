//  # Servicio de email
export class EmailService {
    sendEmail(to: string, subject: string, body: string): void {
        console.log(`Enviando email a ${to} con asunto "${subject}" y cuerpo "${body}"`);
        // Lógica para enviar el email
    }
}