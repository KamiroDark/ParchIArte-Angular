export interface Usuario {
    _id?: string;
    nombre: string;
    email: string;
    telefono?: string;
    perfil?: string;
    rol: 'usuario' | 'admin';
    historialReservas?: string[];
    createdAt?: Date;
    updatedAt?: Date;
}