export interface Experiencia {
    _id?: string;
    nombre: string;
    descripcion: string;
    categoria: string;
    precio: number;
    disponibilidad: boolean;
    ubicacion: string;
    aliado?: string;
    createdAt?: Date;
    updatedAt?: Date;
}