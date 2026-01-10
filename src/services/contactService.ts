// # Manejo de contactos
export class ContactService {
    addContact(name: string, email: string, message: string): void {
        console.log(`Nuevo contacto: ${name}, Email: ${email}, Mensaje: ${message}`);
        // Lógica para almacenar el contacto en la base de datos
    }   
}