// # CRUD de proyectos
export class ProjectsService {
    createProject(data: unknown): void {
        console.log('Creando proyecto:', data);
        // Lógica para crear un nuevo proyecto
    }

    getProject(id: string): void {
        console.log('Obteniendo proyecto con ID:', id);
        // Lógica para obtener un proyecto por ID
    }

    updateProject(id: string, data: unknown): void {
        console.log('Actualizando proyecto con ID:', id, 'Datos:', data);
        // Lógica para actualizar un proyecto por ID
    }

    deleteProject(id: string): void {
        console.log('Eliminando proyecto con ID:', id);
        // Lógica para eliminar un proyecto por ID
    }
}   